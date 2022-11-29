import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { cleanwaterComponent } from './cleanwater.component';

const ScheduleDateReport: Routes = [
	{ path: '', component: cleanwaterComponent },
];

@NgModule({
	imports: [RouterModule.forChild(ScheduleDateReport)],
	exports: [RouterModule]
})
export class CleanwaterRoutingModule { }
