import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ExcelUploadComponent } from './excelUpload.component';

@NgModule({
	imports: [
		CommonModule,
		CommonUseModule,
		FormsModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatSelectModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule
	],
	declarations: [
		ExcelUploadComponent,
	],
	exports: [
		CommonModule,
		CommonUseModule,
		ExcelUploadComponent,
	]
})

export class ExcelUploadModule { }
