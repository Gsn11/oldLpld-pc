import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
import { ModalComponent } from '../component/modal/modal.component';

declare let laydate;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss']
})
// tslint:disable-next-line:class-name
export class scheduleComponent implements OnInit {
	data: any;
	ocrelist: any;
	data1: any;
	state: any;
	foods: any;
	Jstate: any;
	dateArray: any;
	daysOfMonth: any;
	datao: any;
	selectTime: any;
	Blist: any;
	seeIndex: any;
	JseeIndex: any;
	KseeIndex: any;
	editIndex: any;
	JeditIndex: any;
	KeditIndex: any;
	TeamsList: any;
	TeamValue = [];
	@ViewChild(ModalComponent, null) modal: ModalComponent;
	constructor(
		private snackBar: MatSnackBar,
		private service: Service,
		private router: Router
	) {

	}
	// 根据某年某月计算出具体日期
	getDaysInMonth(year, month) {
		const daysOfMonth = [];
		month = parseInt(month, 10);
		if (month < 10) {
			month = '0' + month;
		}
		const lastDayOfMonth = new Date(year, month, 0).getDate();
		for (let i = 1; i <= lastDayOfMonth; i++) {
			const weeks = { date: '', week: '', dateStr: '', isSaturday: '', list: [] };
			if (i < 10) {
				weeks.date = '0' + i;
				weeks.week = this.getWeek(year + '-' + month + '-' + '0' + i);
				weeks.dateStr = year + '-' + month + '-' + '0' + i;
			} else {
				weeks.date = '' + i;
				weeks.week = this.getWeek(year + '-' + month + '-' + i);
				weeks.dateStr = year + '-' + month + '-' + i;
			}
			daysOfMonth.push(weeks);
		}
		return daysOfMonth;
	}
	geiTeam() {
		const da = {
			null: ''
		};
		this.service.serviceR('ent/params/team/10101', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.TeamsList = res.Result.Teams;
			}
		});
	}
	getWeek(dateString) {
		this.dateArray = dateString.split('-');
		// tslint:disable-next-line:radix
		const date = new Date(this.dateArray[0], (this.dateArray[1] - 1), this.dateArray[2]);
		return '周' + '日一二三四五六'.charAt(date.getDay());
	}
	getNowFormatDate() {
		const date = new Date();
		const seperator1 = '-';
		const year = date.getFullYear();
		const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		const strDate = date.getDate();
		const currentdate = year + '-' + month;
		return currentdate;
	}
	gettime(time) {
		console.log(time);
		setTimeout(() => {
			laydate.render({
				elem: '#SelectDate',
				type: 'month',
				value: time,
				done: (value) => {
					console.log(value);
					this.selectTime = value;
				}
			});
		});
	}
	seach() {
		console.log(this.selectTime);
		if (this.selectTime === undefined) {
			this.selectTime = this.getNowFormatDate();
		} else {
			const arr = this.selectTime.split('-');
			this.data = this.getDaysInMonth(arr[0], arr[1]);
		}
		this.getList(this.selectTime);
	}
	ngOnInit() {
		const now = this.getNowFormatDate();
		this.selectTime = now;
		console.log(now);
		const d = new Date();
		const nowYear = d.getFullYear();
		const nowMonth = d.getMonth() + 1;
		console.log(nowYear, nowMonth);
		this.gettime(now);
		const list = this.getDaysInMonth(nowYear, nowMonth);
		const listr = this.getDaysInMonth(nowYear, nowMonth);
		this.geiTeam();
		console.log(list);
		this.data = list;
		this.datao = listr;
		this.getList(now);
		this.getBList();
	}
	getBList() {
		const da = {
			State: 0
		};
		this.service.serviceR('workteamTime/13001', da, (res: any) => {
			// console.log(res);
			if (res.ResultCode === 0) {
				this.Blist = res.Result.List;
				// for (const d of res.Result.MaintenanceOrders) {
				//     Reflect.set(d, 'uCheck', false);
				// }
			}
		});
	}
	getList(time) {
		const arrtime = time.split('-');
		// console.log(, );
		const da = {
			Date: time

		};
		if (this.TeamValue) {
			Reflect.set(da, 'TeamSeq', this.TeamValue.toString());
		}
		this.service.serviceR('workteamDuty/16001', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.ocrelist = res.Result.List;
				// for (const i of res.Result.List) {
				res.Result.List.forEach(i => {
					this.datao = this.getDaysInMonth(arrtime[0], arrtime[1]);
					i.SchedulesList.some((item, index, arr) => { // item为数组中的元素，index为下标，arr为目标数组
						// const startime = item.timeStart.split(':');
						// const start = startime[0] + ':' + startime[1];
						// const endtime = item.timeEnd.split(':');
						// const end = endtime[0] + ':' + endtime[1];
						// Reflect.set(arr[index], 'timeEnd', end);
						// Reflect.set(arr[index], 'timeStart', start);
						this.datao.some((items, indexs, arrs) => { // item为数组中的元素，index为下标，arr为目标数组
							if (arr[index].dateStr === arrs[indexs].dateStr) {
								arrs[indexs].list.push(arr[index]);
								const c = { ...arr[index], ...arrs[indexs] };
								arrs[indexs] = c;
							}
						});
					});
					Reflect.set(i, 'SchedulesList', this.datao);
					// }
					// console.log(this.ocrelist);
				});
			}
		});
	}
	lookDetail() {
		// this.router.navigate(['index/orderStaticReportDetail']);
	}
	// tslint:disable-next-line:align
	edit(e, s, k) {
		console.log(e, s, k);
		const da = {
			Key: s.key,
			TimeStart: e.WorkStart,
			TimeEnd: e.WorkEnd,
			WorkTimeSeq: e.Seq,
			WorkTimeName: e.Name,
			WorkTimeAbbrName: e.AbbrName,
			WorkTimeType: e.Type,
			WorkTimeColor: e.Color
		};
		console.log(da);
		this.service.serviceR('workteamSchedule/15003', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				const now = this.getNowFormatDate();

				this.getList(now);
				this.snackBar.open('修改成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
			}
			this.state = '';
		});
	}
	selectWeek(id: any, j: any, k: any) {
		console.log(id);
		this.editIndex = id;
		this.JeditIndex = j;
		this.KeditIndex = k;
		// this.modal.switchModalBox();
	}
	show(id: any, j: any, k: any) {
		this.seeIndex = id;
		this.JseeIndex = j;
		this.KseeIndex = k;
	}
	enshow() {
		this.seeIndex = '';
		this.JseeIndex = '';
	}
	downloadDeviceFile() {
		const body = {
			Date: this.selectTime,
			FileName: '值班表'
		};
		if (this.TeamValue) {
			Reflect.set(body, 'TeamSeq', this.TeamValue.toString());
		}
		new DownloadFile(body, 'workteamDuty/export').downloadfile();
	}
}
