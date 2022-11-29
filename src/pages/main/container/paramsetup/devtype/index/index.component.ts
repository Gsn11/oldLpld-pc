import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    buildData: any;
    code = new FormControl();
    crumbsList: object;
    nowItemName: string;
    customer: any;
    allSwitchIsOpen: boolean;
    newChildrenItem: any;
    nowSeq: number;
    setConfim: boolean;
    setData: object;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    List: any;
    TreeCustomerIsOwner: boolean;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.newChildrenItem = new FormControl('', [
            Validators.required
        ]);
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '设备分类管理', open: false }
        ];
        this.setData = {
            CommonSearch: '',
            State: 0,
            PageIndex: 1,
            PageSize: 10
        };
        this.setConfim = false;
        this.nowItemName = '所有设备类型';
        this.allSwitchIsOpen = false;
        this.TreeCustomerIsOwner = false;
        this.List = null;

        this.buildData = buildData;
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            FromCache: false,
            State: 0
        };
        this.service.serviceR('ent/params/devicetype/10501', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'DeviceTypes';
                if (res.Result[key].length !== 0) {
                    // console.log(res.Result[key]);
                    this.List = this.create(res.Result[key]);
                    console.log(this.List);
                } else {
                    this.List = null;
                }
            }
        });
    }

    create(tree: any): any {
        const m = new Map();
        for (const item of tree) {
            Reflect.set(item, 'children', []);
            Reflect.set(item, 'switch', false);
            Reflect.set(item, 'isChoose', false);
            Reflect.set(item, 'useId', item.DTName);
            Reflect.set(item, 'display', true);
            m.set(item.DTSeq + '', item);
        }
        const t = [];
        for (const d of tree) {
            const node = m.get(d.DTSeq + '');
            if (d && d.DTParent === 0) {
                t.push(node);
            } else {
                const pnode = m.get(d.DTParent + '');
                if (!pnode) {
                    continue;
                }
                pnode.children.push(node);
            }
        }
        return t;
    }

    treeChange(tree: any) {
        if (!tree) {
            return;
        }
        if (tree.Customer !== this.customer) {
            this.TreeCustomerIsOwner = false;
        } else {
            this.TreeCustomerIsOwner = true;
        }
        this.initailChooseData(this.List);
        this.nowItemName = tree.DTName;
        this.nowSeq = tree.DTSeq;
        this.newChildrenItem.setValue(this.nowItemName);
        this.code.setValue(tree.Code);
    }

    initailChooseData(list: any) {
        list.map((item: any) => {
            item.isChoose = false;
            if (item.children) {
                this.initailChooseData(item.children);
            }
        });
    }

    allListSwitch() {
        if (this.List === null) {
            return;
        }
        this.treeChange(this.List[0]);
        if (this.allSwitchIsOpen === true) {
            this.nowItemName = '所有设备类型';
        }
        this.allSwitchIsOpen = !this.allSwitchIsOpen;
    }

    addChildren() {
        let id: number;
        if (this.allSwitchIsOpen) {
            id = this.nowSeq;
        } else {
            id = 0;
        }
        this.modal.DTParent = id;
        this.modal.DTName = this.nowItemName;
        this.modal.switchModalBox();
    }

    showConfim() {
        this.setConfim = !this.setConfim;
    }

    userSave() {
        const data: any = {
            DTSeq: this.nowSeq,
            DTName: this.newChildrenItem.value,
        };


        console.log(this.code.value);

        if (this.code.value) {
            data.Code = this.code.value;
        }

        this.service.serviceR('ent/params/devicetype/10503', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.getList();
                this.snackBar.open('保存成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            }
        });
    }

    deleteCheck(...d: boolean[]) {
        this.setConfim = false;
        const confimResultState = d[0];
        if (confimResultState === true) {
            const data = {
                DTSeqs: this.nowSeq
            };
            this.service.serviceR('ent/params/devicetype/10504', data, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.nowItemName = '所有设备类型';
                    this.allSwitchIsOpen = !this.allSwitchIsOpen;
                    this.getList();
                }
            });
        }
    }

    getnewChildrenItemErrorMessage() {
        return this.newChildrenItem.hasError('required') ? '请输入子类型' : '';
    }
}

