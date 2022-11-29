import { NgModule } from '@angular/core';

// import { IntroduceComponent } from './home/introduce.component';
import { FloatModule } from '../float/float.module';
import { NavComponent } from './nav.component';

// import { IntroduceRoutingModule } from './introduce-routing.module';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    FloatModule
    // IntroduceRoutingModule,
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule { }
