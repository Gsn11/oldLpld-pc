import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    searchName: string;
    crumbsList: object;
    customer: any;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    displayedColumns: string[];
    list: object[];
    chooseDeleteSeq: number;
    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '用户权限', open: false },
            { name: '角色设置', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setConfim = false;
        this.displayedColumns = ['RoleName', 'RoleDesc', 'Other', 'id'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
    }

    ngOnInit() {
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.getList();
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    getList() {
        const data = {
            State: 0,
            NeedFrontFunc: 1,
            NeedFunc: 1,
            NeedMenu: 1
        };
        if (this.searchName) {
            Reflect.set(data, 'RoleName', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/role/2111', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res)
                const key = 'Roles';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    gotoAdd() {
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/rolemgmt/add']);
    }

    // 点击item项做active切换底色方法
    radioChange(index: number) {
        if (this.activeChoose === index) {
            this.activeChoose = 35;
            return;
        }
        this.activeChoose = index;
    }
    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/rolemgmt/info']);
    }

    gotoEdit(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/rolemgmt/edit']);
    }

    // 控制confim模态框
    showConfim(seq: number, state: number) {
        if (state === 1) {
            return;
        }
        this.chooseDeleteSeq = seq;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/role/2104', { RoleSeq: this.chooseDeleteSeq }, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.getList();
                }
            });
        }
    }
}

