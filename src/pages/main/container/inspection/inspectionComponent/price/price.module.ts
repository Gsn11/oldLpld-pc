import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PriceComponent } from './price.component';
import { FeedbacktypeTranslate } from './pipe/feedbacktype.pipe';
import { DeviceDialogModule } from '../../../component/dialog/device-dialog/device-dialog.module';

@NgModule({
    imports : [
        CommonModule,
        CommonUseModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        DeviceDialogModule
    ],
    declarations: [
        PriceComponent,
        FeedbacktypeTranslate
    ],
    exports: [
        PriceComponent,
        FeedbacktypeTranslate
    ]
})

export class PriceModule {}
