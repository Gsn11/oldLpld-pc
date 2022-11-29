import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SchedulingRuleModalComponent } from './schedulingRuleModal.component';
import { CalendarModule } from '../../../component/calendar/calendar.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
        NzButtonModule,
        NzSelectModule,
        NzIconModule
    ],
    declarations: [
        SchedulingRuleModalComponent,
    ],
    exports: [
        CommonModule,
        CommonUseModule,
        SchedulingRuleModalComponent,
    ]
})

export class SchedulingRuleModalModule {}
