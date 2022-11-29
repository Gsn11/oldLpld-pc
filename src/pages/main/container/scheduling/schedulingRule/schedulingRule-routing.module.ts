import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { schedulingRuleComponent } from './index/schedulingRule.component';

const schedulingRuleRoutes: Routes = [
    { path: '', component: schedulingRuleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(schedulingRuleRoutes)],
    exports: [RouterModule]
})
export class SchedulingRuleRoutingModule { }
