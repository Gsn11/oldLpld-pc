import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { InfoComponent } from './info/info.component';

const RolemgmtRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: DetailsComponent, data : { type: 'add' } },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: DetailsComponent, data : { type: 'edit' } }
];

@NgModule({
    imports: [RouterModule.forChild(RolemgmtRoutes)],
    exports: [RouterModule]
})
export class RolemgmtRoutingModule { }
