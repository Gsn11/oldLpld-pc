import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { ChangeModalComponent } from '../component/changeModal/changeModal.component';
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
    USeq: number;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: object[];
    chooseDeleteSeq: number;
    @ViewChild(ChangeModalComponent, null) modal: ChangeModalComponent;
    Users: any;
    buildChoose: any;
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '用户权限', open: false },
            { name: '授权管理', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.USeq = JSON.parse(localStorage.getItem('bemUserInfo')).Info.seq;
        this.setConfim = false;
        this.displayedColumns = ['Name', 'BGName', 'ProvinceCode', 'Addr', 'UName', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
    }

    ngOnInit() {
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.getList();
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    getList() {
        const data = {
            Stat: 0,
            BType: 1,
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/dataauth/7411', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = res.Result.DataAuths;
                this.paginatorTotal = res.Result.Total;
            }
        });
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

    changePersonLiable(el: any) {
        this.buildChoose = el;
        const data = {
            CommonSearch: '',
            Customer: this.customer,
            State: 0,
        };
        this.service.serviceR('ent/cususer/4611', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.Users = res.Result.Users;
            }
        });
        this.modal.switchModalBox();
    }

    gotoEdit(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/buildingauth/edit']);
    }
}

