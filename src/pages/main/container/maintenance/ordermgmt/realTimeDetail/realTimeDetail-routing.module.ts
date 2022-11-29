import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealTimeDetailComponent } from './realTimeDetail.component';

const RoutesCom: Routes = [
    { path: '', component: RealTimeDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(RoutesCom)],
    exports: [RouterModule]
})
export class RealTimeDetailRoutingModule { }
