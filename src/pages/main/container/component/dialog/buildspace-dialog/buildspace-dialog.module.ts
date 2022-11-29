import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BuildspaceDialogComponent } from './buildspace-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { WordTranslate } from './word.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    declarations: [
        BuildspaceDialogComponent,
        WordTranslate
    ],
    exports: [
        BuildspaceDialogComponent
    ],
    entryComponents: [ BuildspaceDialogComponent ]
})

export class BuildingSpaceDialogModule {}
