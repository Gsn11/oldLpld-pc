import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';

const OrderRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent, },
    { path: 'edit', component: EditComponent, },
    { path: 'info', component: InfoComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(OrderRoutes)],
    exports: [RouterModule]
})
export class StrategygroupRoutingModule { }
