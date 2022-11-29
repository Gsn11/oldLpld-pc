import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { devExamineReportComponent } from './index/index.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { DevExamineReportRoutingModule } from './devExamineReport-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { InfoComponent } from './info/info.component';

@NgModule({
	declarations: [
		devExamineReportComponent,
		InfoComponent
	],
	imports: [
		CommonUseModule,
		DevExamineReportRoutingModule,
		// CalendarModule,
		MatRadioModule,
		MatCardModule,
		MatTabsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		CalendarModule
	],
})
export class DevExamineReportModule { }
