import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { scheduleComponent } from './index/schedule.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ModalComponent } from './component/modal/modal.component';
import { DoubleComponent } from './component/double/double.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations: [
    scheduleComponent,
    ModalComponent,
    DoubleComponent
  ],
  imports: [
    CommonUseModule,
    ScheduleRoutingModule,
    // CalendarModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    CalendarModule,
    NzSelectModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule
  ],
})
export class  ScheduleModule { }
