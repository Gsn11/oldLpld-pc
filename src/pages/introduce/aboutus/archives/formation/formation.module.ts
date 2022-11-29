import { NgModule } from '@angular/core';
import { FormationRoutingModule } from './formation-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { FormationComponent } from './formation.component';

@NgModule({
  declarations: [
    FormationComponent,
  ],
  imports: [
    FormationRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class FormationModule { }
