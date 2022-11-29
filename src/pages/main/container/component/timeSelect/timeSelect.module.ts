import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
import { TimeSelectComponent } from './timeSelect.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	imports: [
		CommonModule,
		// MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	declarations: [
		TimeSelectComponent
	],
	exports: [
		TimeSelectComponent
	]
})

export class TimeSelectModule { }
