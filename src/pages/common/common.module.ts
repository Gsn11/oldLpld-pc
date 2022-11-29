import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetarialModule } from './material.module';
import { CurmbsComponent } from './crumbs/crumbs.component';
import { ConfimComponent } from './confim/confim.component';
import { SendComponent } from './send/send.component';

const exportsModules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	CurmbsComponent,
	ConfimComponent,
	SendComponent,
	MetarialModule
];

@NgModule({
	imports: [CommonModule, MetarialModule],
	declarations: [
		CurmbsComponent,
		ConfimComponent,
		SendComponent
	],
	exports: [exportsModules]
})

export class CommonUseModule { }
