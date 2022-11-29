import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const BuildusageRoutes: Routes = [
    { path: '', component: IndexComponent, }
];

@NgModule({
    imports: [RouterModule.forChild(BuildusageRoutes)],
    exports: [RouterModule]
})
export class BuildusageRoutingModule { }
