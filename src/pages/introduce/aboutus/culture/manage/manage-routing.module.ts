import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';

const ManageRoutes: Routes = [
  { path: '', component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ManageRoutes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
