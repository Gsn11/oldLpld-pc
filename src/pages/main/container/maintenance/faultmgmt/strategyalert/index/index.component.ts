import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    list: any;
    crumbsList: object;
    searchVal: any;
    pageIndex: any = 1;
    pageSize: any = 10;
    columns = ['timer', 'position', 'name', 'strategy', 'state', 'operate'];

    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '故障管理', open: false },
            { name: '策略故障', open: false },
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
        this.service.serviceR('ent/strategy/17011', {Name: this.searchVal, PageSize: this.pageSize, PageIndex: this.pageIndex}, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res);
                this.list = new MatTableDataSource(res.Result.List);
            }
        });
    }

    // 进入相亲
    goInfo(el) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/strategyalert/info']);
    }

    // 派单
    distribute(el) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        this.router.navigate(['index/strategyalert/distribute']);
    }

    // 搜索
    search() {
        this.pageIndex = 1;
        this.getList();
    }
}
