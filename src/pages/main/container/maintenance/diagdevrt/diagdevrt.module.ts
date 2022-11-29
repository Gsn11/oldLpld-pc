import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { DiagdevrtRoutingModule } from './diagdevrt-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { AddressPipeModule } from '../../component/addressPipe/addressPipe.module';
import { MatSortModule } from '@angular/material';
import { WordTranslate } from './pipe/word.pipe';
@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    DiagdevrtRoutingModule,
    AddressPipeModule,
    MatSortModule
  ],
})
export class DiagdevrtModule { }
