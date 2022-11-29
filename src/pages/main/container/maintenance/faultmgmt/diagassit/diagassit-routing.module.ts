import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { InfoComponent } from './info/info.component';
import { AddComponent } from './add/add.component';
import { AddAlarmComponent } from './addAlarm/add.component';
import { InfoAlarmComponent } from './infoAlarm/info.component';

const DiagassitRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
    { path: 'addAlarm', component: AddAlarmComponent },
    { path: 'infoAlarm', component: InfoAlarmComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DiagassitRoutes)],
    exports: [RouterModule]
})
export class DiagassitRoutingModule { }
