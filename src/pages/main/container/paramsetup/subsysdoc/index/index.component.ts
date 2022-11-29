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
    searchName: string;
    crumbsList: object;
    customer: any;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: any;
    chooseDeleteSeq: number;
    imgsrc: string;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '单位子系统文档', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setConfim = false;
        this.displayedColumns = ['SName', 'Img', 'DocUrl', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.imgsrc = '';
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
        this.service.serviceR('ent/params/subsys/10911', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res);
                const key = 'SubSystems';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
                // console.log(this.list);
            }
        });
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoEdit(el: any) {
        if (el.SName) {
            this.modal.modalSrc = el.Img;
            this.modal.Seq = el.Seq;
            this.modal.SName = el.SName;
            if (el.Docs) {
                this.modal.docList = el.Docs;
            } else {
                this.modal.docList = [];
            }
        }
        this.modal.switchModalBox();
    }

    // 控制confim模态框
    showConfim(seq: number) {
        this.chooseDeleteSeq = seq;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/params/subsys/10911', { Seqs: this.chooseDeleteSeq }, (res: any) => {
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

