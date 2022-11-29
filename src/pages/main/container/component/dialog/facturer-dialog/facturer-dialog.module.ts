import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturerDialogComponent } from './facturer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { AddressPipeModule } from '../../../component/addressPipe/addressPipe.module';

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
        AddressPipeModule
    ],
    declarations: [
        FacturerDialogComponent
    ],
    exports: [
        FacturerDialogComponent
    ],
    entryComponents: [ FacturerDialogComponent ]
})

export class FacturerDialogModule {}
