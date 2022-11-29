import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectStrategyDialogComponent } from './select-strategy-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    declarations: [
        SelectStrategyDialogComponent
    ],
    exports: [
        SelectStrategyDialogComponent
    ],
    entryComponents: [ SelectStrategyDialogComponent ]
})

export class SelectStrategyDialogModule {}
