import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { GatewayprotocolRoutingModule } from './gatewayprotocol-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { TypeTranslate } from './type.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    TypeTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    GatewayprotocolRoutingModule
  ]
})
export class GatewayprotocolModule { }
