import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevicemodelDialogComponent } from './devicemodel-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule
	],
	declarations: [
		DevicemodelDialogComponent
	],
	exports: [
		DevicemodelDialogComponent
	],
	entryComponents: [DevicemodelDialogComponent]
})

export class DevicemodelDialogModule { }
