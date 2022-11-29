import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreedComponent } from './creed.component';

const CreedRoutes: Routes = [
  { path: '', component: CreedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CreedRoutes)],
  exports: [RouterModule]
})
export class CreedRoutingModule { }
