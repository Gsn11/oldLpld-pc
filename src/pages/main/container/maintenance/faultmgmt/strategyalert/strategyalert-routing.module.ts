import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DistributeComponent } from './distribute/distribute.component';

const DiagassitRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent, },
    { path: 'distribute', component: DistributeComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(DiagassitRoutes)],
    exports: [RouterModule]
})
export class StrategyalertRoutingModule { }
