import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HomeComponent } from './index/home.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    NgxEchartsModule,
    CommonModule,
  ],
})
export class HomeModule { }
