import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetHeaders } from '../../../../../common/utils/js/headers/header';
import { Service } from '../../../../../service/service';
import { ExcelUploadComponent } from '../../../component/excelUpload/excelUpload.component';
import { environment } from '../../../../../../environments/environment';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import buildData from '../../../../../../environments/buildType';

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
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: object[];
    chooseDeleteSeq: number;
    @ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
    UploadAddr: string;
    downloadInfo: string;
    buildData: any;
    constructor(
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        let menu1: string;
        if (!Isentver) {
            menu1 = '建筑设施管理';
        } else {
            menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
        }
        this.crumbsList = [
            { name: menu1, open: false },
            { name: '空间位置标记', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setConfim = false;
        this.displayedColumns = ['BuildingName', 'Floor', 'Zone', 'SpacePos', 'UUID', 'id', 'Other'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
        this.UploadAddr = 'ent/buildspace/5206';
        this.downloadInfo = '请下载空间位置对照表';

        this.buildData = buildData;

        if (buildData.buildType === '东南水厂') {
            this.displayedColumns = ['BuildingName', 'Zone', 'UUID', 'id', 'Other'];
        }
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
            BType: 1,
            State: 0,
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
        }
        this.service.serviceR('ent/buildspace/monitor/5211', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = res.Result.BuildSpaces;
                // console.log(this.list);
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    fileBoxChange() {
        this.excelUpload.fileBoxChange();
    }

    downloadFile() {
        const body = {
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            FromCache: false,
            CommonSearch: this.searchName === null ? '' : this.searchName,
            MainType: 1,
        };
        console.log(body);
        new DownloadFile(body, 'ent/buildspace/qrcode').downloadfile();
    }

    downloadBuildingSpaceFile() {
        const body = {
            BType: 1,
            State: 0,
            CommonSearch: this.searchName,
            FileName: '空间位置标记'
        };
        new DownloadFile(body, 'ent/buildspace/monitor/5207').downloadfile();
    }

    gotoAdd() {
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/buildingspace/add']);
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
        this.router.navigate(['index/buildingspace/info']);
    }

    gotoEdit(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/buildingspace/edit']);
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
            this.service.serviceR('ent/buildspace/5204', { BSSeq: this.chooseDeleteSeq }, (res: any) => {
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

