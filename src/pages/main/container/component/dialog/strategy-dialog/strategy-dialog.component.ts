import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import {  MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';
import { Service } from '../../../../../service/service';

export interface DialogData {
    State: number;
    BSeqs: number | string;
    UserType: number;
    subjection?: number | string;
    title?: string;
    multiple: any;
}

@Component({
    selector: 'app-strategy-dialog',
    templateUrl: './strategy-dialog.component.html',
    styleUrls: ['./strategy-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategyDialogComponent implements OnInit {
    checkAll = false; // 是否全选
    searchName: string = null;
    list: any = null;
    selectList: any = [];
    PageIndex: number;
    PageSize: number;
    displayedColumns: string[];
    displayedColumns2: string[];
    paginatorTotal: number;
    checkList = []; // 选中的列
    multiple = true; // 是否多选
    smartGatewayList: any;
    SelectProtocol = new FormControl('');
    setData: any;
    formula: any;
    constructor(
        private snackBar: MatSnackBar,
        private ngZone: NgZone,
        public dialogRef: MatDialogRef<StrategyDialogComponent>,
        private service: Service,
        private cdr: ChangeDetectorRef
    ) {
        this.PageIndex = 1;
        this.PageSize = 5;
        this.paginatorTotal = null;

        this.displayedColumns = ['name', 'variable', 'formula', 'operate'];
        this.displayedColumns2 = ['name', 'dev', 'type', 'spot', 'variable', 'formula'];

        this.setData = {
            CommonSearch: '',
            State: 0,
            PageIndex: 1,
            PageSize: 5,
            protocol: null
        };
    }

    ngOnInit() {
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

    smartGatewayChange(event: any) {
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
                this.list = this.checkProtocol(temp);
                if (this.list.length === 0) {
                    this.snackBar.open('网关没有相对协议，请重新确认后选择！', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-danger'
                    });
                } else {
                    this.SelectProtocol.setValue(this.list[0].Protocol);
                    switch (this.list[0].Protocol) {
                        case 5: Reflect.set(this.setData, 'protocol', 5); break;
                    }
                    this.list = [];
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

    getList() {
        this.list = [];
        if (this.setData.protocol === 0) {
            this.service.serviceR('ent/iot/metricsbacnet/11511', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.list = new MatTableDataSource(res.Result.MetricsBacnets);
                    this.paginatorTotal = res.Result.Total;
                    this.cdr.markForCheck();
                }
            });
        } else if (this.setData.protocol === 1) {
            this.service.serviceR('ent/iot/metricsmodbus/11611', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.list = new MatTableDataSource(res.Result.MetricsModbuss);
                    this.paginatorTotal = res.Result.Total;
                    this.cdr.markForCheck();
                    this.ngZone.run(() => {});
                }
            });
        } else if (this.setData.protocol === 2 || this.setData.protocol === 3) {
            this.service.serviceR('ent/iot/metricsopc/11711', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.list = new MatTableDataSource(res.Result.MetricOpcs);
                    this.paginatorTotal = res.Result.Total;
                    this.cdr.markForCheck();
                    this.ngZone.run(() => {});
                }
            });
        } else if (this.setData.protocol === 4) {
            this.service.serviceR('ent/iot/metricsobix/11411', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.list = new MatTableDataSource(res.Result.MetricObixs);
                    this.paginatorTotal = res.Result.Total;
                    this.cdr.markForCheck();
                    this.ngZone.run(() => {});
                }
            });
        } else if (this.setData.protocol === 5) {
            this.service.serviceR('ent/iot/metricsbem/11911', this.setData, (res: any) => {
                if (res.ResultCode === 0) {
                    this.list = new MatTableDataSource(res.Result.MetricsBems);
                    this.paginatorTotal = res.Result.Total;
                    this.cdr.markForCheck();
                    this.ngZone.run(() => {});
                }
            });
        }
    }

    // 分页修改时响应方法
    change(event: any) {
        this.setData.PageIndex = event.pageIndex + 1;
        this.setData.PageSize = event.pageSize;
        this.getList();
    }

    choose(el: any) {
        this.selectList.push(el);
        const list = [];
        this.selectList.forEach(item => {
            list.push(item);
        });
        this.selectList = list;
    }

    confirm() {
        // if (!this.formula) {
        //     this.snackBar.open('请输入策略公式', '确认', {
        //         duration: 1600,
        //         verticalPosition: 'top',
        //         panelClass: 'snack-bar-color-danger'
        //     });
        //     return false;
        // }
        this.dialogRef.close([this.selectList]);
    }

    del(index) {
        this.selectList.splice(index, 1);
        const list = [];
        this.selectList.forEach(item => {
            list.push(item);
        });
        this.selectList = list;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    search() {
        Reflect.set(this.setData, 'CommonSearch', this.searchName);
        this.getList();
    }
}
