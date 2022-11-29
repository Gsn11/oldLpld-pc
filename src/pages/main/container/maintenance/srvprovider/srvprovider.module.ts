import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { SrvproviderRoutingModule } from './srvprovider-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { AddressPipeModule } from '../../component/addressPipe/addressPipe.module';
import { TreeCheckItemModule } from '../../component/treeCheckItem/treeCheckItem.module';

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
    SrvproviderRoutingModule,
    TreeCheckItemModule,
    AddressPipeModule
  ],
})
export class SrvproviderModule { }
