import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { OrderStaticReportRoutingModule } from './orderStaticReport-routing.module';
import { OrderStaticReportComponent } from './index/orderStaticReport.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatRadioModule } from '@angular/material/radio';
import { InfoComponent } from './info/info.component';
import { StaffComponent } from './staff/staff.component';
import { ChartAllComponent } from './chartAll/chartAll.component';
import { ChartTypeComponent } from './chartType/chartType.component';
import { ChartStatusComponent } from './chartStatus/chartStatus.component';
import { ChartPersonComponent } from './chartPerson/chartPerson.component';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
	declarations: [
		OrderStaticReportComponent,
		InfoComponent,
		StaffComponent,
		ChartAllComponent,
		ChartTypeComponent,
		ChartStatusComponent,
		ChartPersonComponent
	],
	imports: [
		CommonUseModule,
		// CalendarModule,
		OrderStaticReportRoutingModule,
		NgxEchartsModule,
		MatRadioModule,
		CalendarModule,
		MatDatepickerModule, MatInputModule, MatNativeDateModule
	],
})
export class OrderStaticReport { }
