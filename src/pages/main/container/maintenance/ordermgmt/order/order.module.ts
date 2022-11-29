import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { OrderRoutingModule } from './order-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { VideoComponent } from './video/video.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { RechargeComponent } from './recharge/recharge.component';
import { OrderPipeModule } from '../../component/pipe/orderPipe.module';
import { ManyfileModule } from '../../../component/fileUpload/manyFile/manyFile.module';
import { CalendarModule } from '../../../component/calendar/calendar.module';
import { ItemsModule } from '../../component/items/items.module';
import { PriceModule } from '../../component/price/price.module';
import { WechatDialogModule } from '../../../component/dialog/wechat-dialog/wechat-dialog.module';
import { UserDialogModule } from '../../../component/dialog/user-dialog/user-dialog.module';
import { ConfirmDialogModule } from '../../../component/dialog/confirm-dialog/confirm-dialog.module';
import { CheckDialogModule } from '../../../component/dialog/check-dialog/check-dialog.module';
import { QRCodeModule } from 'angular2-qrcode';
import { CoreModalModalModule } from '../order/orderComponent/coreModal.module';
import { UserManyDialogModule } from '../../../component/dialog/userMany-dialog/userMany-dialog.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
	declarations: [
		IndexComponent,
		AddComponent,
		InfoComponent,
		EditComponent,
		VideoComponent,
		RechargeComponent
	],
	imports: [
		CommonModule,
		CommonUseModule,
		OrderRoutingModule,
		MatCardModule,
		MatTabsModule,
		MatSlideToggleModule,
		ManyfileModule,
		CalendarModule,
		ItemsModule,
		PriceModule,
		WechatDialogModule,
		UserDialogModule,
		ConfirmDialogModule,
		CheckDialogModule,
		QRCodeModule,
		OrderPipeModule,
		CoreModalModalModule,
		UserManyDialogModule,
		NzModalModule
	]
})
export class OrderModule { }
