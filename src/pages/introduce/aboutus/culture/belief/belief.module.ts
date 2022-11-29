import { NgModule } from '@angular/core';
import { BeliefRoutingModule } from './belief-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { BeliefComponent } from './belief.component';

@NgModule({
  declarations: [
    BeliefComponent,
  ],
  imports: [
    BeliefRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class BeliefModule { }
