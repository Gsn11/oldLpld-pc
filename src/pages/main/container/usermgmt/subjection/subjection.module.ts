import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { SubjectionRoutingModule } from './subjection-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    SubjectionRoutingModule,
  ]
})
export class SubjectionModule { }
