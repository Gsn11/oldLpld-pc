import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { BackupRoutingModule } from './backup-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    BackupRoutingModule
  ],
})
export class BackupModule { }
