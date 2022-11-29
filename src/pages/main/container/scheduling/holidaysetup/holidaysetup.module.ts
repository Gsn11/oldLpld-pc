import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { HolidaysetupRoutingModule } from './holidaysetup-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserDialogModule } from '../../component/dialog/user-dialog/user-dialog.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    CalendarModule,
    MatDatepickerModule,
    UserDialogModule,
    HolidaysetupRoutingModule,
    NzSelectModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule
  ],
})
export class HolidaysetupModule { }
