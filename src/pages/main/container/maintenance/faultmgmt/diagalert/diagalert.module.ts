import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { DiagalertRoutingModule } from './diagalert-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { StateTypeTranslate } from './pipe/statetype.pipe';
import { ActiveNameTypeTranslate } from './pipe/activename.pipe';
import { ServiceTypeTranslate } from './pipe/serviceType.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { ManyfileModule } from '../../../component/fileUpload/manyFile/manyFile.module';
import { AddressPipeModule } from '../../../component/addressPipe/addressPipe.module';
import { PriceModule } from '../../component/price/price.module';
import { MatSortModule } from '@angular/material';


@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    StateTypeTranslate,
    ServiceTypeTranslate,
    ActiveNameTypeTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    DiagalertRoutingModule,
    MatCardModule,
    MatTabsModule,
    ManyfileModule,
    AddressPipeModule,
    PriceModule,
    MatSortModule
  ]
})
export class DiagalertModule { }
