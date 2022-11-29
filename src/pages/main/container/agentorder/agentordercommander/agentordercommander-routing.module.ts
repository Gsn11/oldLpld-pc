import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ExamineComponent } from './examine/examine.component';

const HomeRoutes: Routes = [
	{ path: '', component: IndexComponent, },
	{ path: 'examine', component: ExamineComponent, },
];

@NgModule({
	imports: [RouterModule.forChild(HomeRoutes)],
	exports: [RouterModule]
})
export class AgentordercommanderRoutingModule { }
