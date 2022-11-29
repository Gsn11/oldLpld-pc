import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { IIndexList } from './index.interface';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    ArriveExpire: number = null;
    WorkExpire: number = null;
    OrderTimeOut: number = null;
    SmsLimit: number = null;
    crumbsList: object;
    DistanceLimit: number = null;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '派单设置', open: false }
        ];
    }

    ngOnInit() {
        const data = {
            State: 0
        };
        this.service.serviceR('ent/params/schedulesetup/11701', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.ArriveExpire = res.Result.ScheduleSetup[0].ArriveExpire;
                this.WorkExpire = res.Result.ScheduleSetup[0].WorkExpire;
                this.OrderTimeOut = res.Result.ScheduleSetup[0].OrderTimeOut;
                this.SmsLimit = res.Result.ScheduleSetup[0].SmsLimit;
                this.DistanceLimit = res.Result.ScheduleSetup[0].DistanceLimit;
            }
        });
    }

    userSave() {
        if (!this.ArriveExpire && this.ArriveExpire === null) {
            this.snackBar.open('请输入到达时限', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.WorkExpire && this.WorkExpire === null) {
            this.snackBar.open('请输入反馈时限', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.OrderTimeOut && this.OrderTimeOut === null) {
            this.snackBar.open('请输入接单超时', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.SmsLimit && this.SmsLimit === null) {
            this.snackBar.open('请输入发送确认短信金额', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.DistanceLimit && this.DistanceLimit === null) {
            this.snackBar.open('请输入派单限制距离', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        const data: IIndexList = {
            ArriveExpire: this.ArriveExpire,
            WorkExpire: this.WorkExpire,
            OrderTimeOut: this.OrderTimeOut,
            SmsLimit: this.SmsLimit,
            DistanceLimit: this.DistanceLimit
        };
        this.service.serviceR('ent/params/schedulesetup/11703', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.snackBar.open('派单设置参数成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            }
        });
    }
}

