import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const schedulestaticRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(schedulestaticRoutes)],
    exports: [RouterModule]
})
export class SchedulestaticRoutingModule { }
