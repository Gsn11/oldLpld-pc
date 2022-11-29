import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { MatTableDataSource } from '@angular/material';
import { timer } from 'rxjs';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    paginatorTotal: number;
    crumbsList: object;
    customer: any;
    list: any;
    pageIndex: number;
    pageSize: number;
    displayedColumns: string[];
    setConfim = false;
    chooseDeleteDir: string = null;
    constructor(
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar
    ) {
        this.crumbsList = [
            // { name: '运维中心', open: false },
            { name: '数据备份', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.displayedColumns = ['Dir', 'Size', 'Other'];
    }

    ngOnInit() {
        this.getList();
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    nowBackup() {
        this.service.serviceR('sysmgmt/backup', { State: 0 }, (res: any) => {
            if (res.ResultCode === 0) {
                timer(2000).subscribe(() => {
                    this.snackBar.open('备份成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-success'
                    });
                    this.getList();
                });
            }
        });
    }

    getList() {
        const data = {
            PageIndex: this.pageIndex,
            PageSize: this.pageSize
        };
        console.log(data);
        this.service.serviceR('sysmgmt/listbackup', data, (res: any) => {
            console.log(res);
            if (res.ResultCode === 0) {
                this.list = new MatTableDataSource(res.Result.List);
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    // 控制confim模态框
    showConfim(dir: string) {
        this.chooseDeleteDir = dir;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('sysmgmt/deletebackup', { Dir: this.chooseDeleteDir }, (res: any) => {
                console.log(res);
                if (res.ResultCode === 0) {
                    timer(2000).subscribe(() => {
                        this.snackBar.open('删除成功', '确认', {
                            duration: 1600,
                            verticalPosition: 'top',
                            panelClass: 'snack-bar-color-success'
                        });
                        this.getList();
                    });
                }
            });
        }
    }
}
