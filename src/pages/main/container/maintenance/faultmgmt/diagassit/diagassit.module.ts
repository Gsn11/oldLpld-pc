import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { DiagassitRoutingModule } from './diagassit-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { AddAlarmComponent } from './addAlarm/add.component';
import { InfoAlarmComponent } from './infoAlarm/info.component';
import { StateTypeTranslate } from './pipe/statetype.pipe';
import { ActiveNameTypeTranslate } from './pipe/activename.pipe';
import { ServiceTypeTranslate } from './pipe/serviceType.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { ManyfileModule } from '../../../component/fileUpload/manyFile/manyFile.module';
import { AddressPipeModule } from '../../../component/addressPipe/addressPipe.module';
import { PriceModule } from '../../component/price/price.module';
import { MatSortModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { UserDialogModule } from '../../../component/dialog/user-dialog/user-dialog.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    AddAlarmComponent,
    InfoAlarmComponent,
    InfoComponent,
    StateTypeTranslate,
    ServiceTypeTranslate,
    ActiveNameTypeTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    CommonUseModule,
    DiagassitRoutingModule,
    MatCardModule,
    MatTabsModule,
    ManyfileModule,
    AddressPipeModule,
    PriceModule,
    MatSortModule,
    UserDialogModule,
    NzIconModule
  ],
})
export class DiagassitModule { }
