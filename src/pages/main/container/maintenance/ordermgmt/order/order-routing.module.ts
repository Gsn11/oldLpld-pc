import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { VideoComponent } from './video/video.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { RechargeComponent } from './recharge/recharge.component';

const OrderRoutes: Routes = [
    { path: '', component: IndexComponent, },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: EditComponent },
    { path: 'recharge', component: RechargeComponent },
    { path: 'video', component: VideoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(OrderRoutes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
