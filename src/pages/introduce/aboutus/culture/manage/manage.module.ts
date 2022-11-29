import { NgModule } from '@angular/core';
import { ManageRoutingModule } from './manage-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { ManageComponent } from './manage.component';

@NgModule({
  declarations: [
    ManageComponent,
  ],
  imports: [
    ManageRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class ManageModule { }
