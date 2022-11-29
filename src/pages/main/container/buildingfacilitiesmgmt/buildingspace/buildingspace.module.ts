import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';
import { CommonUseModule } from '../../../../common/common.module';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';
import { BuildingspaceRoutingModule } from './buildingspace-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { StatTranslate } from './pipe/stat.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    StatTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ExcelUploadModule,
    BuildingspaceRoutingModule,
    QRCodeModule,
    ManyfileModule
  ]
})
export class BuildingspaceModule { }
