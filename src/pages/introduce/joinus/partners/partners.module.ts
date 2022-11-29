import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnersRoutingModule } from './partners-routing.module';
import { NavModule } from '../../component/nav/nav.module';
import { FooterModule } from '../../component/footer/footer.module';
import { PartnersComponent } from './partners.component';

@NgModule({
  declarations: [
    PartnersComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    ReactiveFormsModule,
    PartnersRoutingModule,
    NavModule,
    FooterModule,
  ],
})
export class PartnersModule { }
