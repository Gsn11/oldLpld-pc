import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { MsgmgmtRoutingModule } from './msgmgmt-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { ActionTranslate } from './pipe/action.pipe';
import { UserManyDialogModule } from '../../component/dialog/userMany-dialog/userMany-dialog.module';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    ActionTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    MsgmgmtRoutingModule,
    CalendarModule,
    ManyfileModule,
    UserManyDialogModule
  ],
  exports: [
    ActionTranslate
  ]
})
export class MsgmgmtModule { }
