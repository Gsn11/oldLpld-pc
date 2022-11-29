import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { devServabilityReportComponent } from './index/index.component';

const DevServabilityReportRoutes: Routes = [
	{ path: '', component: devServabilityReportComponent },
	{ path: 'info', component: InfoComponent },
];

@NgModule({
	imports: [RouterModule.forChild(DevServabilityReportRoutes)],
	exports: [RouterModule]
})
export class DevServabilityReportRoutingModule { }
