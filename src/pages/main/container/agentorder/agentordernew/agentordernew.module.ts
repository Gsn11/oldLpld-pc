import { NgModule } from '@angular/core';
import { AgentordernewRoutingModule } from './agentordernew-routing.module';
import { CommonUseModule } from '../../../../common/common.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ItemsModule } from '../../maintenance/component/items/items.module';
import { UserManyDialogModule } from '../../component/dialog/userMany-dialog/userMany-dialog.module';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';


@NgModule({
	declarations: [
		IndexComponent,
		AddComponent,
	],
	imports: [
		AgentordernewRoutingModule,
		NgxEchartsModule,
		CommonModule,
		CommonUseModule,
		CalendarModule,
		ItemsModule,
		UserManyDialogModule,
		ManyfileModule
	],
})
export class AgentordernewModule { }
