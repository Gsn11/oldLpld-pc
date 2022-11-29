import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyUrlComponent } from './thirdPartyUrl.component';

const RoutesCom: Routes = [
    { path: '', component: ThirdPartyUrlComponent },
];

@NgModule({
    imports: [RouterModule.forChild(RoutesCom)],
    exports: [RouterModule]
})
export class ThirdPartyUrlRoutingModule { }
