import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';

const DevmetricRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: EditComponent, data : { type: 'add' } },
    { path: 'info', component: InfoComponent},
    { path: 'edit', component: EditComponent, data : { type: 'edit' } }
];

@NgModule({
    imports: [RouterModule.forChild(DevmetricRoutes)],
    exports: [RouterModule]
})
export class DevmetricRoutingModule { }
