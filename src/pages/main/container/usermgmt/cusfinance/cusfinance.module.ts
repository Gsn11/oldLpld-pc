import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { CusfinanceRoutingModule } from './cusfinance-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { RechargeComponent } from './recharge/recharge.component';
import { FinanceType } from './pipe/financeType.pipe';
import { AccountsType } from './pipe/accountsType.pipe';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { MatButtonModule } from '@angular/material/button';
import { WechatDialogModule } from '../../component/dialog/wechat-dialog/wechat-dialog.module';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    RechargeComponent,
    FinanceType,
    AccountsType
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    CalendarModule,
    CusfinanceRoutingModule,
    MatButtonModule,
    WechatDialogModule,
    QRCodeModule
  ],
})
export class CusfinanceModule { }
