import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    crumbsList: object;
    customer: any;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    displayedColumns: string[];
    list: object[];
    MsgList: any;
    BeginTime: string = null; // 开始日期
    EndTime: string = null; // 结束日期
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '用户管理', open: false },
            { name: '推送消息管理', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['time', 'title', 'msg', 'orderSeq', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
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
        const endTime = new Date();
        const beiginTime = new Date(Date.parse(endTime.toString()) - 24 * 60 * 60 * 1000 * 7);
        this.BeginTime = `${beiginTime.getFullYear()}-${(beiginTime.getMonth() + 1) < 10 ? ('0' + (beiginTime.getMonth() + 1)) : (beiginTime.getMonth() + 1)}-${beiginTime.getDate() < 10 ? '0' + beiginTime.getDate() : beiginTime.getDate()}`;
        this.EndTime = `${endTime.getFullYear()}-${(endTime.getMonth() + 1) < 10 ? ('0' + (endTime.getMonth() + 1)) : (endTime.getMonth() + 1)}-${endTime.getDate() < 10 ? '0' + endTime.getDate() : endTime.getDate()}`;
    }

    getList() {
        const data = {
            State: 0,
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            RecvCustomer: this.customer
        };
        if (this.BeginTime) {
            Reflect.set(data, 'BeginDate', this.BeginTime + ' 00:00:00');
        }
        if (this.EndTime) {
            Reflect.set(data, 'EndDate', this.EndTime + ' 23:59:59');
        }
        this.service.serviceR('ent/user/msglist', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'MsgList';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
                console.log(this.list);
            }
        });
    }

    gotoAdd() {
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/msgmgmt/add']);
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    getBeginTime(data: string) {
        this.BeginTime = data;
    }

    getEndTime(data: string) {
        this.EndTime = data;
    }

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/msgmgmt/info']);
    }
}

