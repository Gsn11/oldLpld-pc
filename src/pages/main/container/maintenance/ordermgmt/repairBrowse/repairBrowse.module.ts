import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairBrowseComponent } from './repairBrowse.component';
import { CommonUseModule } from '../../../../../common/common.module';
import { RepairBrowseRoutingModule } from './repairBrowse-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    RepairBrowseComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    RepairBrowseRoutingModule,
    MatInputModule,
    MatDatepickerModule,
  ]
})
export class RepairBrowseModule { }
