import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';

const AlarmdevmgmtRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'info', component: InfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(AlarmdevmgmtRoutes)],
    exports: [RouterModule]
})
export class AlarmdevmgmtRoutingModule { }
