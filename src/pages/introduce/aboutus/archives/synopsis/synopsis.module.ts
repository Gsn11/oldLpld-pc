import { NgModule } from '@angular/core';
import { SynopsisRoutingModule } from './synopsis-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { SynopsisComponent } from './synopsis.component';

@NgModule({
  declarations: [
    SynopsisComponent,
  ],
  imports: [
    SynopsisRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class SynopsisModule { }
