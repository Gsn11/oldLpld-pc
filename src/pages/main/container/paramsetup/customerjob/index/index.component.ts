import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    customer: any;
    searchName: string;
    crumbsList: object;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: any;
    chooseDeleteSeq: number;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        let pageName: string;
        if (!Isentver) {
            pageName = '建筑物分类管理';
        } else {
            pageName = '单位岗位管理';
        }
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: pageName, open: false }
        ];
        this.setConfim = false;
        this.displayedColumns = ['JName', 'CName', 'Other', 'id'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
    }
    ngOnInit() {
        this.getList();
    }
    getList() {
        const data = {
            State: 0
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/params/job/10711', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'Jobs';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
            }
        });
    }
    gotoAdd() {
        console.log(this.modal);
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }
    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }
    // 控制confim模态框
    showConfim(seq: number) {
        this.chooseDeleteSeq = seq;
        this.setConfim = !this.setConfim;
    }
    gotoEdit(el: any) {
        if (el.JName) {
            this.modal.type = 'edit';
            this.modal.JSeq = el.JSeq;
            this.modal.JName.setValue(el.JName);
        }
        this.modal.switchModalBox();
    }
    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/params/job/10704', { JSeqs: this.chooseDeleteSeq }, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.getList();
                }
            });
        }
    }
}

