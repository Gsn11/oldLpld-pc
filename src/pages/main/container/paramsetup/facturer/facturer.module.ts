import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { FacturerRoutingModule } from './facturer-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { ProductComponent } from './component/product/product.component';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { SinglefileModule } from '../../component/fileUpload/singleFile/singleFile.module';
import { AddressPipeModule } from '../../component/addressPipe/addressPipe.module';
import { MapModule } from '../../component/map/map.module';
import { EditRegionModule } from '../../component/editRegion/editRegion.module';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { WordTranslate } from './pipe/word.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    ProductComponent,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    SinglefileModule,
    AddressPipeModule,
    MapModule,
    EditRegionModule,
    CalendarModule,
    FacturerRoutingModule
  ]
})
export class FacturerModule { }
