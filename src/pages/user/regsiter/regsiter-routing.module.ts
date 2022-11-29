import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegsiterComponent } from './regsiter.component';

const RegsiterRoutes: Routes = [
  { path: '', component: RegsiterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(RegsiterRoutes)],
  exports: [RouterModule]
})
export class RegsiterRoutingModule { }
