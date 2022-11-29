import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { CusmenuRoutingModule } from './cusmenu-routing.module';
import { IndexComponent } from './index/index.component';
import { TreeModule } from '../../component/tree/tree.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    TreeModule,
    CusmenuRoutingModule
  ],
})
export class CusmenuModule { }
