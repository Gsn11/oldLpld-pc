import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { StockwarnRoutingModule } from './stockwarn-routing.module';
import { IndexComponent } from './index/index.component';
import { DeviceMainType } from './pipe/deviceMainType.pipe';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { TreeModule } from '../../component/tree/tree.module';
import { BrandDialogModule } from '../../component/dialog/brand-dialog/brand-dialog.module';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';


@NgModule({
  declarations: [
    IndexComponent,
    DeviceMainType,
    AddComponent,
    InfoComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ManyfileModule,
    TreeModule,
    StockwarnRoutingModule,
    BrandDialogModule,
    ExcelUploadModule
  ],
})
export class StockwarnModule { }
