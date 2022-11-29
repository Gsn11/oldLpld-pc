import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SchedulingShiftModalComponent } from './schedulingShiftModal.component';
import { CalendarModule } from '../../../component/calendar/calendar.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
    imports : [
        CalendarModule,
        CommonModule,
        CommonUseModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        NzIconModule
    ],
    declarations: [
        SchedulingShiftModalComponent,
    ],
    exports: [
        CommonModule,
        CommonUseModule,
        SchedulingShiftModalComponent,
    ]
})

export class SchedulingShiftModalModule {}
