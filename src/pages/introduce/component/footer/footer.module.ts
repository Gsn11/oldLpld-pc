import { NgModule } from '@angular/core';

// import { IntroduceComponent } from './home/introduce.component';
import { FooterComponent } from './footer.component';

// import { IntroduceRoutingModule } from './introduce-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    // IntroduceRoutingModule,
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
