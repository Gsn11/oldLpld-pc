import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { secpumpComponent } from './secpump.component';
import { SecpumpRoutingModule } from './secpump-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ValueRangeModule } from '../component/valueRange/valueRange.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
	declarations: [
		secpumpComponent,
	],
	imports: [
		CommonUseModule,
		SecpumpRoutingModule,
		MatRadioModule,
		MatCardModule,
		MatTabsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		CalendarModule,
		ValueRangeModule,
		NzTableModule,
		NzButtonModule
	],
})
export class SecpumpModule { }
