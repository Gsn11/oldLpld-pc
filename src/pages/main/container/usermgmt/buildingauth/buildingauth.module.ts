import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { BuildingauthRoutingModule } from './buildingauth-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { ChangeModalComponent } from './component/changeModal/changeModal.component';
import { ModalComponent } from './component/modal/modal.component';
import { StateTranslate } from './pipe/state.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { AddressPipeModule } from '../../component/addressPipe/addressPipe.module';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    ChangeModalComponent,
    ModalComponent,
    StateTranslate,
    WordTranslate
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    AddressPipeModule,
    BuildingauthRoutingModule,
  ]
})
export class BuildingauthModule { }
