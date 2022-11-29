import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkbenchComponent } from './workbench.component';

const WorkbenchRoutes: Routes = [
    { path: '', component: WorkbenchComponent },
];

@NgModule({
    imports: [RouterModule.forChild(WorkbenchRoutes)],
    exports: [RouterModule]
})
export class WorkbenchRoutingModule { }
