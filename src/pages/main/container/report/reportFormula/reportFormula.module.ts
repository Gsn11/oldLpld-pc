import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { reportFormulaComponent } from './reportFormula.component';
import { ReportFormulaRoutingModule } from './reportFormula-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ValueRangeModule } from '../component/valueRange/valueRange.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import {ElModule} from 'element-angular';
@NgModule({
	declarations: [
		reportFormulaComponent
	],
	imports: [
		CommonUseModule,
		ReportFormulaRoutingModule,
		MatRadioModule,
		MatCardModule,
		MatTabsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		CalendarModule,
		ValueRangeModule,
		NzTableModule,
		ElModule.forRoot()
	],
})
export class ReportFormulaModule { }
