import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { StrategyalertRoutingModule } from './strategyalert-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DistributeComponent } from './distribute/distribute.component';
import { MatSortModule } from '@angular/material';
import { UserManyDialogModule } from '../../../component/dialog/userMany-dialog/userMany-dialog.module';
import { UserDialogModule } from '../../../component/dialog/user-dialog/user-dialog.module';
import { ManyfileModule } from '../../../component/fileUpload/manyFile/manyFile.module';


@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    DistributeComponent
  ],
  imports: [
    UserManyDialogModule,
    UserDialogModule,
    ManyfileModule,
    CommonModule,
    CommonUseModule,
    StrategyalertRoutingModule,
    MatSortModule,
  ],
})
export class Strategyalert { }
