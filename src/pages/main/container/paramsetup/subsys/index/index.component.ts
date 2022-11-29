import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { RequestService } from '../../../../../service/request';

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
    data: any;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: any;
    chooseDeleteSeq: number;
    imgsrc: string;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    constructor(
        private router: Router,
        private requestService: RequestService
    ) {
        this.searchName = '';
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '单位子系统管理', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['SName', 'Img', 'Id', 'Other'];
        this.setConfim = false;
        this.pageSize = 10;
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.imgsrc = '';
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            State: 0,
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.requestService.request('ent/params/subsys/10911', data)
            .subscribe(
                (res: any) => {
                    if (res.ResultCode === 0) {
                        const key = 'SubSystems';
                        this.list = res.Result[key];
                        this.paginatorTotal = res.Result.Total;
                    }
                },
                (error) => {
                    if (error === 'logintoken.expired') {
                        localStorage.removeItem('LOGINSTATES');
                        localStorage.removeItem('bemUserInfo');
                        this.router.navigate(['/login']);
                    } else {
                        console.log(error);
                    }
                }
            );
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }

     // 点击item项做active切换底色方法
     radioChange(index: number) {
        if (this.activeChoose === index) {
            this.activeChoose = 35;
            return;
        }
        this.activeChoose = index;
    }
    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoEdit(item: any) {
        if (item.SName) {
            this.modal.modalSrc = item.Img;
            this.modal.type = 'edit';
            this.modal.Seq = item.Seq;
            this.modal.SName.setValue(item.SName);
            this.modal.code.setValue(item.Code);
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
            this.requestService.request('ent/params/subsys/10904', { Seqs: this.chooseDeleteSeq }).subscribe( res => this.getList());
        }
    }
}

