import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormationComponent } from './formation.component';

const FormationRoutes: Routes = [
  { path: '', component: FormationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(FormationRoutes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
