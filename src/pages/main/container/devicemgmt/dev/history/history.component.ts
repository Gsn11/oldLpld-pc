import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
    bemInfoData: any;
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
    list: object[];
    historyName: string;
    crumbsNameold: any;
    scheduleType: any = '';
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
        let crumbsName: string;
        let link: string;
        console.log(localStorage.getItem('crumbsName'));
        console.log(JSON.parse(localStorage.getItem('bemInfoData')));
        if (this.bemInfoData.MainType === 1) {
            crumbsName = '智能设备管理';
            link = 'smartdev';
        } else if (this.bemInfoData.MainType === 0) {
            crumbsName = '通用设备管理';
            link = 'commdev';
        } else if (this.bemInfoData.MainType === 7) {
            crumbsName = '安全器材管理';
            link = 'secdev';
        } else if (this.bemInfoData.MainType === 3) {
            crumbsName = '备品/备件';
            link = 'sparepartsmgmt';
            if (localStorage.getItem('crumbsName') === '配件管理') {
                crumbsName = '配件管理';
                link = 'devpartsmgmt';
            }
        } else {
            crumbsName = '智联网关管理';
            link = 'gatewaydev';
        }
        this.historyName = `${this.bemInfoData.DeviceName}(${this.bemInfoData.DeviceNo})`;
        this.crumbsList = [
            { name: '设备管理', open: false },
            { name: crumbsName, open: true, url: link },
            { name: this.historyName, open: false }
        ];
        this.setConfim = false;
        this.displayedColumns = ['OrderNo', 'MSName', 'Diagnose', 'Conclusion', 'PayOrderType', 'OrderTime', 'State', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
    }

    ngOnInit() {
        // if (localStorage.getItem('BemPageIndex')) {
        //     this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        // }
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
            DeviceSeq: this.bemInfoData.Seq
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', 1);
            Reflect.set(data, 'PageSize', 10);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        if (this.scheduleType) {
            Reflect.set(data, 'ScheduleType', this.scheduleType);
        }

        this.service.serviceR('ent/maintenance/8014', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = res.Result.MaintenanceOrders;
                // console.log(this.list);
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoInfo(el: any) {
        Reflect.set(el, 'MainType', this.bemInfoData.MainType);
        Reflect.set(el, 'deviceNames', this.historyName);
        localStorage.setItem('bemHistoryItemData', JSON.stringify(el));
        let link: string;
        if (this.bemInfoData.MainType === 0) {
            link = 'commdev';
        } else if (this.bemInfoData.MainType === 1) {
            link = 'smartdev';
        } else if (this.bemInfoData.MainType === 3) {
            link = 'sparepartsmgmt';
            if (localStorage.getItem('crumbsName') === '配件管理') {
                link = 'devpartsmgmt';
            }

        } else {
            link = 'gatewaydev';
        }
        link += '/historyinfo';
        this.router.navigate(['index/' + link]);
    }

    goback() {
        let link: string;
        if (this.bemInfoData.MainType === 0) {
            link = 'commdev';
        } else if (this.bemInfoData.MainType === 1) {
            link = 'smartdev';
        } else if (this.bemInfoData.MainType === 3) {
            if (localStorage.getItem('crumbsName') === '配件管理') {
                link = 'devpartsmgmt';
            } else {
                link = 'sparepartsmgmt';
            }
        } else {
            link = 'gatewaydev';
        }
        if (this.bemInfoData.editGotoHistory) {
            this.router.navigate(['index/' + link + '/edit']);
        } else {
            this.router.navigate(['index/' + link]);
        }
    }
}
