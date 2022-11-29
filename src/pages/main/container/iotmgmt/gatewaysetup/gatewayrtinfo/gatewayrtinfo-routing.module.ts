import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';

const GatewayrtinfoRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(GatewayrtinfoRoutes)],
    exports: [RouterModule]
})
export class GatewayrtinfoRoutingModule { }
