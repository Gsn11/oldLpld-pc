import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { BuildingRoutingModule } from './building-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { StatTranslate } from './pipe/stat.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { DetailsTranslate } from './pipe/details.pipe';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { AddressPipeModule } from '../../component/addressPipe/addressPipe.module';
import { MapModule } from '../../component/map/map.module';
import { TreeModule } from '../../component/tree/tree.module';
import { EditRegionModule } from '../../component/editRegion/editRegion.module';
import { CalendarModule } from '../../component/calendar/calendar.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    StatTranslate,
    WordTranslate,
    DetailsTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    AddressPipeModule,
    MapModule,
    TreeModule,
    EditRegionModule,
    CalendarModule,
    BuildingRoutingModule,
  ]
})
export class BuildingModule { }
