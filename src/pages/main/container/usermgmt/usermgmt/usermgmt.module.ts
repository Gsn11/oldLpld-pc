import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsermgmtRoutingModule } from './usermgmt-routing.module';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './details/details.component';
import { StateTranslate } from './state.pipe';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { TreeCheckItemModule } from '../../component/treeCheckItem/treeCheckItem.module';
import { JobComponent } from './component/job/job.component';
import { ServicezoomComponent } from './component/servicezoom/servicezoom.component';
import { UserDialogModule } from '../../component/dialog/user-dialog/user-dialog.module';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [
    IndexComponent,
    InfoComponent,
    DetailsComponent,
    StateTranslate,
    JobComponent,
    ServicezoomComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    MatSlideToggleModule,
    UsermgmtRoutingModule,
    TreeCheckItemModule,
    ManyfileModule,
    ExcelUploadModule,
    UserDialogModule,
    NzButtonModule
  ]
})
export class UsermgmtModule { }
