import { Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TimeCompare } from '../../../../common/utils/js/timeCompare';
import { Service } from '../../../../service/service';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-faultmodal',
  templateUrl: './faultModal.component.html',
  styleUrls: ['./faultModal.component.scss']
})
export class FaultModalComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  @Input() data: any;
  AlertList: any;
  faultshow: boolean;
  searchName: string;
  crumbsList: object;
  customer: any;
  displayedColumns: string[];
  setData: object;
  initialCompanyList: any;
  @ViewChild(MatSort, null) sort: MatSort;
  pageEvent: PageEvent;
  SystemList: any;
  SystemSelect = new FormControl();
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private service: Service
  ) {
    this.faultshow = false;
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '故障管理', open: false },
      { name: '报警诊断', open: false },
    ];
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.setData = {
      CommonSearch: '',
      CSeq: this.customer,
      AlertType: '0,1'
    };
    this.initialCompanyList = null;
    this.displayedColumns = ['timeStr', 'building', 'devName', 'metricDesc', 'levelName', 'time', 'orderState', 'Other'];
    this.searchName = '';
  }

  ngOnInit() {
    console.log('nihao');
    const data = {
      State: 0,
    };
    this.service.serviceR('ent/params/subsys/monitor/10911', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res);
        this.SystemList = res.Result.SubSystems;
      }
    });
  }
  getList(Seq) {
    console.log(Seq);
    const data = {
      Type: '4',
      State: '0,1',
      MSSeq: Seq
    };
    console.log(data);
    this.service.serviceR('ent/maintenance/8311', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res);
        const DeList  = res.Result.MaintenanceSchedules[0].Items;
        const arr = [];
        if (DeList.length > 0) {
          for (const i of DeList) {
            if (i.alarm) {
                arr.push(i);
            }
          }
          this.AlertList = arr;
          console.log(this.AlertList);
        }
      }
    });
  }
  getTime(time: number) {
    return new TimeCompare(time).compare();
}
gotoAdd(el: any) {
  localStorage.setItem('bemInfoData', JSON.stringify(el));
  this.router.navigate(['index/diagassit/add']);
}
gotoInfo(el: any) {
  el.orderState = -2;
  console.log(el);
  const param = {
    DevAlertInfo: el,
  };
  this.service.serviceR('ent/diagalert/9105', param, (res: any) => {
    if (res.ResultCode === 0) {
      console.log(res);
      // this.AlertList = el;
      // if (res.Result.AlertList.length > 0) {
      //   this.AlertList = res.Result.AlertList;
      // }
    }
  });
  // this.router.navigate(['index/diagassit/info']);
}
applyFilter() {
  this.initialCompanyList.filter = this.searchName.trim();
  if (this.initialCompanyList.paginator) {
      this.initialCompanyList.paginator.firstPage();
  }
}

}
