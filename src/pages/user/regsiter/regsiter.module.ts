import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegsiterRoutingModule } from './regsiter-routing.module';
import { RegsiterComponent } from './regsiter.component';

@NgModule({
  declarations: [
    RegsiterComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    RegsiterRoutingModule,
    ReactiveFormsModule
  ],
})
export class RegsiterModule { }
