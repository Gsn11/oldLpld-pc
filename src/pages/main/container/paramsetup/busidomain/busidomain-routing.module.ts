import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const BusidomainRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(BusidomainRoutes)],
    exports: [RouterModule]
})
export class BusidomainRoutingModule { }
