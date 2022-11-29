import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../common/common.module';
import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchComponent } from './workbench.component';
// import { CalendarModule } from '../component/calendar/calendar.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    WorkbenchComponent,
  ],
  imports: [
    CommonUseModule,
    WorkbenchRoutingModule,
    NgxEchartsModule,
    MatRadioModule
  ],
})
export class Workbench { }
