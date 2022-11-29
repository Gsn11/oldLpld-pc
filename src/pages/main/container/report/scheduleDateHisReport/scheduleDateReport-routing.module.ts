import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { scheduleDateReportComponent } from './scheduleDateReport.component';

const ScheduleDateReport: Routes = [
	{ path: '', component: scheduleDateReportComponent },
];

@NgModule({
	imports: [RouterModule.forChild(ScheduleDateReport)],
	exports: [RouterModule]
})
export class ScheduleDateReportRoutingModule { }
