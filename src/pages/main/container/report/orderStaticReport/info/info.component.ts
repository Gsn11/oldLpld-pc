import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import { MatPaginator } from '@angular/material';

declare let laydate;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
// tslint:disable-next-line:class-name
export class InfoComponent implements OnInit {
  dateCheck = '今日';
  dataCheckList: object[];
  displayedColumns: any;
  date: any;
  selected: any;
  TeamSeq: any;
  timetype: any;
  TeamName: any;
  partime: any;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  constructor(
    private activateInfo: ActivatedRoute,
    private service: Service,
    private router: Router
  ) {
    　activateInfo.queryParams.subscribe(queryParams => {
      this.TeamSeq = queryParams.TeamSeq;
      this.TeamName = queryParams.TeamName;
      this.displayedColumns = ['Date', 'OverTimeTotal', 'ExceptionTotal', 'UncheckTotal', 'HandleTotal', 'UnVerifyTotal', 'FinishTotal', 'InspectTotal', 'MaintainTotal', 'RepairTotal', 'Total', 'FinishPer', 'InTimePer', 'Score'];

    });
  }
  ngOnInit() {
    this.timetype = '日期';
    this.selected = '1';
    const day2 = new Date();
    day2.setTime(day2.getTime());
    const s2 = day2.getFullYear() + '-' + ((day2.getMonth() + 1 ) < 10 ? '0' + (day2.getMonth() + 1 ) : (day2.getMonth() + 1 ));
    console.log(s2);
    this.date = s2;
    this.getList(s2, 1);
    this.lardate( 'month' );

  }
  getList(s2, type) {
    const da = {
      Date: s2,
      Type: type,
      TeamSeq: this.TeamSeq
    };

    this.service.serviceR('ent/order/report', da , (res: any) => {
        console.log(res);
        if (res.ResultCode === 0) {
         this.dataCheckList = res.Result.List;
        }
      });
}
  lookDetail() {
    // this.router.navigate(['index/orderStaticReportDetail']);
  }
  setDetail() {
    console.log(this.selected);
    const day2 = new Date();
    day2.setTime(day2.getTime());
    if ( this.selected === '1') {
      this.date = day2.getFullYear() + '-' + ((day2.getMonth() + 1 ) < 10 ? '0' + (day2.getMonth() + 1 ) : (day2.getMonth() + 1 ));
      this.lardate('month');
    } else if (this.selected === '2') {
      this.date = day2.getFullYear();
      console.log(this.date);
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
  getBeginTime(event) {
  this.date = event;
  }
  gotostaff() {
    this.router.navigate(['index/orderStaticReport/staff/'], { queryParams: { TeamSeq: this.TeamSeq, TeamName: this.TeamName } });
  }
  downloadDeviceFile() {
    const body = {
      Date: this.date,
      Type: this.selected,
      TeamSeq: this.TeamSeq,
      Title: this.date + this.TeamName + '派单统计表'
    };
    new DownloadFile(body, 'ent/order/report/export').downloadfile();
}
  seach() {
    if ( this.selected === '1' ) {
      this.timetype = '日期';
    } else {
      this.timetype = '月份';
    }
    this.getList(this.date, this.selected);
  }
}
