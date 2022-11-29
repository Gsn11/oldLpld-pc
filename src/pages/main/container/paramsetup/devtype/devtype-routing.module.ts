import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const DevtypeRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(DevtypeRoutes)],
    exports: [RouterModule]
})
export class DevtypeRoutingModule { }
