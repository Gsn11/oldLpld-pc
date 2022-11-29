import { Component, ViewChild, OnInit , Inject, } from '@angular/core';
import { MatPaginator, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';
import { RequestService } from '../../../../../service/request';
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    uData: any;
    userListData = [];
    searchName: string;
    crumbsList: object;
    setConfim: boolean;
    yearTime: string;
    pageSizeOptions: number[];
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    displayedColumns: string[];
    List: any;
    chooseDeleteSeq: number;
    @ViewChild(ModalComponent, null) modal: ModalComponent;
    constructor(
        private requestService: RequestService,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.crumbsList = [
            { name: '排班管理', open: false },
            { name: '法定假期设置', open: false }
        ];
        this.setConfim = false;
        this.displayedColumns = [ 'time','described','user', 'Other'];
        this.List = null;
        this.yearTime = `${new Date().getFullYear()}`;
        this.pageSizeOptions = [5, 10, 20];
        this.searchName = null;
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            Year: this.yearTime,
            CommonSearch: this.searchName
        };
        this.service.serviceR('holiday/17001', data, (res: any) => {
            console.log(res)
            if (res.ResultCode === 0) {
                this.List = res.Result.List;
            }
        });
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.BeginTime = '';
        this.modal.EndTime = '';
        this.modal.Name.setValue('');
        this.modal.saveUserData = {ids: '', names: ''};
        this.modal.userList = [];
        this.modal.switchModalBox();
    }

    userList(el) {
        this.userListData  = [];
		const data = {
            PageIndex: 1,
            PageSize:9999
        };
		this.requestService.request('ent/cususer/4611', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
                        for(let i of el){
                            for(let j of res.Result.Users){
                                if(i.Seq === j.Seq){
                                    this.userListData.push(j)
                                }
                            }
                        }
                        this.modal.userList  = this.userListData;
						// console.log(this.userListData)
					}
				},
				(error) => {
					// console.error(error);
				}
			);
	}

    gotoEdit(el: any) {
        console.log(el)
        this.userList(el.UserList);
        this.modal.type = 'edit';
        this.modal.Seq = el.Holiday;
        this.modal.BeginTime = el.Date;
        this.modal.Name.setValue(el.Desc);
        // this.modal.userList = el.UserList;
        this.modal.dateSeq = el.TeamTimeSeq;
        this.modal.dateChange = el.DateType;
        this.modal.saveUserData = {ids: '', names: ''};
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
            this.service.serviceR('holiday/17004', { Holiday: this.chooseDeleteSeq }, (res: any) => {
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

