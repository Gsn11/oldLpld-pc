import { NgModule } from '@angular/core';
import { CopyrightRoutingModule } from './copyright-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { CopyrightComponent } from './copyright.component';

@NgModule({
  declarations: [
    CopyrightComponent,
  ],
  imports: [
    CopyrightRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class CopyrightModule { }
