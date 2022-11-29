import { NgModule } from '@angular/core';
import { InspectionRoutingModule } from './inspection-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { InspectionComponent } from './index/inspection.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManyfileModule } from '../component/fileUpload/manyFile/manyFile.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonUseModule } from '../../../common/common.module';
import { CalendarModule } from '../component/calendar/calendar.module';
import { ItemsModule } from './inspectionComponent/items/items.module';
import { PriceModule } from './inspectionComponent/price/price.module';
import {MatSliderModule} from '@angular/material/slider';
import { InspectionModalModule } from '../component/inspectionModal/inspectionModal.module';
import { FaultModalModule } from '../component/faultModal/faultModal.module';
import { SpacetreeModule } from '../component/spacetreeModal/spacetreeModal.module';
import { WordTranslate } from './pipe/word.pipe';
import { UserDialogModule } from '../component/dialog/user-dialog/user-dialog.module';

@NgModule({
  declarations: [
    InspectionComponent,
    WordTranslate
  ],
  imports: [
    InspectionRoutingModule,
    NgxEchartsModule,
    CommonModule,
    FormsModule,
    ManyfileModule,
    MatSlideToggleModule,
    CommonUseModule,
    CalendarModule,
    ItemsModule,
    PriceModule,
    MatSliderModule,
    InspectionModalModule,
    FaultModalModule,
    SpacetreeModule,
    UserDialogModule
  ],
})

export class InspectionModule { }
