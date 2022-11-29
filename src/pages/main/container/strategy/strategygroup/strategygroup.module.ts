import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { StrategygroupRoutingModule } from './strategygroup-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { TimeSelectModule } from '../../component/timeSelect/timeSelect.module';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { SelectStrategyDialogModule } from '../../component/dialog/select-strategy-dialog/select-strategy-dialog.module';
import { LookStrategyDialogModule } from '../../component/dialog/look-strategy-dialog/look-strategy-dialog.module';
import { UserManyDialogModule } from '../../component/dialog/userMany-dialog/userMany-dialog.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    StrategygroupRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    CalendarModule,
    ManyfileModule,
    TimeSelectModule,
    SelectStrategyDialogModule,
    LookStrategyDialogModule,
    UserManyDialogModule
  ]
})
export class Strategygroup { }
