import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { DevmetricRoutingModule } from './devmetric-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { ExcelUploadModule } from '../../../component/excelUpload/excelUpload.module';
import { ProcotolTranslate } from './pipe/procotol.pipe';
import { RegisterTranslate } from './pipe/register.pipe';
import { BigEndianTranslate } from './pipe/bigEndian.pipe';
import { ProtocolVerTranslate } from './pipe/protocolVer.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DeviceDialogModule } from '../../../component/dialog/device-dialog/device-dialog.module';

@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    EditComponent,
    ProcotolTranslate,
    RegisterTranslate,
    BigEndianTranslate,
    ProtocolVerTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    DevmetricRoutingModule,
    ExcelUploadModule,
    MatDialogModule,
    DeviceDialogModule,
  ],
})
export class DevmetricModule { }
