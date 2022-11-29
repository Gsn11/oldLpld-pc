import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { SchedulestaticRoutingModule } from './schedulestatic-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import {ElModule} from 'element-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    IndexComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    SchedulestaticRoutingModule,
    ElModule.forRoot(),
    NzButtonModule,
    NzSelectModule,
    NzIconModule
  ],
})
export class SchedulestaticModule { }
