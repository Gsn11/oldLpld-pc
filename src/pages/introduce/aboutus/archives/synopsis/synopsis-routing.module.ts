import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynopsisComponent } from './synopsis.component';

const SynopsisRoutes: Routes = [
  { path: '', component: SynopsisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SynopsisRoutes)],
  exports: [RouterModule]
})
export class SynopsisRoutingModule { }
