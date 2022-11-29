import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatentComponent } from './patent.component';

const PatentRoutes: Routes = [
  { path: '', component: PatentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(PatentRoutes)],
  exports: [RouterModule]
})
export class PatentRoutingModule { }
