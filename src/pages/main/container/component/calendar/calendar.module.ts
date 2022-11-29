import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarComponent } from './calendar.component';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		MatDatepickerModule
	],
	declarations: [
		CalendarComponent
	],
	exports: [
		CalendarComponent
	]
})

export class CalendarModule { }
