import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const SubjectionRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(SubjectionRoutes)],
    exports: [RouterModule]
})
export class SubjectionRoutingModule { }
