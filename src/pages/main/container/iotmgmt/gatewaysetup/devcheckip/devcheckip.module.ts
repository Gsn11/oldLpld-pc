import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { DevcheckipRoutingModule } from './devcheckip-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { DeviceDialogModule } from '../../../component/dialog/device-dialog/device-dialog.module';

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
    DevcheckipRoutingModule,
    DeviceDialogModule
  ]
})
export class DevcheckipModule { }
