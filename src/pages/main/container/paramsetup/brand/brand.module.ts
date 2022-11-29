import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { BrandRoutingModule } from './brand-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { SinglefileModule } from '../../component/fileUpload/singleFile/singleFile.module';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { FacturerDialogModule } from '../../component/dialog/facturer-dialog/facturer-dialog.module';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    SinglefileModule,
    ManyfileModule,
    CalendarModule,
    BrandRoutingModule,
    FacturerDialogModule,
    ExcelUploadModule
  ],
})
export class BrandModule { }
