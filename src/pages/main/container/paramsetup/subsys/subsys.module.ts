import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { SubsysRoutingModule } from './subsys-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { SinglefileModule } from '../../component/fileUpload/singleFile/singleFile.module';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    SinglefileModule,
    SubsysRoutingModule
  ],
})
export class SubsysModule { }
