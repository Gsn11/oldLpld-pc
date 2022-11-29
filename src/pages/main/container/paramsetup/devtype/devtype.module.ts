import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { DevtypeRoutingModule } from './devtype-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { TreeModule } from '../../component/tree/tree.module';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    TreeModule,
    DevtypeRoutingModule
  ],
})
export class DevtypeModule { }
