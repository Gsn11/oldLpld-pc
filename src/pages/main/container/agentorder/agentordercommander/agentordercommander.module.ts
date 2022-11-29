import { NgModule } from '@angular/core';
import { AgentordercommanderRoutingModule } from './agentordercommander-routing.module';
import { CommonUseModule } from '../../../../common/common.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { IndexComponent } from './index/index.component';
import { ExamineComponent } from './examine/examine.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ItemsModule } from '../../maintenance/component/items/items.module';
import { UserManyDialogModule } from '../../component/dialog/userMany-dialog/userMany-dialog.module';
import { OrderPipeModule } from '../../maintenance/component/pipe/orderPipe.module';


@NgModule({
	declarations: [
		IndexComponent,
		ExamineComponent,
	],
	imports: [
		AgentordercommanderRoutingModule,
		NgxEchartsModule,
		CommonModule,
		CommonUseModule,
		CalendarModule,
		ItemsModule,
		OrderPipeModule,
		UserManyDialogModule
	],
})
export class AgentordercommanderModule { }
