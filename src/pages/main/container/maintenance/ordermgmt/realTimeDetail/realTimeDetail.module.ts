import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealTimeDetailComponent } from './realTimeDetail.component';
import { CommonUseModule } from '../../../../../common/common.module';
import { RealTimeDetailRoutingModule } from './realTimeDetail-routing.module';


@NgModule({
  declarations: [
    RealTimeDetailComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    RealTimeDetailRoutingModule
  ]
})
export class RealTimeDetailModule { }
