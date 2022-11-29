import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SchedulingShiftModalComponent } from '../schedulingShiftModal/schedulingShiftModal.component';
import { MatSnackBar } from '@angular/material';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-schedulingShift',
    templateUrl: './schedulingShift.component.html',
    styleUrls: ['./schedulingShift.component.scss']
})
// tslint:disable-next-line:class-name
export class schedulingShiftComponent implements OnInit {
  @ViewChild(SchedulingShiftModalComponent, null) schedulingShiftComponent: SchedulingShiftModalComponent;
    dateCheck = '今日';
    FrequencyList: any;
    schedulingshifDetail: any;
    displayedColumns: string[] = ['Name', 'AbbrName', 'Type', 'WorkStart', 'symbol'];
    constructor(
        private snackBar: MatSnackBar,
        private service: Service,
        private router: Router
    ) {

    }
    ngOnInit() {
     this.getList();
    }
    getList() {
      const da = {
        null: ''
      };
      this.service.serviceR('workteamTime/13001', da, (res: any) => {
        if (res.ResultCode === 0) {
             this.FrequencyList = res.Result.List;
            // for (const d of res.Result.MaintenanceOrders) {
            //     Reflect.set(d, 'uCheck', false);
            // }
        }
    });
    }
    // lookDetail() {
    //     // this.router.navigate(['index/orderStaticReportDetail']);
    // }
    //   gotoInfo() {

    // }
    showdiog() {
      this.schedulingShiftComponent.show = !this.schedulingShiftComponent.show;
      this.schedulingShiftComponent.ngOnInit();
    }
    edit(e) {
      this.schedulingShiftComponent.getDtail(e);
    }
    changeState(seq: number, state: number) {
      const changeState = state === 0 ? 1 : 0;
      const data = {
        State: changeState,
        Seq: seq
      };
      this.service.serviceR('workteamTime/13004', data, (res: any) => {
        if (res.ResultCode === 0) {
          // this.getList('0,1');
          this.snackBar.open('操作成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
          });
        }
      });
    }
}
