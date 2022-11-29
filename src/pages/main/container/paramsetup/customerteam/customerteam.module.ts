import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { CustomerteamRoutingModule } from './customerteam-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { TreeModule } from '../../component/tree/tree.module';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    TreeModule,
    CustomerteamRoutingModule
  ],
})
export class CustomerteamModule { }
