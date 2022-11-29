import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { scheduleDateReportComponent } from './scheduleDateReport.component';
import { ScheduleDateReportRoutingModule } from './scheduleDateReport-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ValueRangeModule } from '../component/valueRange/valueRange.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
	declarations: [
		scheduleDateReportComponent,
	],
	imports: [
		CommonUseModule,
		ScheduleDateReportRoutingModule,
		MatRadioModule,
		MatCardModule,
		MatTabsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		CalendarModule,
		ValueRangeModule,
		NzButtonModule,
		NzTableModule
	],
})
export class ScheduleDateReportModule { }
