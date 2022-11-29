import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const BuildinggroupRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(BuildinggroupRoutes)],
    exports: [RouterModule]
})
export class BuildinggroupRoutingModule { }
