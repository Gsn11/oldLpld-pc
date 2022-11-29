import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairBrowseComponent } from './repairBrowse.component';

const WorkbenchRoutes: Routes = [
    { path: '', component: RepairBrowseComponent },
];

@NgModule({
    imports: [RouterModule.forChild(WorkbenchRoutes)],
    exports: [RouterModule]
})
export class RepairBrowseRoutingModule { }
