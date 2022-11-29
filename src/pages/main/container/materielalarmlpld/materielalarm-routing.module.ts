import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterielalarmComponent } from './materielalarm.component';

const MaterielRoutes: Routes = [
	{ path: '', component: MaterielalarmComponent }
];

@NgModule({
	imports: [RouterModule.forChild(MaterielRoutes)],
	exports: [RouterModule]
})
export class MaterielRoutingModule { }
