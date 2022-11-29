import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterielComponent } from './index/materiel.component';
import { EditMaterielComponent } from './edit/edit.component';

const MaterielRoutes: Routes = [
	{ path: '', component: MaterielComponent },
	{ path: 'edit', component: EditMaterielComponent }
];

@NgModule({
	imports: [RouterModule.forChild(MaterielRoutes)],
	exports: [RouterModule]
})
export class MaterielDetailRoutingModule { }
