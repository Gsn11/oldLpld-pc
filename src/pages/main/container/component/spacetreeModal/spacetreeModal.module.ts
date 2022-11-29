import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SpacetreeModalComponent } from './spacetreeModal.component';
import { MatCardModule } from '@angular/material/card';

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
        MatCardModule
    ],
    declarations: [
        SpacetreeModalComponent,
    ],
    exports: [
        CommonModule,
        CommonUseModule,
        SpacetreeModalComponent,
    ]
})

export class SpacetreeModule {}
