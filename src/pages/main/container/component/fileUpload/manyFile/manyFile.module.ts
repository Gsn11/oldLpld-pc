import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManyFileComponent } from './manyFile.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ManyFileComponent,
	],
	exports: [
		CommonModule,
		ManyFileComponent,
	]
})

export class ManyfileModule { }
