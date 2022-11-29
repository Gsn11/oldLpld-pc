import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeliefComponent } from './belief.component';

const BeliefRoutes: Routes = [
  { path: '', component: BeliefComponent },
];

@NgModule({
  imports: [RouterModule.forChild(BeliefRoutes)],
  exports: [RouterModule]
})
export class BeliefRoutingModule { }
