import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduceRoutingModule } from './introduce-routing.module';
import { NavModule } from '../component/nav/nav.module';
// import { FloatModule } from '../component/float/float.module';
import { FooterModule } from '../component/footer/footer.module';
import { IntroduceComponent } from './introduce.component';

@NgModule({
  declarations: [
    IntroduceComponent,
  ],
  imports: [
    CommonModule,
    IntroduceRoutingModule,
    NavModule,
    // FloatModule,
    FooterModule,
  ],
})
export class IntroduceModule { }
