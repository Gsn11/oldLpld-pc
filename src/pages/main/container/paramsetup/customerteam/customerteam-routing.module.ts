import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const CustomerteamRoutes: Routes = [
    { path: '', component: IndexComponent, }
];

@NgModule({
    imports: [RouterModule.forChild(CustomerteamRoutes)],
    exports: [RouterModule]
})
export class CustomerteamRoutingModule { }
