import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const holidaysetupRoutes: Routes = [
    { path: '', component: IndexComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(holidaysetupRoutes)],
    exports: [RouterModule]
})
export class HolidaysetupRoutingModule { }
