import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { CusofferitemRoutingModule } from './cusofferitem-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { TypeTranslate } from './pipe/type.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { DeviceDialogModule } from '../../component/dialog/device-dialog/device-dialog.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    TypeTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    CusofferitemRoutingModule,
    MatDialogModule,
    MatRadioModule,
    DeviceDialogModule,
  ],
  exports: [
    TypeTranslate
  ]
})
export class CusofferitemModule { }
