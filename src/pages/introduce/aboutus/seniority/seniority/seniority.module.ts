import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from '../../../../common/utils/MatPaginatorIntlCro';
import { SeniorityRoutingModule } from './seniority-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { SeniorityComponent } from './seniority.component';

@NgModule({
  declarations: [
    SeniorityComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    SeniorityRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
  providers: [
      { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
  ],
})
export class SeniorityModule { }
