import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { AddComponent } from './add/add.component';

const DiagalertRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DiagalertRoutes)],
    exports: [RouterModule]
})
export class DiagalertRoutingModule { }
