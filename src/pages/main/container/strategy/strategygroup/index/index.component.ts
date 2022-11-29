import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  crumbsList: object;
  list: any[] = [];
  columns: any[] = ['name', 'date', 'operate'];
  pageIndex: any = 1;
  pageSize: any = 10;
  total: any = 0;
  name: any;

  checkSeq = null;
  showConfirmBox = false;

  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.crumbsList = [
      { name: '智慧运维', open: false, url: '' },
      { name: '运维策略', open: false, url: '' },
    ];
  }

  ngOnInit() {
    this.getList();
  }

  search() {
    this.pageIndex = 1;
    this.getList();
  }

  getList() {
    const data = {
      Name: this.name,
      State: 0,
      PageIndex: this.pageIndex,
      PageSize: this.pageSize
    };
    this.service.serviceR('ent/strategy/group/18011', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.list =  res.Result.List;
        this.total = res.Result.Total;
      }
    });
  }

  change(e) {
     this.name = '';
     this.pageIndex = e.pageIndex + 1;
     this.pageSize = e.pageSize;
     this.getList();
  }

  goAdd() {
    this.router.navigate(['index/strategygroup/add']);
  }

  goEdit(el) {
    localStorage.setItem('bemInfoData', JSON.stringify(el));
    this.router.navigate(['index/strategygroup/edit']);
  }

  goInfo(el) {
    localStorage.setItem('bemInfoData', JSON.stringify(el));
    this.router.navigate(['index/strategygroup/info']);
  }

  del(e) {
    if (e) {
      const data = {
        Seq: this.checkSeq
      };
      this.service.serviceR('ent/strategy/group/18004', data, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-info'
          });
          this.name = '';
          this.pageIndex = 1;
          this.getList();
        }
      });
    }
    this.showConfirmBox = false;
  }
}
