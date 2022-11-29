import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { DetailsComponent } from './details/details.component';

const UsermgmtRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: DetailsComponent, data: { type: 'add' } },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: DetailsComponent, data: { type: 'edit' } }
];

@NgModule({
    imports: [RouterModule.forChild(UsermgmtRoutes)],
    exports: [RouterModule]
})
export class UsermgmtRoutingModule { }
