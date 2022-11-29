import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Service } from '../../../../service/service';
import { MatSnackBar,MatDialog } from '@angular/material';

@Component({
	selector: 'app-scheduledatereport',
	templateUrl: './scheduleDateReport.component.html',
	styleUrls: ['./scheduleDateReport.component.scss']
})
// tslint:disable-next-line:class-name
export class scheduleDateReportComponent implements OnInit {
	selectDate: any = new FormControl('');
	selectDataVal: any;
	list: any;
	shiftDetails: any;
	record:any;
	amendFlag = false;
	amendInfo = '';
	tableName :string;
	amendChange:any;
	amendIndex:number;
	historyId:number;
	signOrExamine:any;
	intervalId = null;
	inputI:number;
	sourtheastHis:any;
	showEnterBox = false;
	entering = '';
	shiftType = 1;
	constructor(
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
	) {
	}

	ngOnInit() {
		const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
		this.selectDataVal =`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)}-${date.getDate()<10?('0' + date.getDate()):date.getDate()}`;
		this.yesterday();
	}


	getBeginTime(data: string) {
		this.selectDataVal = data;
		this.yesterday()
	}


	yesterday(){
		const data= {
			dates:this.selectDataVal,
			historyIndex: 0
		}
		this.list = [];
		const dataList = {
			signMorning: null,
			signMorningTime: null,
			signAfternoon: null,
			signAfternoonTime: null,
			signEvening:null,
			signEveningTime:null,
			examineAfternoon:null,
			examineEvening:null,
			examineMorning: null
		}
		this.service.serviceReport('get','getDnscTableHistory', data, (res: any) => {
			if (res.code === '2000') {
				this.list = res.data.history;
				this.historyId = res.data.historyId;
				this.shiftDetails = res.data.shiftDetails;
				this.record = res.data.record;
				this.sourtheastHis = res.data.sourtheastHis;
				this.signOrExamine = res.data.signOrExamine == null ? dataList : res.data.signOrExamine;
			}
		});
	}

	enteringSave(){
		let name = '';
		name = JSON.parse(localStorage.getItem('bemUserInfo')).Name;
			if(this.entering!=''){
				const dataList = {
					shiftType:this.shiftType,
					name: name,
					content: this.entering
				}
				this.service.serviceReport('post','addSoutheastHis', dataList, (res: any) => {
						this.yesterday();
						this.showEnterBox = false;
						this.entering = '';
				});
			}else{
				this.snackBar.open('请输入录入描述', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			}
	}


	blurChange(index,e,name){
		this.amendFlag = true;
		this.amendChange = e;
		this.tableName = name;
		this.amendIndex = index;
    console.log(index)
	}
	blurChangeOver(i){
		this.inputI = i;
	}
	blurChangeLeave(){
		this.inputI = 99;
	}
	amendButton(type){
		let name = '';
		name = JSON.parse(localStorage.getItem('bemUserInfo')).Name;
    if(type == 2){
			this.amendInfo = '';
		}else{
			const data= {
				updateField:this.tableName,
				updateFrontData: this.amendChange == null ? 0 : this.amendChange.value,
				updateAfterData: this.amendInfo,
				updateName: name,
				historyId : this.historyId,
				tableName: this.amendChange.tableName,
				dateIndex: this.amendIndex
			}
			this.service.serviceReport('post','addSourthEastHistoryRecord', data, (res: any) => {
				this.yesterday();
			});
		}
		this.amendFlag = false;
	}

	signButton(time,type){
		let name = '';
		name = JSON.parse(localStorage.getItem('bemUserInfo')).Name;
		const data= {
			smCode: 0,
			signMorning: '',
			signAfternoon: '',
			signEvening: '',
			examineMorning: '',
			examineAfternoon: '',
			examineEvening: ''
		}
    if(time == '早' && type == '1'){
			data.signMorning = name;
		}else if (time == '中' && type == '1'){
			data.signAfternoon = name;
		}else if(time == '晚' && type == '1'){
			data.signEvening = name;
		}else if(time == '早' && type == '2'){
			data.examineMorning = name;
		}else if(time == '中' && type == '2'){
			data.examineAfternoon = name;
		}else if(time == '晚' && type == '2'){
			data.examineEvening = name;
		}
		this.service.serviceReport('post','addSignOrExamine ', data, (res: any) => {
			this.yesterday();
		});
	}
}
