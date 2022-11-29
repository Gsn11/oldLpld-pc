import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DeviceManyDialogComponent } from './devicemany-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

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
		DeviceManyDialogComponent
	],
	exports: [
		DeviceManyDialogComponent
	],
	entryComponents: [DeviceManyDialogComponent]
})

export class DeviceManyDialogModule { }
