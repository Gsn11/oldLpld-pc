import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';

const HomeRoutes: Routes = [
	{ path: '', component: IndexComponent, },
	{ path: 'add', component: AddComponent, },
];

@NgModule({
	imports: [RouterModule.forChild(HomeRoutes)],
	exports: [RouterModule]
})
export class AgentordernewRoutingModule { }
