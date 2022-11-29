import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { SetupscheduleRoutingModule } from './setupschedule-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonUseModule,
    SetupscheduleRoutingModule
  ],
})
export class SetupscheduleModule { }
