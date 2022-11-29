import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const SubsysdocRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(SubsysdocRoutes)],
    exports: [RouterModule]
})
export class SubsysdocRoutingModule { }
