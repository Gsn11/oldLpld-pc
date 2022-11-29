import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterielComponent } from './index/materiel.component';
import { AddMaterielComponent } from './add/add.component';
import { EditMaterielComponent } from './edit/edit.component';
import { RecordComponent } from './record/record.component';
import { LookMaterielComponent } from './look/look.component';

const MaterielRoutes: Routes = [
	{ path: '', component: MaterielComponent },
	{ path: 'add', component: AddMaterielComponent },
	{ path: 'edit', component: EditMaterielComponent },
	{ path: 'record', component: RecordComponent },
	{ path: 'look', component: LookMaterielComponent },
];

@NgModule({
	imports: [RouterModule.forChild(MaterielRoutes)],
	exports: [RouterModule]
})
export class MaterielRoutingModule { }
