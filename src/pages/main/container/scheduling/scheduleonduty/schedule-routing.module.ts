import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { scheduleComponent } from './index/schedule.component';

const scheduleRoutes: Routes = [
    { path: '', component: scheduleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(scheduleRoutes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule { }
