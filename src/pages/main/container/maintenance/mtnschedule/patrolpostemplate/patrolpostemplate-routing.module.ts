import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './details/details.component';

const PatrolpostemplateRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent },
    { path: 'add', component: DetailsComponent, data : { type: 'add' } },
    { path: 'edit', component: DetailsComponent, data : { type: 'edit' } }
];

@NgModule({
    imports: [RouterModule.forChild(PatrolpostemplateRoutes)],
    exports: [RouterModule]
})
export class PatrolpostemplateRoutingModule { }
