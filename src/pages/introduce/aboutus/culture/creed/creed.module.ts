import { NgModule } from '@angular/core';
import { CreedRoutingModule } from './creed-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { CreedComponent } from './creed.component';

@NgModule({
  declarations: [
    CreedComponent,
  ],
  imports: [
    CreedRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class CreedModule { }
