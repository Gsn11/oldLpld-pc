import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { reportFormulaComponent } from './reportFormula.component';

const ScheduleDateReport: Routes = [
	{ path: '', component: reportFormulaComponent },
];

@NgModule({
	imports: [RouterModule.forChild(ScheduleDateReport)],
	exports: [RouterModule]
})
export class ReportFormulaRoutingModule { }
