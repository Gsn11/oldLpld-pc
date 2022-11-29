import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FaultModalComponent } from './faultModal.component';
import { StateTypeTranslate } from './statetype.pipe';

@NgModule({
    imports : [
        CommonModule,
        CommonUseModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    declarations: [
        FaultModalComponent,
        StateTypeTranslate
    ],
    exports: [
        CommonModule,
        CommonUseModule,
        FaultModalComponent,
    ]
})

export class FaultModalModule {}
