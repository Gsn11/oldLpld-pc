import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { StrategyRoutingModule } from './strategy-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { StrategyDialogModule } from '../../component/dialog/strategy-dialog/strategy-dialog.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    StrategyRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatSlideToggleModule,
    StrategyDialogModule
  ]
})
export class Strategy { }
