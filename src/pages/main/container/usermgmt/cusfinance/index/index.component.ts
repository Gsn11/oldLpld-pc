import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    crumbsList: object;
    customer: any;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    List: any;
    chooseDeleteSeq: number;
    BeginTime: string; // 开始日期
    Amount: number;
    AmountFreeze: number;
    Recharge: number;  // 总充值金额
    Withdraw: number; // 提现金额
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.crumbsList = [
            { name: '用户权限', open: false },
            { name: '财务资金', open: false }
        ];
        this.setConfim = false;
        this.displayedColumns = ['PayOrderno', 'Time', 'PayeeName', 'AmountPayee', 'PayerName', 'Amount', 'State', 'Other'];
        this.List = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.BeginTime = null;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.Amount = 0;
        this.AmountFreeze = 0;
        this.Recharge = 0;
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
        const data = {
            CommonSearch: '',
            FromCache: false,
        };
        this.service.serviceR('ent/finance/customer/2011', data, (res: any) => {
            if (res.ResultCode === 0) {
                if (res.Result.FinanceCustomers.length !== 0) {
                    this.Amount = res.Result.FinanceCustomers[0].Amount;
                    this.AmountFreeze = res.Result.FinanceCustomers[0].AmountFreeze;
                    this.Recharge = res.Result.FinanceCustomers[0].Recharge;
                    this.Withdraw = res.Result.FinanceCustomers[0].Withdraw;
                }
            }
        });
    }

    gotoRecharge() {
        this.router.navigate(['index/cusfinance/recharge']);
    }

    getList() {
        const data = {
            Customer: this.customer,
            Days: '',
            Months: '',
            Years: '',
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
        };
        if (this.BeginTime) {
            const chooseDate = new Date(this.BeginTime);
            const m = chooseDate.getMonth() + 1;
            let mm: string;
            if (m < 10) {
                mm = '0' + m.toString();
            } else {
                mm = m.toString();
            }
            Reflect.set(data, 'Years', chooseDate.getFullYear());
            Reflect.set(data, 'Months', mm);
            Reflect.set(data, 'Days', chooseDate.getDate());
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/finance/customer/5011', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.List = res.Result.FinanceCustomerActions;
                for (const i of this.List) {
                    i.getMoney = Math.abs(i.Amount);
                }
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    clear() {
        this.BeginTime = null;
        this.getList();
    }

    getBeginTime(data: string) {
        this.BeginTime = data;
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

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/cusfinance/info']);
    }
}

