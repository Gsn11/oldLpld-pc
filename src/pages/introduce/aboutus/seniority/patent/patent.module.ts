import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from '../../../../common/utils/MatPaginatorIntlCro';
import { PatentRoutingModule } from './patent-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { PatentComponent } from './patent.component';

@NgModule({
  declarations: [
    PatentComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    PatentRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
  providers: [
      { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
  ],
})
export class PatentModule { }
