import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { BuildusageRoutingModule } from './buildusage-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { TreeModule } from '../../component/tree/tree.module';
import { WordTranslate } from './pipe/word.pipe';
import { ModelWordTranslate } from './pipe/modelword.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
    WordTranslate,
    ModelWordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    TreeModule,
    BuildusageRoutingModule
  ],
})
export class BuildusageModule { }
