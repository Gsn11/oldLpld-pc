import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service } from '../../../../../../service/service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    searchName: string;
    paginatorTotal: number;
    crumbsList: object;
    customer: any;
    setData: object;
    initialCompanyList: any;
    pageIndex: number;
    pageSize: number;
    SystemList: any;
    SystemSelect = new FormControl();
    displayedColumns: string[];
    @ViewChild(MatSort, null) sort: MatSort;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: 'IOT管理', open: false },
            // { name: '智联网关', open: false },
            { name: '智联网关在线', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setData = {
            CommonSearch: '',
            CSeq: this.customer,  //  3,0
            FromCache: false
        };
        this.pageIndex = 1;
        this.pageSize = 10;
        this.displayedColumns = ['timeStr', 'building', 'devName', 'levelName', 'metricDesc', 'value', 'Other'];
    }

    ngOnInit() {
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.getList();
        const data = {
            State: 0,
        };
        this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.SystemList = res.Result.SubSystems;
            }
        });
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    getList() {
        this.service.serviceR('ent/diagrt/9002', this.setData, (res: any) => {
            if (res.ResultCode === 0) {
                this.initialCompanyList = new MatTableDataSource(res.Result.RtList);
                this.initialCompanyList.sort = this.sort;
                this.initialCompanyList.paginator = this.paginator;
            }
        });
    }

    valueInit(metric: string, value: string | number) {
        if (metric === 'device_online') {
            if (value === '1' || value === 1) {
                value = '正常';
            } else {
                value = '故障';
            }
        }
        if (value === 'true') {
            value = '故障';
        } else if (value === 'false') {
            value = '正常';
        }
        return value;
    }

    metricDescInit(metricDesc: string) {
        if (metricDesc.indexOf('故障') > -1) {
            return metricDesc.substring(0, metricDesc.length - 2) + '状态';
        }
        return '设备状态';
    }

    applyFilter() {
        this.initialCompanyList.filter = this.searchName.trim();
        if (this.initialCompanyList.paginator) {
            this.initialCompanyList.paginator.firstPage();
        }
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
    }

    selectClose(selectName: any) {
        this.searchName = selectName.value;
        this.initialCompanyList.filter = this.searchName.trim();
        if (this.initialCompanyList.paginator) {
            this.initialCompanyList.paginator.firstPage();
        }
    }

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/gatewayrtinfo/info']);
    }
}
