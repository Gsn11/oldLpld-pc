import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Service } from '../../../../../../service/service';
import { ExcelUploadComponent } from '../../../../component/excelUpload/excelUpload.component';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';

export interface ISetdataList {
    CommonSearch: string;
    State: number;
    PageIndex: number;
    PageSize: number;
    protocol: number; // 协议类型
}

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
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
    chooseDelete: any;
    smartGatewayList: any;
    SelectsmartGateway: any;
    protocolList: any;
    SelectProtocol: any;
    Protocol: any;
    AddBottonDisabled: boolean;
    SearchInformation: string;
    ServiceAddr: string;
    fileBoxShow: boolean;
    fileList: any;
    @ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
    UploadAddr: string;
    downloadInfo: string;
    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private service: Service
    ) {
        this.crumbsList = [
            { name: 'IOT管理', open: false },
            // { name: '智联网关', open: false },
            { name: '监测点管理', open: false }
        ];
        this.bemDevice = JSON.parse(localStorage.getItem('bemDevice'));
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setData = {
            CommonSearch: '',
            State: 0,
            PageIndex: 1,
            PageSize: 10,
            protocol: null
        };
        this.setConfim = false;
        this.displayedColumns = ['DeviceNo', 'SmartDevNo', 'Protocol', 'MetricsDesc', 'IsAlert', 'Other'];
        this.List = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.SelectsmartGateway = new FormControl('');
        this.SelectProtocol = new FormControl('');
        this.Protocol = [
            { name: 'BACNET', id: 0 },
            { name: 'MODBUS', id: 1 },
            { name: 'OPC DA', id: 2 },
            { name: 'OPC UA', id: 3 },
            { name: 'OBIX', id: 4 },
            { name: 'BEM', id: 5 },
        ];
        this.AddBottonDisabled = false;
        this.SearchInformation = '';
        this.ServiceAddr = 'http://www.bemcn.com.cn:10080/';
        this.fileBoxShow = false;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.UploadAddr = 'ent/iot/batchmetric/30001';
        this.downloadInfo = '请下载监测点对照表';
    }

    ngOnInit() {
        if (this.bemDevice) {
            this.SelectsmartGateway.setValue(this.bemDevice.Seq);
            this.smartGatewayChange({ value: this.bemDevice.Seq });
            this.SelectProtocol.setValue(this.bemDevice.Protocol);
        }
        const deviceData = {
            MainType: '2',
            NeedShare: 1,
            State: 0
        };
        this.service.serviceR('ent/device/6001', deviceData, (res: any) => {
            if (res.ResultCode === 0) {
                this.smartGatewayList = res.Result.Devices;
            }
        });
    }

    getList() {
        if (this.setData.protocol === 0) {
            this.SearchInformation = '/Bacnet';
            this.service.serviceR('ent/iot/metricsbacnet/11511', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.List = res.Result.MetricsBacnets;
                    this.paginatorTotal = res.Result.Total;
                }
            });
        } else if (this.setData.protocol === 1) {
            this.SearchInformation = '/Modbus';
            this.service.serviceR('ent/iot/metricsmodbus/11611', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.List = res.Result.MetricsModbuss;
                    this.paginatorTotal = res.Result.Total;
                }
            });
        } else if (this.setData.protocol === 2 || this.setData.protocol === 3) {
            this.SearchInformation = '/OPC';
            this.service.serviceR('ent/iot/metricsopc/11711', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.List = res.Result.MetricOpcs;
                    this.paginatorTotal = res.Result.Total;
                }
            });
        } else if (this.setData.protocol === 4) {
            this.SearchInformation = '/OBIX';
            this.service.serviceR('ent/iot/metricsobix/11411', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.List = res.Result.MetricObixs;
                    this.paginatorTotal = res.Result.Total;
                }
            });
        } else if (this.setData.protocol === 5) {
            this.SearchInformation = '/BEM';
            this.service.serviceR('ent/iot/metricsbem/11911', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.List = res.Result.MetricsBems;
                    this.paginatorTotal = res.Result.Total;
                }
            });
        }
    }

    smartGatewayChange(event: any) {
        this.SearchInformation = '';
        this.AddBottonDisabled = false;
        this.SelectProtocol.setValue('');
        if (!event.value) {
            return;
        }
        const gatewayProtocol = {
            DSeq: event.value,
            State: 0
        };
        this.service.serviceR('ent/iot/gatewayprotocol/11801', gatewayProtocol, (res: any) => {
            if (res.ResultCode === 0) {
                const temp = res.Result.GatewayProtocols;
                this.protocolList = this.checkProtocol(temp);
                if (this.protocolList.length === 0) {
                    this.snackBar.open('网关没有相对协议，请重新确认后选择！', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-danger'
                    });
                } else {
                    this.SelectProtocol.setValue(this.protocolList[0].Protocol);
                    switch (this.protocolList[0].Protocol) {
                        case 0: Reflect.set(this.setData, 'protocol', 0); break;
                        case 1: Reflect.set(this.setData, 'protocol', 1); break;
                        case 2: Reflect.set(this.setData, 'protocol', 2); break;
                        case 3: Reflect.set(this.setData, 'protocol', 3); break;
                        case 4: Reflect.set(this.setData, 'protocol', 4); break;
                        case 5: Reflect.set(this.setData, 'protocol', 5); break;
                    }
                    this.SearchInformation = '';
                    this.AddBottonDisabled = true;
                    this.getList();
                }
            }
        });
    }

    checkProtocol(list: any, total: number = 0, data = []) {
        if (total === 6) {
            return data;
        }
        for (const l of list) {
            if (l.Protocol === total) {
                data.push(l);
                break;
            }
        }
        return this.checkProtocol(list, total += 1, data);
    }

    protocolChange(event: any) {
        this.SearchInformation = '';
        if (!event.value) {
            return;
        }
        switch (event.value) {
            case 0: Reflect.set(this.setData, 'protocol', 0); break;
            case 1: Reflect.set(this.setData, 'protocol', 1); break;
            case 2: Reflect.set(this.setData, 'protocol', 2); break;
            case 3: Reflect.set(this.setData, 'protocol', 3); break;
            case 4: Reflect.set(this.setData, 'protocol', 4); break;
            case 5: Reflect.set(this.setData, 'protocol', 5); break;
        }
        this.getList();
    }

    downloadFile() {
        window.open(this.ServiceAddr + 'static/metrics.zip', 'blank');
    }

    fileBoxChange() {
        this.excelUpload.fileBoxChange();
    }

    gotoAdd() {
        for (const s of this.smartGatewayList) {
            if (s.Seq === this.SelectsmartGateway.value) {
                Reflect.set(s, 'Protocol', this.SelectProtocol.value);
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        this.router.navigate(['index/devmetric/add']);
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
            if (s.Seq === this.SelectsmartGateway.value) {
                Reflect.set(s, 'Protocol', this.SelectProtocol.value);
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/devmetric/info']);
    }

    gotoEdit(el: any) {
        for (const s of this.smartGatewayList) {
            if (s.Seq === this.SelectsmartGateway.value) {
                Reflect.set(s, 'Protocol', this.SelectProtocol.value);
                localStorage.setItem('bemDevice', JSON.stringify(s));
                break;
            }
        }
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/devmetric/edit']);
    }

    // 控制confim模态框
    showConfim(item: number) {
        this.chooseDelete = item;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            let pLink: string;
            switch (this.chooseDelete.Protocol) {
                case 'BACNET': pLink = 'ent/iot/metricsbacnet/11504'; break;
                case 'MODBUS': pLink = 'ent/iot/metricsmodbus/11604'; break;
                case 'OPC': pLink = 'ent/iot/metricsopc/11704'; break;
                case 'OBIX': pLink = 'ent/iot/metricsobix/11404'; break;
                case 'Bem': pLink = 'ent/iot/metricsbem/11904'; break;
            }
            this.service.serviceR(pLink, { Seq: this.chooseDelete.Seq }, (res: any) => {
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

    // 其他组件调用条件搜索方法
    search() {
        Reflect.set(this.setData, 'CommonSearch', this.searchName);
        this.getList();
    }
    downloadDeviceFile() {
        const body = {
            CommonSearch: this.searchName ? this.searchName : '',
            FileName: '监测点管理'
        };
        let pLink: string;
        let PValue: string;
        console.log(this.Protocol);
        for (const i of this.Protocol) {
          console.log(this.SelectProtocol.value);
          if ( i.id === this.SelectProtocol.value ) {
            PValue = i.name;
          }
        }
        console.log(PValue);
        switch (PValue) {
            case 'BACNET': pLink = 'ent/iot/metricsbacnet/11501/export'; break;
            case 'MODBUS': pLink = 'ent/iot/metricsmodbus/11601/export'; break;
            case 'OPC': pLink = 'ent/iot/metricsopc/11701/export'; break;
            case 'OBIX': pLink = 'ent/iot/metricsobix/11401/export'; break;
            case 'BEM': pLink = 'ent/iot/metricsbem/11901/export'; break;
            case 'MQTT': pLink = 'ent/iot/metricsmqtt/12001/export'; break;
        }
        console.log(pLink);
        if (PValue) {
        new DownloadFile(body, pLink).downloadfile();
    } else {
        this.snackBar.open('请选择协议', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
        });
    }
    }
}

