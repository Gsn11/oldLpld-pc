import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { WechatDialogComponent } from '../../../../component/dialog/wechat-dialog/wechat-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-recharge',
    templateUrl: './recharge.component.html',
    styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent {
    userInfo: any;
    bemInfoData: any;
    crumbsList: object;
    setConfim: boolean;
    userPower: boolean;
    Point: number;
    checkRecharge: boolean;
    chooseRecharge: string;
    PayOrderNo: string;
    checkAgreement: boolean;
    tradeNo: string;
    qrCode: string;
    orderItem: any;
    OrderType: string;
    constructor(
        private route: ActivatedRoute,
        private service: Service,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
        route.data
          .subscribe(
            (res: any) => {
              this.OrderType = res.type;
            }
          );
        this.crumbsList = [
            { name: '用户权限', open: false },
            { name: '财务资金', open: true, url: 'cusfinance' },
            { name: '充值', open: false }
        ];
        // this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
        // this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
        this.orderItem = JSON.parse(localStorage.getItem('fixOrderItem'));
        // console.log(this.orderItem);
        this.userPower = false;
        this.setConfim = false;
        this.Point = null;
        this.checkRecharge = false;
        this.chooseRecharge = 'wechat';
        this.PayOrderNo = null;
        this.checkAgreement = false;
        this.tradeNo = null;
        this.qrCode = null;
    }

    goback() {
        this.router.navigate(['index/' + this.OrderType]);
    }

    rechargeCheck() {
        if (this.Point === null) {
            this.snackBar.open('充值金额不能为空', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (this.Point <= 0) {
            this.snackBar.open('请确认充值金额必须大于等于0', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        this.checkRecharge = true;
    }

    changeRechargeMode(mode: string) {
        if (mode === 'alipay') {
            this.snackBar.open('支付宝支付尚在开发中，请选择微信支付', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
            });
            return;
        } else if (mode === 'wechart') {
            this.chooseRecharge = 'wechart';
        }
    }

    rechargeBuy() {
        const rechargeType = this.chooseRecharge === 'alipay' ? 2 : 1;
        const data = {
            // Payer: this.orderItem.OrderSeq,
            Order: this.orderItem.OrderSeq,
            PayerActType: rechargeType,
            PayeeActType: rechargeType,
            TradeType: 'NATIVE',
            // Amount: this.Point,
        };
        // console.log(data);
        this.service.serviceR('ent/finance/customer/5002', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.PayOrderNo = res.Result.PayOrderNo;
                if (rechargeType === 2) {
                    this.getAlipayCode();
                } else if (rechargeType === 1) {
                    this.getWChartCode();
                }
            }
        });
    }

    getAlipayCode() {
        const data = {
            PayOrderNo: this.PayOrderNo,
            TotalFee: this.Point,
        };
        this.service.serviceR('pay/alipay', data, (res: any) => {
            if (res.ResultCode === 0) {
                // console.log(123);
            }
        });
    }

    getWChartCode() {
        const data = {
            PayOrderNo: this.PayOrderNo,
            TotalFee: this.Point,
            TradeType: 'NATIVE'
        };
        this.service.serviceR('pay/weixin', data, (res: any) => {
            if (res.ResultCode === 0) {
                const dialogRef = this.dialog.open(WechatDialogComponent, {
                    width: '400px',
                    data: {
                        orderId: res.Result.Result.tradeNo,
                        qrCode: res.Result.Result.wchatCode
                    }
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        this.router.navigate(['index/' + this.OrderType]);
                    } else {
                        this.router.navigate(['index/' + this.OrderType]);
                    }
                });
            }
        });
    }
}
