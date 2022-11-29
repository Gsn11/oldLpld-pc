import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { AgreementRoutingModule } from './agreement-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { AgreementTypeTranslate } from './pipe/type.pipe';
import { DeviceDialogModule } from '../../component/dialog/device-dialog/device-dialog.module';
import { QuillModule } from 'ngx-quill';
import { TranslateHtmlPipe } from './pipe/html.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    InfoComponent,
    EditComponent,
    AgreementTypeTranslate,
    TranslateHtmlPipe
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    AgreementRoutingModule,
    DeviceDialogModule,
    QuillModule.forRoot()
  ],
})
export class AgreementModule { }
