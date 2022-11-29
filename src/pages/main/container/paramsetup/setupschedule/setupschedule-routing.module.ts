import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const SetupscheduleRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(SetupscheduleRoutes)],
    exports: [RouterModule]
})
export class SetupscheduleRoutingModule { }
