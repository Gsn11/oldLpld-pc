import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { BuildinggroupRoutingModule } from './buildinggroup-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { BuildingGroupTranslate } from './pipe/buildingGroupType.pipe';
import { WordTranslate } from './pipe/word.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
    BuildingGroupTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    BuildinggroupRoutingModule,
  ]
})
export class BuildinggroupModule { }
