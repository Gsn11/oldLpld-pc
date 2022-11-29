import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const BackupRoutes: Routes = [
    { path: '', component: IndexComponent, }
];

@NgModule({
    imports: [RouterModule.forChild(BackupRoutes)],
    exports: [RouterModule]
})
export class BackupRoutingModule { }
