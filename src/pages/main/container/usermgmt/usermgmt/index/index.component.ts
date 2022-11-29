import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
import { ExcelUploadComponent } from '../../../component/excelUpload/excelUpload.component';
import buildData from '../../../../../../environments/buildType';
import { RequestService } from '../../../../../service/request';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    providers: [ Service ]
})

export class IndexComponent implements OnInit {
    buildData: any;
    searchName: string;
    crumbsList: object;
    customer: any;
    Teams: any = null;
	SelectTeams = new FormControl('');
    confimType: string;
    confimTitle: string;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
    displayedColumns: string[];
    list: object[];
    chooseDeleteSeq: number;
    changePwdUseUSeq: number;
    changePwdUsePhone: string;
    enableUSeq: number;
    enableState: number;
    constructor(
        private requestService: RequestService,
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '用户权限', open: false },
            { name: '用户设置', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.confimTitle = null;
        this.setConfim = false;
        this.displayedColumns = ['LoginId', 'Name', 'UserTel', 'IsEngineer', 'IsAdmin', 'State', 'Other', 'id'];
        this.list = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
        this.buildData = buildData;
    }

    ngOnInit() {
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.getList();
        this.getTeamList();
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    fileBoxChange() {
        // console.log(1111111);
        console.log(this.excelUpload);
        this.excelUpload.fileBoxChange();
    }

    downLoadTemplate() {
        window.open('../../../../../assets/excel/人员导入模版.xlsx');
    }

    getList() {
        const data = {
            State: 0,
        };    
        Reflect.set(data, 'CommonSearch', this.searchName);
        Reflect.set(data, 'Team', this.SelectTeams.value);
        Reflect.set(data, 'PageIndex', this.pageIndex);
        Reflect.set(data, 'PageSize', this.pageSize);
        this.service.serviceR('ent/cususer/4111', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res)
                this.list = res.Result.Users;
                this.paginatorTotal = res.Result.Total;
            }
        });
    }

    getTeamList() {
		const data = {
			State: 0
		};
		this.requestService.request('ent/params/team/10101', data)
        .subscribe(
            (res: any) => {
                if (res.ResultCode === 0) {
                    this.Teams = res.Result.Teams;
                }
            },
            (error) => {
                // console.error(error);
            }
        );
	}

    gotoAdd() {
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/usermgmt/add']);
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
        this.router.navigate(['index/usermgmt/info']);
    }

    gotoEdit(el: any) {
        console.log(el);
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/usermgmt/edit']);
    }

    changeState(seq: number, state: number) {
        const changeState = state === 0 ? 1 : 0;
        const data = {
            Customer: this.customer,
            State: changeState,
            USeq: seq
        };
        this.service.serviceR('ent/cususer/4103', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.getList();
                this.snackBar.open('操作成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            }
        });
    }

    // 控制confim模态框
    showConfim(...data: any) {
        this.confimType = data[0];
        if (this.confimType === 'del') {
            this.confimTitle = null;
            this.chooseDeleteSeq = data[1];
            this.confimTitle = `确定删除 ${data[2]} 吗`;
        } else if (this.confimType === 'change') {
            this.changePwdUseUSeq = data[1];
            this.confimTitle = `确定重置 ${data[2]} 的密码吗？`;
            this.changePwdUsePhone = data[3];
        }
        this.setConfim = !this.setConfim;
    }
    downloadDeviceFile() {
        const body = {
            CommonSearch: this.searchName ? this.searchName : '',
            FileName: '用户设置'
        };
        new DownloadFile(body, 'ent/cususer/4101/export').downloadfile();
    }
    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            if (this.confimType === 'del') {
                this.service.serviceR('ent/cususer/4104', { USeq: this.chooseDeleteSeq }, (res: any) => {
                    if (res.ResultCode === 0) {
                        this.getList();
                        this.snackBar.open('操作成功', '确认', {
                            duration: 1600,
                            verticalPosition: 'top',
                            panelClass: 'snack-bar-color-success'
                        });
                    }
                });
            } else if (this.confimType === 'change') {
                const changeData = {
                    Mobile: this.changePwdUsePhone,
                    USeq: this.changePwdUseUSeq,
                    Type: 1
                };
                this.service.serviceR('user/passwordreset', changeData, (res: any) => {
                    if (res.ResultCode === 0) {
                        this.getList();
                        this.snackBar.open('操作成功，请注意查收短信！', '确认', {
                            duration: 1600,
                            verticalPosition: 'top',
                            panelClass: 'snack-bar-color-success'
                        });
                    }
                });
            }
        }
    }
}

