import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { WordTranslate } from './word.pipe';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatButtonModule,
        NzSelectModule
    ],
    declarations: [
        UserDialogComponent,
        WordTranslate
    ],
    exports: [
        UserDialogComponent
    ],
    entryComponents: [ UserDialogComponent ]
})

export class UserDialogModule {}
