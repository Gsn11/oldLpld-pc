import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';

const DiagdevrtRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DiagdevrtRoutes)],
    exports: [RouterModule]
})
export class DiagdevrtRoutingModule { }
