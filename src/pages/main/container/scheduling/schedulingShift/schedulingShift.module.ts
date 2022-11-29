import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { schedulingShiftComponent } from './index/schedulingShift.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { SchedulingShiftRoutingModule } from './schedulingShift-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { SchedulingShiftModalModule } from './schedulingShiftModal/schedulingShiftModal.module';
@NgModule({
  declarations: [
    schedulingShiftComponent,
  ],
  imports: [
    CommonUseModule,
    SchedulingShiftModalModule,
    SchedulingShiftRoutingModule,
    // CalendarModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    CalendarModule,
  ],
})
export class  SchedulingShiftModule { }
