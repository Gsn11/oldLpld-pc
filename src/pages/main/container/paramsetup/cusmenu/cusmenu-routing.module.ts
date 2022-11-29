import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const CusmenuRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(CusmenuRoutes)],
    exports: [RouterModule]
})
export class CusmenuRoutingModule { }
