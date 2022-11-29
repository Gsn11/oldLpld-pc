import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterielComponent } from './index/materiel.component';

const MaterielRoutes: Routes = [
	{ path: '', component: MaterielComponent }
];

@NgModule({
	imports: [RouterModule.forChild(MaterielRoutes)],
	exports: [RouterModule]
})
export class MaterielDetailRoutingModule { }
