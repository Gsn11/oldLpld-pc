import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { AlarmdevmgmtRoutingModule } from './alarmdevmgmt-routing.module';
import { IndexComponent } from './index/index.component';
import { TypeTranslate } from './pipe/type.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { InfoComponent } from './info/info.component';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';

@NgModule({
  declarations: [
    IndexComponent,
    TypeTranslate,
    WordTranslate,
    InfoComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    AlarmdevmgmtRoutingModule
  ],
})
export class AlarmdevmgmtModule { }
