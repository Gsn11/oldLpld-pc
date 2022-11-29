import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechargesRoutingModule } from './recharges-routing.module';
import { RechargesComponent } from './recharges.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonUseModule } from '../common/common.module';

@NgModule({
  declarations: [
    RechargesComponent,
  ],
  imports: [
    CommonModule,
    RechargesRoutingModule,
    MatButtonModule,
    CommonUseModule
  ],
})
export class RechargesModule { }
