import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { operationsReportComponent } from './index/operationsReport.component';

const OperationsReportRoutes: Routes = [
    { path: '', component: operationsReportComponent },
    { path: 'info', component: InfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(OperationsReportRoutes)],
    exports: [RouterModule]
})
export class OperationsReportRoutingModule { }
