import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const devalertlevelRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(devalertlevelRoutes)],
    exports: [RouterModule]
})
export class DevalertlevelRoutingModule { }
