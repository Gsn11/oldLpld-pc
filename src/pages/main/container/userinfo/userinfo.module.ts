import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../common/common.module';
import { UserinfoRoutingModule } from './userinfo-routing.module';
import { UserinfoComponent } from './userinfo.component';
import { ManyfileModule } from '../component/fileUpload/manyFile/manyFile.module';
import { SinglefileModule } from '../component/fileUpload/singleFile/singleFile.module';
import { CalendarModule } from '../component/calendar/calendar.module';
import { SexTranslate } from './userinfo.pipe';

@NgModule({
  declarations: [
    UserinfoComponent,
    SexTranslate,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    SinglefileModule,
    CalendarModule,
    UserinfoRoutingModule
  ],
})
export class UserinfoModule { }
