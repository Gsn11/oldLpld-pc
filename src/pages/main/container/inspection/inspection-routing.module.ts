import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionComponent } from './index/inspection.component';

const InspectionRoutes: Routes = [
	{ path: '', component: InspectionComponent, },
];

@NgModule({
	imports: [RouterModule.forChild(InspectionRoutes)],
	exports: [RouterModule]
})
export class InspectionRoutingModule { }
