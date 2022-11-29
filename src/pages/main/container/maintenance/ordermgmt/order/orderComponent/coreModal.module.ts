import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CoreModalComponent } from './coreModal.component';
import { ManyfileModule } from '../../../../component/fileUpload/manyFile/manyFile.module';


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
        ManyfileModule
    ],
    declarations: [
        CoreModalComponent,
    ],
    exports: [
        CommonModule,
        CommonUseModule,
        CoreModalComponent,
    ]
})

export class CoreModalModalModule {}
