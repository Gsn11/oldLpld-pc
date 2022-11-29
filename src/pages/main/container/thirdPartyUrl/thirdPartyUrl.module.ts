import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdPartyUrlComponent } from './thirdPartyUrl.component';
import { ThirdPartyUrlRoutingModule } from './thirdPartyUrl-routing.module';


@NgModule({
  declarations: [
    ThirdPartyUrlComponent
  ],
  imports: [
    CommonModule,
    ThirdPartyUrlRoutingModule
  ]
})
export class ThirdPartyUrlModule { }
