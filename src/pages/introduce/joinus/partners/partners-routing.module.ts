import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnersComponent } from './partners.component';

const PartnersRoutes: Routes = [
  { path: '', component: PartnersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(PartnersRoutes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
