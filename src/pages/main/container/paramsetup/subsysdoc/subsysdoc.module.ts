import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { SubsysdocRoutingModule } from './subsysdoc-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    SubsysdocRoutingModule
  ],
})
export class SubsysdocModule { }
