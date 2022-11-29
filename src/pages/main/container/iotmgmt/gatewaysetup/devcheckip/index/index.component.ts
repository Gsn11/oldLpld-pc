import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ExcelUploadService } from '../service/excelUpload.service';
import { Service } from '../../../../../../service/service';

export interface ISetdataList {
    CommonSearch: string;
    Stat: number;
    PageIndex: number;
    PageSize: number;
    GatewayNo: number; // 智联网关DeviceNo
}

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    providers: [ ExcelUploadService ]
})
export class IndexComponent implements OnInit {
    bemDevice: any;
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
    setData: ISetdataList;
    displayedColumns: string[];
    List: object[];
    chooseDeleteSeq: any;
    smartGatewayList: any;
    SelectsmartGateway: any;
    AddBottonDisabled: boolean;
    ServiceAddr: string;
    fileBoxShow: boolean;
    fileList: any;
    constructor(
        private router: Router,
        private excelUploadService: ExcelUploadService,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: 'IOT管理', open: false },
            // { name: '智联网关', open: false },
            { name: 'IP设备监测管理', open: false }
        ];
        this.bemDevice = JSON.parse(localStorage.getItem('bemDevice'));
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setData = {
            CommonSearch: '',
            Stat: 0,
            PageIndex: 1,
            PageSize: 10,
            GatewayNo: null
        };
        this.setConfim = false;
        this.displayedColumns = ['GatewayNo', 'DevNo', 'Ip', 'Port', 'Id', 'Other'];
        this.List = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.SelectsmartGateway = new FormControl('');
        this.AddBottonDisabled = false;
        this.ServiceAddr = 'http://www.bemcn.com.cn:10080/';
        this.fileBoxShow = false;
        this.pageIndex = 1;
        this.pageSize = 10;
    }

    ngOnInit() {
        if (this.bemDevice) {
            this.SelectsmartGateway.setValue(this.bemDevice.DeviceNo);
            this.smartGatewayChange({ value: this.bemDevice.DeviceNo });
        }
        const deviceData = {
            MainType: '2',
            NeedShare: 1,
            State: 0
        };
        this.service.serviceR('ent/device/6001', deviceData, (res: any) => {
            if (res.ResultCode === 0) {
                this.smartGatewayList = res.Result.Devices;
                // console.log(this.smartGatewayList);
            }
        });
    }

    getList() {
        this.service.serviceR('ent/checkip/12011', this.setData, (res: any) => {
            if (res.ResultCode === 0) {
                this.AddBottonDisabled = true;
                this.List = res.Result.DeviceCheckIps;
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    smartGatewayChange(event: any) {
        this.AddBottonDisabled = false;
        if (!event.value) {
            return;
        }
        Reflect.set(this.setData, 'GatewayNo', event.value);
        this.getList();
    }

    downloadFile() {
        window.open(this.ServiceAddr + 'static/metrics.zip', 'blank');
    }

    fileBoxChange() {
        this.fileBoxShow = !this.fileBoxShow;
    }

    fileCancel() {
        this.fileBoxShow = false;
    }

    fileChange(e: any) {
        this.fileList = [];
        if (e.srcElement.files) {
            const temp = Array.from(e.srcElement.files);
            for (const f of e.srcElement.files) {
                Reflect.set(f, 'State', 0);
                if (f.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    this.snackBar.open('只能上传xlsx文件', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-danger'
                    });
                    temp.splice(temp.findIndex((item: any) => item.name === f.name), 1);
                    continue;
                }
            }
            this.fileList = temp;
        }
    }

    deleteFile(index: number) {
        this.fileList.splice(index, 1);
    }

    FileUpLoad() {
        if (this.fileList && this.fileList.length > 0) {
            for (const f of this.fileList) {
                const formData = new FormData();
                formData.append('excelInput', f);
                this.excelUploadService.upload(formData)
                    .subscribe(
                        (res: any) => {
                            if (res.ResultCode === 0) {
                                Reflect.set(f, 'State', 1);
                            }
                        },
                        (error) => {
                            this.snackBar.open('文件上传失败，请重新确认！', '确认', {
                                duration: 1600,
                                verticalPosition: 'top',
                                panelClass: 'snack-bar-color-danger'
                            });
                            Reflect.set(f, 'State', 2);
                        }
                    );
            }
            // console.log(this.fileList);
        } else {
            this.snackBar.open('请先添加文件！', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-info'
            });
        }
    }

    gotoAdd() {
        for (const s of this.smartGatewayList) {
            if (s.DeviceNo === this.SelectsmartGateway.value) {
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        this.router.navigate(['index/devcheckip/add']);
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
        Reflect.set(this.setData, 'PageIndex', event.pageIndex + 1);
        Reflect.set(this.setData, 'PageSize', event.pageSize);
        this.getList();
    }

    gotoInfo(el: any) {
        for (const s of this.smartGatewayList) {
            if (s.DeviceNo === this.SelectsmartGateway.value) {
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/devcheckip/info']);
    }

    gotoEdit(el: any) {
        for (const s of this.smartGatewayList) {
            if (s.DeviceNo === this.SelectsmartGateway.value) {
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/devcheckip/edit']);
    }

    // 控制confim模态框
    showConfim(item: number) {
        this.chooseDeleteSeq = item;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/checkip/12004', { Seq: this.chooseDeleteSeq }, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-success'
                    });
                    this.getList();
                }
            });
        }
    }
    // 其他组件调用条件搜索方法
    search() {
        Reflect.set(this.setData, 'CommonSearch', this.searchName);
        this.getList();
    }
}

