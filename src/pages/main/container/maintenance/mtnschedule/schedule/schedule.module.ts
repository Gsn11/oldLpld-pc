import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { TimeTypeTranslate } from './pipe/timeType.pipe';
import { ServiceTypeTranslate } from './pipe/serviceType.pipe';
import { DayTranslate } from './pipe/day.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { ManyfileModule } from '../../../component/fileUpload/manyFile/manyFile.module';
import { CalendarModule } from '../../../component/calendar/calendar.module';
import { TimeSelectModule } from '../../../component/timeSelect/timeSelect.module';
import { ItemsModule } from '../../component/items/items.module';
import { PriceModule } from '../../component/price/price.module';
import { PhotoSwipeModule } from '../../../component/photoSwipe/photoSwipe.module';
import { UserDialogModule } from '../../../component/dialog/user-dialog/user-dialog.module';
import { CameraDialogModule } from '../../../component/dialog/camera-dialog/camera-dialog.module';
import { UserManyDialogModule } from '../../../component/dialog/userMany-dialog/userMany-dialog.module';
import { SchedulingDialogModule } from '../../../component/dialog/scheduling-dialog/scheduling-dialog.module';



@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    TimeTypeTranslate,
    ServiceTypeTranslate,
    DayTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ScheduleRoutingModule,
    MatCardModule,
    ManyfileModule,
    PhotoSwipeModule,
    CalendarModule,
    TimeSelectModule,
    ItemsModule,
    PriceModule,
    MatSlideToggleModule,
    UserDialogModule,
    UserManyDialogModule,
    SchedulingDialogModule,
    CameraDialogModule
  ]
})
export class ScheduleModule { }
