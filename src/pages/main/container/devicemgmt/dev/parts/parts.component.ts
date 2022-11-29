import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { DeviceManyDialogComponent } from '../../../../container/component/dialog/devicemany-dialog/devicemany-dialog.component';

@Component({
    selector: 'app-parts',
    templateUrl: './parts.component.html',
    styleUrls: ['./parts.component.scss']
})

export class PartsComponent implements OnInit {
    crumbsList: object;
    DeviceType: string;
    list: object[];
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    bemInfoData: any;
    displayedColumns: any;
    showDevPop = false;
    addDeviceList = []; // 添加弹窗部件列表
    addDeviceListCopy = []; // 添加弹窗部件列表复制
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        route.data
            .subscribe(
                (res: any) => {
                    this.DeviceType = res.type;
                }
            );
        let curmbsName1: string;
        let crumbsName: string;
        if (this.DeviceType === 'smartdev') {
            curmbsName1 = '设备管理';
            crumbsName = '智能设备管理';
        } else if (this.DeviceType === 'commdev') {
            curmbsName1 = '设备管理';
            crumbsName = '通用设备管理';
        } else if (this.DeviceType === 'secdev') {
            curmbsName1 = '设备管理';
            crumbsName = '安全器材管理';
        } else {
            curmbsName1 = 'IOT管理';
            crumbsName = '智联网关管理';
        }
        this.crumbsList = [
            { name: curmbsName1, open: false },
            { name: crumbsName, open: false },
            { name: '部件'}
        ];
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;


        this.displayedColumns = ['DeviceNo', 'Model', 'DeviceName', 'Stat'];
        if (localStorage.getItem('bemInfoData')) {
            this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
            this.getList();
        }
    }

    ngOnInit() {
    }

    // 分页修改时响应方法
    // change(event: any) {
    //     this.pageIndex = event.pageIndex + 1;
    //     this.pageSize = event.pageSize;
    //     this.getList();
    // }

    getList() {
        this.service.serviceR('ent/device/6013', { DSeq: this.bemInfoData.Seq }, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res);
                this.list = res.Result.DeviceParts;
            }
        });
    }

    // 右边上方调用设备多选方法
    openDialog(): void {
        const dialogRef = this.dialog.open(DeviceManyDialogComponent, {
            width: '1080px',
            data: {
                isParts: true
            }
        });
         
        dialogRef.afterClosed().subscribe(result => {
            if (this.addDeviceList.length === 0) {
                this.addDeviceList = result.selected;
            } else {
                result.selected.forEach(item => {
                    let index = 0;
                    this.addDeviceList.forEach(item2 => {
                        if (item2.Seq !== item.Seq) {
                            index ++;
                        }
                    });
                    if (index === this.addDeviceList.length) {
                        this.addDeviceList.push(item);
                    }
                });
            }
            this.addDeviceListCopy = [...this.addDeviceList];
        });
        // this.addDeviceListCopy = this.addDeviceList;
        
        // console.log(this.addDeviceListCopy, '111111111111')
    }

    addDev() {
        if (this.addDeviceListCopy.length === 0) {
            this.snackBar.open('无设备', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            this.showDevPop = false;
            return false;
        }

        const data = {
            DSeq: this.bemInfoData.Seq,
            List: []
        };

        this.addDeviceListCopy.forEach(item => {
            data.List.push({
                PSeq: item.Seq,
                PName: item.DeviceName
            });
        });
        this.addDeviceList = this.addDeviceListCopy;
        this.service.serviceR('ent/device/6012', data, (res: any) => {
            if (res.ResultCode === 0) {
                if (res.ResultCode === 0) {
                    this.snackBar.open('设置成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.showDevPop = false;
                    this.getList();
                }
            }
        });
    }

    cancel() {
        this.showDevPop = false;
        this.addDeviceListCopy = this.addDeviceList;
    }
}

