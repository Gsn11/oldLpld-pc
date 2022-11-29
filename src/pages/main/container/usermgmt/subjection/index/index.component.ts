import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { RequestService } from '../../../../../service/request';
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
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    list: any;
    setConfim: boolean;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    chooseDeleteCode: string;
    constructor(
        private requestService: RequestService,
        private snackBar: MatSnackBar,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '用户管理', open: false },
            { name: '归属区域管理', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['SubjectionId', 'Addr', 'Other', 'id'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.setConfim = false;
        this.chooseDeleteCode = '';
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            State: 0
        };
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/subjection/3811', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'Subjections';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }

    gotoEdit(el: any) {
        if (el.SubjectionId) {
            this.modal.type = 'edit';
            this.modal.SubjectionId.setValue(el.SubjectionId);
            this.modal.Addr = el.Addr;
            this.modal.Seq = el.Seq;
        }
        this.modal.switchModalBox();
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

    // 控制confim模态框
    showConfim(seq: string, state: number) {
        this.chooseDeleteCode = seq;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.requestService.request('ent/subjection/3804', { Seq: this.chooseDeleteCode })
                .subscribe(
                    (res) => {
                        this.snackBar.open('删除成功', '确认', {
                            duration: 1600,
                            verticalPosition: 'top',
                            panelClass: 'snack-bar-color-info'
                        });
                        this.getList();
                    }
                );
        }
    }
}

