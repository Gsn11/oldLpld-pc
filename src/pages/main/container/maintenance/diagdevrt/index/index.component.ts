import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service } from '../../../../../service/service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
import buildData from '../../../../../../environments/buildType';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    buildData: any;
    searchName: string;
    paginatorTotal: number;
    crumbsList: object;
    customer: any;
    setData={
        CommonSearch: '',
        CSeq: '',  //  3,0
        FromCache: false
    };
    initialCompanyList: any;
    pageIndex: number;
    pageSize: number;
    SystemList: any;
    SystemSelect = new FormControl();
    displayedColumns: string[];
    buildList = [];
    buildSeq = '';
    @ViewChild(MatSort, null) sort: MatSort;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.buildData = buildData;
        this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '设备实时监控', open: false }
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
        this.getBuildList();
        const data = {
            State: 0,
        };
        this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res.Result);
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
        console.log(this.setData);
        this.service.serviceR('ent/diagrt/9001', this.setData, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res.Result.RtList)
                this.initialCompanyList = new MatTableDataSource(res.Result.RtList);
                this.initialCompanyList.sort = this.sort;
                this.initialCompanyList.paginator = this.paginator;
            }
        });
    }

    getBuildList() {
        const data = { null: null };
        this.service.serviceR('ent/building/5001', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.buildList = res.Result.Buildings;
            }
        });
    }

    selectBuild(e) {
        console.log(e)
        this.initialCompanyList.filter = e.value.trim();
        if (this.initialCompanyList.paginator) {
            this.initialCompanyList.paginator.firstPage();
            console.log(this.initialCompanyList.paginator)
        }
    }

    valueInit(value: any) {
        // if (metric === 'device_online') {
        //     if (value === '1' || value === 1) {
        //         value = '正常';
        //     } else {
        //         value = '故障';
        //     }
        // }
        console.log(value);
        // value == false时 等于正常
        // value == true时 等于故障
        if (value === false) {
            value = '正常';
        } else if (typeof (value) === 'number') {
            value = value.toFixed(2);
        } else {
            value = '故障';
        }
        return value;
    }

    metricDescInit(metricDesc: string) {
        if (metricDesc) {
            if (metricDesc.indexOf('故障') > -1) {
                return metricDesc.substring(0, metricDesc.length - 2) + '状态';
            }
        }
        return '设备状态';
    }

    applyFilter() {
        console.log(this.setData)
        this.setData.CommonSearch = this.searchName;
        this.getList();
        // this.initialCompanyList.filter = this.searchName;
        // if (this.initialCompanyList.paginator) {
        //     this.initialCompanyList.paginator.firstPage();
        // }
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
    }

    selectClose(selectName: any) {
        console.log(selectName);
        this.initialCompanyList.filter = selectName.value.trim();
        if (this.initialCompanyList.paginator) {
            this.initialCompanyList.paginator.firstPage();
        }
    }

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/diagdevrt/info']);
    }
    downloadDeviceFile() {
        const body = {
            CommonSearch: this.searchName ? this.searchName : '',
            SubsysSeq: '',
            BuildSeq: '',
            FileName: '设备实时监控'
        };
        new DownloadFile(body, 'ent/diagrt/9001/export').downloadfile();
    }
}
