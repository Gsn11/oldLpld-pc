import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Service } from '../../../../service/service';
import { MatSnackBar,MatDialog } from '@angular/material';

@Component({
	selector: 'app-secpump',
	templateUrl: './secpump.component.html',
	styleUrls: ['./secpump.component.scss']
})
// tslint:disable-next-line:class-name
export class secpumpComponent implements OnInit {
	selectDate: any = new FormControl('');
	selectDataVal: any;
	intervalId = null;
	list: any;
	record:any;
	amendFlag = false;
	amendInfo = '';
	historyId:number;
	signOrExamine:any;
	tableName :string;
	amendChange:any;
	amendIndex:number;
	keep = '';
	pumpTwoNotes: any;
	keepFlag = false;
	slot = 1;
	pumpTwoNotesId = '';
	inputI:number;
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
				updateFrontData: this.amendChange.value,
				updateAfterData: this.amendInfo,
				updateName: name,
				historyId : this.historyId,
				tableName: this.amendChange.tableName,
				dateIndex: this.amendIndex
			}
			this.service.serviceReport('post','addPumpTwoHistoryRecord', data, (res: any) => {
				this.yesterday();
			});
		}
		this.amendFlag = false;
	}

	keepSave(){
		let name = '';
		name = JSON.parse(localStorage.getItem('bemUserInfo')).Name;
		if(this.slot ===1){
			if(this.keep!=''){
				const dataList = {
					name: name,
					content: this.keep
				}
				this.service.serviceReport('post','addPumpTwoNote', dataList, (res: any) => {
						this.yesterday();
						this.keepFlag = false;
				});
			}else{
				this.snackBar.open('请输入记事描述', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			}
		}else{
			const dataList = {
				id: this.pumpTwoNotesId,
				name: name,
				content: this.keep
			}
			this.service.serviceReport('post','updatePumpTwoNote', dataList, (res: any) => {
					this.yesterday();
					this.keepFlag = false;
			});
		}
	}

	yesterday(){
		const data= {
			dates:this.selectDataVal,
			historyIndex: 4
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
				this.record = res.data.record;
				this.pumpTwoNotes= res.data.pumpTwoNotes;
				this.signOrExamine = res.data.signOrExamine == null ? dataList : res.data.signOrExamine;
			}
		});
	}

	signButton(time,type){
		let name = '';
		name = JSON.parse(localStorage.getItem('bemUserInfo')).Name;
		const data= {
			smCode: 4,
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
