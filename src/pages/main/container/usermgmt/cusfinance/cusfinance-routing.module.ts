import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { RechargeComponent } from './recharge/recharge.component';

const CusfinanceRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent, },
    { path: 'recharge', component: RechargeComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(CusfinanceRoutes)],
    exports: [RouterModule]
})
export class CusfinanceRoutingModule { }
