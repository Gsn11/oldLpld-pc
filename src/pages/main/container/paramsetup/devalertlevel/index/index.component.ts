import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

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
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    List: any;
    chooseDeleteSeq: number;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    buildData: any;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '报警级别管理', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.setConfim = false;
        this.displayedColumns = ['AlertLevelName','LevelType', 'Id', 'Other'];
        this.List = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;

        this.buildData = buildData;

        if (buildData.buildType === '东南水厂') {
            this.crumbsList = [
                { name: '参数设置', open: false },
                { name: 'ABC分类', open: false }
            ];
        }
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
        this.service.serviceR('ent/params/alertlevel/11611', data, (res: any) => {
            console.log(res)
            if (res.ResultCode === 0) {
                const key = 'DevAlertLevels';
                this.List = res.Result[key];
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }

    // 分页修改时响应方法
    change(event: any) {
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoEdit(el: any) {
        if (el.AlertLevelName) {
            this.modal.type = 'edit';
            this.modal.Seq = el.Seq;
            this.modal.typeName = el.LevelType;
            this.modal.Name.setValue(el.AlertLevelName);
        }
        this.modal.switchModalBox();
    }

    // 控制confim模态框
    showConfim(seq: number) {
        this.chooseDeleteSeq = seq;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/params/alertlevel/11604', { Seqs: this.chooseDeleteSeq }, (res: any) => {
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

