import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { PatrolpostemplateRoutingModule } from './patrolpostemplate-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './details/details.component';
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from './component/modal/modal.component';
import { FeedbacktypeTranslate } from './feedbacktype.pipe';
import { BuildingSpaceDialogModule } from '../../../component/dialog/buildspace-dialog/buildspace-dialog.module';
import { BuildingDialogModule } from '../../../component/dialog/building-dialog/building-dialog.module';
@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    DetailsComponent,
    ModalComponent,
    FeedbacktypeTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    PatrolpostemplateRoutingModule,
    MatCardModule,
    BuildingSpaceDialogModule,
    BuildingDialogModule
  ],
  exports: [ FeedbacktypeTranslate ],
})
export class PatrolpostemplateModule { }
