import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyrightComponent } from './copyright.component';

const CopyrightRoutes: Routes = [
  { path: '', component: CopyrightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CopyrightRoutes)],
  exports: [RouterModule]
})
export class CopyrightRoutingModule { }
