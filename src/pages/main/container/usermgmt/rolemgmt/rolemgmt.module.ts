import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { RolemgmtRoutingModule } from './rolemgmt-routing.module';
import { IndexComponent } from './index/index.component';

import { DetailsComponent } from './details/details.component';
import { InfoComponent } from './info/info.component';
import { TreeModule } from '../../component/tree/tree.module';
import { Service } from '../../../../service/service';

@NgModule({
  declarations: [
    IndexComponent,
    DetailsComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    RolemgmtRoutingModule,
    TreeModule
  ],
  providers: [ Service ]
})
export class RolemgmtModule { }
