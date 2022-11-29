import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { schedulingShiftComponent } from './index/schedulingShift.component';

const SchedulingShiftRoutes: Routes = [
    { path: '', component: schedulingShiftComponent },
];

@NgModule({
    imports: [RouterModule.forChild(SchedulingShiftRoutes)],
    exports: [RouterModule]
})
export class SchedulingShiftRoutingModule { }
