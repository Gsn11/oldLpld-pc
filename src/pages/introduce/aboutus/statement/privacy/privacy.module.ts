import { NgModule } from '@angular/core';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { PrivacyComponent } from './privacy.component';

@NgModule({
  declarations: [
    PrivacyComponent,
  ],
  imports: [
    PrivacyRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class PrivacyModule { }
