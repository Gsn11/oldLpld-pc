import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintainerComponent } from './maintainer.component';

const MaintainerRoutes: Routes = [
  { path: '', component: MaintainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MaintainerRoutes)],
  exports: [RouterModule]
})
export class MaintainerRoutingModule { }
