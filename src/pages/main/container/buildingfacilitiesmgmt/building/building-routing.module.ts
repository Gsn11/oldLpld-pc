import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';

const BuildingRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: EditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(BuildingRoutes)],
    exports: [RouterModule]
})
export class BuildingRoutingModule { }
