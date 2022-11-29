import { NgModule } from '@angular/core';
import { MaintainerRoutingModule } from './maintainer-routing.module';
import { NavModule } from '../../component/nav/nav.module';
import { FooterModule } from '../../component/footer/footer.module';
import { MaintainerComponent } from './maintainer.component';

@NgModule({
  declarations: [
    MaintainerComponent,
  ],
  imports: [
    MaintainerRoutingModule,
    NavModule,
    FooterModule,
  ],
})
export class MaintainerModule { }
