import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { StrategyaiotRoutingModule } from './strategyaiot-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    StrategyaiotRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
  ]
})
export class Strategyaiot { }
