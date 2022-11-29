import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
const DevmodRoutes: Routes = [
    { path: '', component: IndexComponent, },
];
@NgModule({
    imports: [RouterModule.forChild(DevmodRoutes)],
    exports: [RouterModule]
})
export class DevmodRoutingModule { }
