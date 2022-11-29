import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';

const MsgmgmtRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(MsgmgmtRoutes)],
    exports: [RouterModule]
})
export class MsgmgmtRoutingModule { }
