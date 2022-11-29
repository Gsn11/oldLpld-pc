import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './history/history.component';
import { HistoryInfoComponent } from './history/historyInfo/historyInfo.component';
import { HistoryStateComponent } from './history/historyState/historyState.component';
import { PartsComponent } from './parts/parts.component';

const DevRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'add', component: AddComponent },
    { path: 'info', component: InfoComponent },
    { path: 'edit', component: EditComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'historyinfo', component: HistoryInfoComponent },
    { path: 'historystate', component: HistoryStateComponent },
    { path: 'parts', component: PartsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(DevRoutes)],
    exports: [RouterModule]
})
export class DevRoutingModule { }
