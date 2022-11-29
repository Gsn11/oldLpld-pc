import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeniorityComponent } from './seniority.component';

const SeniorityRoutes: Routes = [
  { path: '', component: SeniorityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SeniorityRoutes)],
  exports: [RouterModule]
})
export class SeniorityRoutingModule { }
