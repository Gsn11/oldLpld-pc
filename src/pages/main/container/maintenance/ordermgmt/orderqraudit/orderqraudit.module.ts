import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { OrderqrauditRoutingModule } from './orderqraudit-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CalendarModule } from '../../../component/calendar/calendar.module';
import { ItemsModule } from '../../component/items/items.module';
import { PriceModule } from '../../component/price/price.module';
import { OrderPipeModule } from '../../component/pipe/orderPipe.module';
import { UserDialogModule } from '../../../component/dialog/user-dialog/user-dialog.module';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CommonUseModule,
    OrderqrauditRoutingModule,
    CalendarModule,
    ItemsModule,
    PriceModule,
    MatCardModule,
    MatSlideToggleModule,
    UserDialogModule,
    OrderPipeModule
  ],
})
export class OrderqrauditModule { }
