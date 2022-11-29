import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    total: any;
    list: any;
    crumbsList: object;
    searchVal: any;
    pageIndex: any = 1;
    pageSize: any = 10;
    columns = ['number', 'name', 'time', 'operate'];

    showConfirmBox = false;
    checkSeq = null;

    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar
    ) {
        this.crumbsList = [
          { name: '运维策略管理', open: false, url: '' },
          { name: '策略管理', open: false, url: '' },
          { name: '编辑策略', open: false, url: '' }
        ];
    }

    ngOnInit() {
        this.getList();
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    getList() {
        this.service.serviceR('ent/strategy/17011', {State: 0, Name: this.searchVal, PageSize: this.pageSize, PageIndex: this.pageIndex}, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = new MatTableDataSource(res.Result.List);
                this.total = res.Result.Total;
            }
        });
    }

    // 进入详情
    goInfo(el) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/strategy/info']);
    }

    // 进入编辑
    goEdit(el) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/strategy/edit']);
    }

    // 添加
    add() {
        this.router.navigate(['index/strategy/add']);
    }

    // 搜索
    search() {
        this.pageIndex = 1;
        this.getList();
    }

    del(e) {
        if (e) {
          const data = {
            Seq: this.checkSeq
          };
          this.service.serviceR('ent/strategy/17004', data, (res: any) => {
            if (res.ResultCode === 0) {
              this.snackBar.open('删除成功', '确认', {
                  duration: 1600,
                  verticalPosition: 'top',
                  panelClass: 'snack-bar-color-info'
              });
              this.searchVal = '';
              this.pageIndex = 1;
              this.getList();
            }
          });
        }
        this.showConfirmBox = false;
    }
}
