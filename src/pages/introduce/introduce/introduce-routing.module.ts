import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroduceComponent } from './introduce.component';

const IntroduceRoutes: Routes = [
  { path: '', component: IntroduceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(IntroduceRoutes)],
  exports: [RouterModule]
})
export class IntroduceRoutingModule { }
