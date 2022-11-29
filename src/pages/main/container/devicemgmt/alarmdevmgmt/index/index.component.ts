import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Service } from '../../../../../service/service';
import { FormControl } from '@angular/forms';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    searchName: string;
    crumbsList: object;
    customer: any;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: any;
    SystemList: any;
    SystemSelect = new FormControl();
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '超时报警', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['DeviceNo', 'Model', 'DeviceName', 'Stat', 'NextMaintainDate', 'OverMaintainDate', 'Other'];
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
        this.getSystem();
    }

    getList() {
        const data = {
            State: '0,1',
            is_alarm: 1
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        if (this.SystemSelect.value) {
            Reflect.set(data, 'Subsys', this.SystemSelect.value);
        }
        console.log( data );
        this.service.serviceR('ent/device/6011', data, (res: any) => {
            console.log(res);
            if (res.ResultCode === 0) {
                this.list = res.Result.Devices;
                for (const l of this.list) {
                    const t = Math.floor((new Date().getTime() - new Date(l.NextMaintainDate).getTime()) / 86400000);
                    Reflect.set(l, 'OverMaintainDate', t);
                }
                // console.log(this.list);
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    downloadDeviceFile() {
        const body = {
            FromCache: false,
            State: 0,
            CommonSearch: this.searchName,
            FileName: '超时报警',
            is_alarm: 1
        };
        if (this.SystemSelect.value) {
            Reflect.set(body, 'Subsys', this.SystemSelect.value);
        }
        new DownloadFile(body, 'ent/device/monitor/6111').downloadfile();
    }

    getSystem() {
        const data = {
            State: 0,
        };
        this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
            if (res.ResultCode === 0) {
                // console.log(res.Result);
                this.SystemList = res.Result.SubSystems;
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
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/devicealarm/info']);
    }

    gotoOrderKeep(el: any) {
        localStorage.setItem('bemDevicealarmData', JSON.stringify(el));
        this.router.navigate(['index/schedulekeep/add']);
    }
}

