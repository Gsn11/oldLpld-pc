import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { secpumpComponent } from './secpump.component';

const secpump: Routes = [
	{ path: '', component: secpumpComponent },
];

@NgModule({
	imports: [RouterModule.forChild(secpump)],
	exports: [RouterModule]
})
export class SecpumpRoutingModule { }
