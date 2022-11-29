import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulingDialogComponent } from './scheduling-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { WordTranslate } from './word.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    declarations: [
        SchedulingDialogComponent,
        WordTranslate
    ],
    exports: [
        SchedulingDialogComponent
    ],
    entryComponents: [ SchedulingDialogComponent ]
})

export class SchedulingDialogModule {}
