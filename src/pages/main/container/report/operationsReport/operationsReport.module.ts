import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { operationsReportComponent } from './index/operationsReport.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { OperationsReportRoutingModule } from './operationsReport-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    operationsReportComponent,
    InfoComponent
  ],
  imports: [
    CommonUseModule,
    OperationsReportRoutingModule,
    // CalendarModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    CalendarModule
  ],
})
export class  OperationsReportModule { }
