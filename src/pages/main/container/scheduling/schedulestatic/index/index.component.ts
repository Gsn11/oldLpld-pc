import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';
import { FormControl } from '@angular/forms';
import { RequestService } from '../../../../../service/request';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
declare let laydate;
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    searchName: string;
    crumbsList: object;
    typeSelect: string = '1';
    customer: any;
    dutyList: any;
    orderList: any;
    monthTime:string;
	SelectTeams = [];
    Teams: any = null;
    SelectJobs = new FormControl('');
    Jobs: any = null;
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
            { name: '排值班汇总统计', open: false }
        ];
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.displayedColumns = ['AlertLevelName', 'workHour','workDay','leaveDay', 'Other','OtherTwo'];
        this.List = null;
        this.searchName = null;
    }

    ngOnInit() {
        const now = this.getNowFormatDate();
		this.monthTime = now;
		this.gettime(now);
        this.getList();
        this.getTeamList();
        this.getJobList();
    }
    getNowFormatDate() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		const currentdate = year + '-' + month;
		return currentdate;
	}
    gettime(time) {
		setTimeout(() => {
			laydate.render({
				elem: '#SelectDate',
				type: 'month',
				value: time,
				done: (value) => {
					this.monthTime = value;
				}
			});
		});
	}
    changeSelect(e:string){
        if(e=='1'){
            this.displayedColumns = ['AlertLevelName', 'workHour','workDay','leaveDay', 'Other','OtherTwo'];
            this.List = this.orderList
        }else{
            this.displayedColumns = ['AlertLevelName', 'workHour','workDay', 'Other'];
            this.List = this.dutyList
        }
        this.typeSelect = e;
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
				}
			);
	}

    getJobList() {
		const data = {
			State: 0
		};
		this.requestService.request('ent/params/job/10701', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.Jobs = res.Result.Jobs;
					}
				},
				(error) => {
				}
			);
	}

    getList() {
        const data = {
            Month: this.monthTime,
            Team: this.SelectTeams.toString(),
            Job: this.SelectJobs.value == 0 ? '' : this.SelectJobs.value,
            Name : this.searchName
        };
        console.log(data)
        this.service.serviceR('workschedulestatis/18001', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.orderList = res.Result.List;
                this.List = res.Result.List
            }
        });
        this.service.serviceR('workschedulestatis/18002', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.dutyList = res.Result.List;
            }
        });
    }

    gotoAdd() {
        this.modal.type = 'add';
        this.modal.switchModalBox();
    }

    duty(el: any) {
        if(this.typeSelect == '1'){
            this.modal.type = 'duty';
        }else{
            this.modal.type = 'leaveEs';
        }
        this.modal.list = el;
        this.modal.switchModalBox();
    }
    leave(el: any) {
        this.modal.type = 'leave';
        this.modal.list = el;
        this.modal.switchModalBox();
    }
    downloadDeviceFile() {
		const body = {
			Month: this.monthTime,
			FileName: '排值班表'
		};
        console.log(body)
		new DownloadFile(body, 'workschedulestatis/export').downloadfile();
	}
}

