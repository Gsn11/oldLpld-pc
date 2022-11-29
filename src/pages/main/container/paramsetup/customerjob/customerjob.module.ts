import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { DevmodRoutingModule } from './customerjob-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { WordTranslate } from './pipe/word.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    DevmodRoutingModule
  ],
})
export class CustomerjobModule { }
