import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { ExcelUploadComponent } from '../../../component/excelUpload/excelUpload.component';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    bemInfoData: any;
    searchName: string;
    crumbsList: object;
    number: any;
    customer: any;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    UploadAddr: string;
    downloadInfo: string;
    deviceMainTypeSelect: any;
    deviceMainType: string[];
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;

    displayedColumns: string[];
    list: object[];
    chooseDeleteSeq: number;
    constructor(
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '设备管理', open: false },
            { name: '库存报警', open: false }
        ];
        this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
        console.log(this.bemInfoData);
        this.deviceMainType = ['0', '1', '2', '3', '4'];
        this.deviceMainTypeSelect = new FormControl({
          value: 0,
          disabled: false
        });
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setConfim = false;
        this.pageSize = 10;
        this.displayedColumns = ['MainType', 'DTName', 'DMName', 'BRName', 'Total', 'State', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
        this.UploadAddr = 'ent/devicemodel/6106';
        this.downloadInfo = '请下载设备对照表';

    }

    ngOnInit() {
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.number = 1;
        this.getList();
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }
    fileBoxChange() {
        console.log(this.excelUpload);
        this.excelUpload.fileBoxChange();
    }
    getList() {
        const data = {
            FromCache: false,
            Threshold: this.number,
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
        if (this.deviceMainTypeSelect.value) {
            Reflect.set(data, 'MainType', this.deviceMainTypeSelect.value);
        }

        this.service.serviceR('ent/devicemodel/6112', data, (res: any) => {
            console.log(res);
            if (res.ResultCode === 0) {
                const key = 'DeviceModels';
                this.list = res.Result[key];
                // console.log(this.list);
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    gotoAdd() {
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/devmod/add']);
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
        this.router.navigate(['index/stockwarn/info']);
    }

    gotoEdit(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/stockwarn/edit']);
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
            this.service.serviceR('ent/devicemodel/6104', { DMSeq: this.chooseDeleteSeq }, (res: any) => {
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

