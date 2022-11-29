import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { devExamineReportComponent } from './index/index.component';

const devExamineReportRoutes: Routes = [
	{ path: '', component: devExamineReportComponent },
	{ path: 'info', component: InfoComponent },
];

@NgModule({
	imports: [RouterModule.forChild(devExamineReportRoutes)],
	exports: [RouterModule]
})
export class DevExamineReportRoutingModule { }
