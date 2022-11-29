import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';

const StockwarnRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: EditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(StockwarnRoutes)],
    exports: [RouterModule]
})
export class StockwarnRoutingModule { }
