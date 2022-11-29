import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { RequestService } from '../../../../../service/request';
import { Service } from '../../../../../service/service';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import buildData from '../../../../../../environments/buildType';
import { log } from 'console';

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
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        let menu1: string;
        let menu2: string;
        if (!Isentver) {
            menu1 = '建筑设施管理';
            menu2 = '园群管理';
        } else {
            menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
            menu2 = '管理所管理';
        }
        this.crumbsList = [
            { name: menu1, open: false },
            { name: menu2, open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['BGName', 'Addr', 'BGType', 'Other', 'id'];
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
        this.service.serviceR('ent/buildgroup/5111', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'BuildGroups';
                this.list = res.Result[key];
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    downloadBuildingGroupFile() {
        const body = {
            FromCache: false,
            State: 0,
            CommonSearch: this.searchName,
            FileName: '管理所'
        };
        new DownloadFile(body, 'ent/buildgroup/5105').downloadfile();
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }

    gotoEdit(el: any) {
        if (el.BGName) {
            this.modal.type = 'edit';
            this.modal.BGName.setValue(el.BGName);
            this.modal.Addr.setValue(el.Addr);
            this.modal.stateSelectType.setValue(el.BGType.toString());
            this.modal.Seq = el.BGSeq;
            this.modal.code.setValue(el.Code);
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
            this.requestService.request('ent/buildgroup/5104', { BGSeq: this.chooseDeleteCode })
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

