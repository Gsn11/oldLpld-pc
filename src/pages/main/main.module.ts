import { NgModule } from '@angular/core';
import { CommonUseModule } from '../common/common.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { Sidebar2Component } from './component/siderbar2/sidebar2.component';
import { ToolsComponent } from './component/tools/tools.component';
import { FooterComponent } from './component/footer/footer.component';
import { Service } from '../service/service';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    Sidebar2Component,
    ToolsComponent,
    FooterComponent,
  ],
  imports: [
    CommonUseModule,
    MainRoutingModule
  ],
  providers: [ Service ],
  bootstrap: [MainComponent]
})
export class MainModule { }
