import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing.module';
import { NavModule } from '../../component/nav/nav.module';
import { WallModule } from '../../component/wall/wall.module';
import { FooterModule } from '../../component/footer/footer.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    ContactRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class ContactModule { }
