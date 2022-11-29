import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { StaffComponent } from './staff/staff.component';
import { ChartAllComponent } from './chartAll/chartAll.component';
import { ChartTypeComponent } from './chartType/chartType.component';
import { ChartStatusComponent } from './chartStatus/chartStatus.component';
import { ChartPersonComponent } from './chartPerson/chartPerson.component';
import { OrderStaticReportComponent } from './index/orderStaticReport.component';

const OrderStaticReportRoutes: Routes = [
    { path: '', component: OrderStaticReportComponent },
    { path: 'info', component: InfoComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'chartAll', component: ChartAllComponent },
    { path: 'chartType', component: ChartTypeComponent },
    { path: 'chartStatus', component: ChartStatusComponent },
    { path: 'chartPerson', component: ChartPersonComponent },
];

@NgModule({
    imports: [RouterModule.forChild(OrderStaticReportRoutes)],
    exports: [RouterModule]
})
export class OrderStaticReportRoutingModule { }
