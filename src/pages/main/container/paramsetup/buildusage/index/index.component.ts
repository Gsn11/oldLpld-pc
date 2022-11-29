import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { IUpdateInterface } from './iIndex.interface';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    customer: any;
    crumbsList: object;
    nowItemName: string;
    allSwitchIsOpen: boolean;
    newChildrenCode: any;
    newChildrenItem: any;
    nowCode: string;
    nowParent: string;
    isLastChoose: boolean;
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
        this.isLastChoose = true;
        this.newChildrenItem = new FormControl('', [
            Validators.required
        ]);
        this.newChildrenCode = new FormControl('', [
            Validators.required
        ]);
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        let bName: string;
        if (!Isentver) {
            this.nowItemName = '所有建筑分类';
            bName = '建筑物分类管理';
        } else {
            this.nowItemName = buildData.buildType === '联排联调' ? '水工建筑分类' : '建筑分类';
            bName = buildData.buildType === '联排联调' ? '水工建筑分类管理' : '建筑分类管理';
        }
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: bName, open: false }
        ];
        this.setData = {
            CommonSearch: '',
            FromCache: false,
            State: 0,
            PageIndex: 1,
            PageSize: 10
        };
        this.setConfim = false;
        this.allSwitchIsOpen = false;
        this.TreeCustomerIsOwner = false;
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            FromCache: false,
            State: 0,
        };
        this.service.serviceR('ent/params/buildusage/10301', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'BuildUsages';
                if (res.Result[key].length > 0) {
                    this.List = this.create(res.Result[key]);
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
            Reflect.set(item, 'useId', item.BUDesc);
            Reflect.set(item, 'display', true);
            if (item.BUParent === null) {
                item.BUParent = '0';
            }
            // console.log(tree);
            m.set(item.BUCode + '', item);
        }
        const t = [];
        for (const d of tree) {
            const node = m.get(d.BUCode + '');
            if (d && d.BUParent === '0') {
                t.push(node);
            } else {
                const pnode = m.get(d.BUParent + '');
                if (!pnode) {
                    continue;
                }
                pnode.children.push(node);
            }
        }
        return t;
    }

    treeChange(tree: any) {
        // console.log(tree);
        if (tree.Customer !== this.customer) {
            this.TreeCustomerIsOwner = false;
        } else {
            this.TreeCustomerIsOwner = true;
        }
        this.initailChooseData(this.List);
        this.nowItemName = tree.BUDesc;
        console.log(tree.BUDesc);
        this.nowParent = tree.BUParent;
        this.nowCode = tree.BUCode;
        this.modal.Parent = tree.BUCode;
        this.newChildrenItem.setValue(this.nowItemName);
        this.newChildrenCode.setValue(this.nowCode);
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
            const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
            if (!Isentver) {
                this.nowItemName = '所有建筑分类';
            } else {
                this.nowItemName = buildData.buildType === '联排联调' ? '水工建筑分类' : '建筑分类';
            }
        }
        this.allSwitchIsOpen = !this.allSwitchIsOpen;
    }

    addChildren() {
        if (!this.allSwitchIsOpen) {
            this.modal.Parent = '0';
        }
        this.modal.Name = this.nowItemName;
        this.modal.switchModalBox();
    }

    showConfim() {
        this.setConfim = !this.setConfim;
    }

    userSave() {
        const data: IUpdateInterface = {
            OldBUCode: this.nowCode,
            BUCode: this.newChildrenCode.value,
            BUDesc: this.newChildrenItem.value,
            BUParent: this.nowParent,
        };
        this.service.serviceR('ent/params/buildusage/10303', data, (res: any) => {
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
                BUCodes: this.nowCode,
            };
            this.service.serviceR('ent/params/buildusage/10304', data, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.allSwitchIsOpen = !this.allSwitchIsOpen;
                    const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
                    if (!Isentver) {
                        this.nowItemName = '所有建筑分类';
                    } else {
                        this.nowItemName = buildData.buildType === '联排联调' ? '水工建筑分类' : '建筑分类';
                    }
                    this.getList();
                }
            });
        }
    }

    getnewChildrenCodeErrorMessage() {
        return this.newChildrenCode.hasError('required') ? '当前建筑物分类代码' : '';
    }

    getnewChildrenItemErrorMessage() {
        return this.newChildrenItem.hasError('required') ? '当前建筑物分类名称' : '';
    }
}

