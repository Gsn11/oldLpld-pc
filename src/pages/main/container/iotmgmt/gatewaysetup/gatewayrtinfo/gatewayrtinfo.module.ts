import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { GatewayrtinfoRoutingModule } from './gatewayrtinfo-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { AddressPipeModule } from '../../../component/addressPipe/addressPipe.module';
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
    AddressPipeModule,
    GatewayrtinfoRoutingModule
  ],
})
export class GatewayrtinfoModule { }
