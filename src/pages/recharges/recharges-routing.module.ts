import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargesComponent } from './recharges.component';

const RechargesRoutes: Routes = [
    { path: '', component: RechargesComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(RechargesRoutes)],
    exports: [RouterModule]
})
export class RechargesRoutingModule { }
