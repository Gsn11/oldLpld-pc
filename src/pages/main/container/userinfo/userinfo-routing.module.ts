import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserinfoComponent } from './userinfo.component';

const UserinfoRoutes: Routes = [
    { path: '', component: UserinfoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(UserinfoRoutes)],
    exports: [RouterModule]
})
export class UserinfoRoutingModule { }
