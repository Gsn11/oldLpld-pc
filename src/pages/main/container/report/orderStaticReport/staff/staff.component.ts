import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material';

declare let laydate;


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
// tslint:disable-next-line:class-name
export class StaffComponent implements OnInit {
  dateCheck = '今日';
  displayedColumns: any;
  selected = '选择人员';
  custerList: any;
  dataCheckList: any;
  selectedType: any;
  name: any;
  date: any;
  TeamSeq: any;
  timeType: any;
  partime: any;
  TeamName: any;
  constructor(
    private snackBar: MatSnackBar,
    private activateInfo: ActivatedRoute,
    private service: Service,
    private router: Router
  ) {
    activateInfo.queryParams.subscribe(queryParams => {
      this.TeamSeq = queryParams.TeamSeq;
      this.TeamName = queryParams.TeamName;

    });
    this.displayedColumns = ['Date', 'OverTimeTotal', 'ExceptionTotal', 'UncheckTotal', 'HandleTotal', 'UnVerifyTotal', 'FinishTotal', 'InspectTotal', 'MaintainTotal', 'RepairTotal', 'Total', 'FinishPer', 'InTimePer', 'Score'];

  }
  ngOnInit() {
    this.lardate( 'month' );
    this.selectedType = '1';
    this.timeType = '日期';
    const day2 = new Date();
    day2.setTime(day2.getTime());
    // tslint:disable-next-line:max-line-length
    const s2 = day2.getFullYear() + '-' + ((day2.getMonth() + 1 ) < 10 ? '0' + (day2.getMonth() + 1 ) : (day2.getMonth() + 1 ));
    this.date = s2;
    this.getcuster();
  }
  setDetail() {
  console.log(this.selectedType);
  const day2 = new Date();
  day2.setTime(day2.getTime());
  if ( this.selectedType === '1') {
    this.date = day2.getFullYear() + '-' + ((day2.getMonth() + 1 ) < 10 ? '0' + (day2.getMonth() + 1 ) : (day2.getMonth() + 1 ));
    this.lardate('month');
  } else if (this.selectedType === '2') {
    this.date = day2.getFullYear();
    this.lardate('year');
  }
  }
  lardate(typedate) {
    console.log(typedate);
    setTimeout(() => {
      this.partime = laydate.render({
        elem: '#test1',
        type: 'month',
        done: (value) => {
          this.date = value;
        }
      });
      this.partime = laydate.render({
        elem: '#test2',
        type: 'year',
        done: (value) => {
          this.date = value;
        }
      });
    });
  }
  getcuster() {
    const da = {
      TeamSeq: this.TeamSeq,
      Type: 1
    };
    console.log(da);
    this.service.serviceR('ent/cususer/team/4101', da , (res: any) => {
        console.log(res);
        if (res.ResultCode === 0) {
          this.custerList = res.Result.Users;
          this.getList(res.Result.Users[0].Seq, 1 , this.date);
          this.name = res.Result.Users[0].Name;
        }
      });
}
getList(s2, typed , date) {
  this.selected = s2;
  const da = {
    Date: date,
    type: typed,
    Useq: s2
  };
  console.log(da);
  this.service.serviceR('ent/order/report', da , (res: any) => {
      console.log(res);
      if (res.ResultCode === 0) {
        if (res.Result === 'Date is wrong') {
        this.snackBar.open('修改成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      }
        this.dataCheckList = res.Result.List;
      }
    });
}
downloadDeviceFile() {
  const body = {
    Date: this.date,
    type: 1,
    Useq: this.selected,
    Title: this.date + this.name + '维保任务情况统计表'
  };
  new DownloadFile(body, 'ent/order/report/export').downloadfile();
}
getBeginTime(event) {
  this.date = event;
  }
search() {
  console.log(this.selected);
  for (const i of this.custerList) {
     console.log(i.Seq.toString(), this.selected);
     if (i.Seq.toString() === this.selected) {
         this.name = i.Name;
     }
  }
  console.log(this.name);
  if (this.selectedType === '1') {
    this.timeType = '日期';

  } else if (this.selectedType === '2') {
    this.timeType = '月份';
  }
  this.getList(this.selected, this.selectedType , this.date);
}
  lookDetail() {
    // this.router.navigate(['index/orderStaticReportDetail']);
  }
  gotoInfo() {
    console.log('你好');
    this.router.navigate(['index/orderStaticReport/info/'], { queryParams: { TeamSeq: this.TeamSeq, TeamName: this.TeamName } });
  }
}
