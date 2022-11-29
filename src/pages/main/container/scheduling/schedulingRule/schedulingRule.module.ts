import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { schedulingRuleComponent } from './index/schedulingRule.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { SchedulingRuleRoutingModule } from './schedulingRule-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { SchedulingRuleModalModule } from './schedulingRuleModal/schedulingRuleModal.module';
import { UserDialogModule } from '../../component/dialog/user-dialog/user-dialog.module';
import { ScheDialogModule } from '../../component/dialog/sche-dialog/sche-dialog.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    schedulingRuleComponent,
  ],
  imports: [
    SchedulingRuleModalModule,
    CommonUseModule,
    SchedulingRuleRoutingModule,
    // CalendarModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    CalendarModule,
    UserDialogModule,
    ScheDialogModule,
    NzButtonModule,
    NzSelectModule,
  ],
})
export class  SchedulingRuleModule { }
