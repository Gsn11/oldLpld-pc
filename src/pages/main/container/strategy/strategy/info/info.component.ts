import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StrategyDialogComponent } from '../../../component/dialog/strategy-dialog/strategy-dialog.component';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  crumbsList: object;
  formula: any;
  list: any;
  name: any;
  columns = ['name', 'variable', 'var', 'formula'];
  a: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.crumbsList = [
      { name: '运维策略管理', open: false, url: '' },
      { name: '策略管理', open: false, url: '' },
      { name: '查看策略', open: false, url: '' }
    ];
  }

  ngOnInit() {
    this.formula = JSON.parse(localStorage.getItem('bemInfoData')).Formula;
    this.name = JSON.parse(localStorage.getItem('bemInfoData')).Name;

    this.getPoints(JSON.parse(localStorage.getItem('bemInfoData')).Seq);
  }

  getPoints(seq) {
    this.service.serviceR('ent/strategy/17005', {SSeq: seq}, (res: any) => {
      if (res.ResultCode === 0) {
        res.Result.List.forEach(item => {
          item.Protocol = item.Metric.Protocol;
          item.DeviceNo = item.Metric.DeviceNo;
          item.DevName = item.Metric.DevName;
          item.MetricsDesc = item.Metric.MetricsDesc;
          item.Id = item.Metric.Id;
          item.var = item.Var;
          item.AlertFormula = item.Formula;
        });
        this.list = res.Result.List;
      }
    });
  }
}
