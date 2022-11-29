import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
// import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { UserDialogComponent } from '../../../component/dialog/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Service } from '../../../../../service/service';
import { SynopsisRoutingModule } from 'src/pages/introduce/aboutus/archives/synopsis/synopsis-routing.module';



declare let laydate;
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-schedulingRulemodal',
	templateUrl: './schedulingRuleModal.component.html',
	styleUrls: ['./schedulingRuleModal.component.scss']
})
export class SchedulingRuleModalComponent implements OnInit {
	// @Output() getList = new EventEmitter<any>();
	// @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
	@Input() data: any;
	@Output() someEvent = new EventEmitter<string>();
	show: any;
	copySelect: string;
	colors: any;
	FrequencyList: any;
	ImgList: any;
	BeginTime: string; // 开始日期
	EndTime: string; // 结束日期
	SelectBeginMM: any;
	SelectBeginHH: any;
	SelectendMM: any;
	SelectendHH: any;
	Builds: any;
	HH: number[];
	MM: number[];
	foots: any;
	select: any;
	SelectServiceType: any;
	ApplyType: any;
	Sms:any;
	SmsPrehours :number;
	SmsName: string;
	SmsContent: string;
	BuildingSeq: number = null;
	ChooseServiceName: string = null;
	ServiceSeq: number = null;
	ChooseWorkerName: string = null;
	WorkerSeq: number = null;
	Members: any = [];
	daylist: any = [];
	chs: any;
	weeks: any;
	ValidStart: any;
	ValidEnd: any;
	Name: any;
	title: any;
	id: any;
	Days: number;
	dateSeq = [];
	constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private service: Service,

	) {
		this.show = false;
		this.HH = [];
		this.MM = [];
		this.SelectServiceType = new FormControl('');
		this.ApplyType = new FormControl('');
		this.Sms = new FormControl('');
	}
	getDtail(e,type) {
		if(type == '0'){
			this.copySelect = '0';
		}else{
			this.copySelect = '1';
		}
		console.log(e)
		this.title = 'edit';
		this.show = true;
		this.select = e.Type;
		this.Name = e.Name;
		this.Days = e.TeamTime[0].Days;
		this.dateSeq = e.TeamTime[0].Seq;
		this.SelectServiceType.value = e.TeamTime[0];
		this.ApplyType.value = e.ApplyType;
		this.Sms.value = e.Sms;
		this.SmsPrehours = e.SmsPrehours;
		this.SmsName = e.SmsName;
		this.Members = e.Members;
		this.SmsContent = e.SmsContent;
		this.id = e.Id;
		// this.daylist = e.TeamTime;
		this.ValidStart = e.ValidStart;
		this.ValidEnd = e.ValidEnd;
		this.gettime(e.ValidStart, e.ValidEnd);
		if (e.Type === 0) {
			this.editChs(e);
		} else {
			this.daylist = [];
			this.EditDaylist(e);
		}
	}
	EditDaylist(e) {
		for (const i of e.TeamTime) {
			// tslint:disable-next-line:no-shadowed-variable
			const userlist = {};
			Reflect.set(userlist, 'Days', i.Days);
			Reflect.set(userlist, 'Type', 0);
			Reflect.set(userlist, 'Color', i.Color);
			Reflect.set(userlist, 'WorkStart', i.WorkStart);
			Reflect.set(userlist, 'AbbrName', i.AbbrName);
			Reflect.set(userlist, 'WorkEnd', i.WorkEnd);
			Reflect.set(userlist, 'Seq', i.Seq);
			Reflect.set(userlist, 'Name', i.Name);
			this.daylist.push(userlist);
		}
	}
	editChs(e) {
		Reflect.set(this.weeks[0], 'Weekday0', e.TeamTime[0].Weekday0);
		Reflect.set(this.weeks[0], 'Weekday1', e.TeamTime[0].Weekday1);
		Reflect.set(this.weeks[0], 'Weekday2', e.TeamTime[0].Weekday2);
		Reflect.set(this.weeks[0], 'Weekday3', e.TeamTime[0].Weekday3);
		Reflect.set(this.weeks[0], 'Weekday4', e.TeamTime[0].Weekday4);
		Reflect.set(this.weeks[0], 'Weekday5', e.TeamTime[0].Weekday5);
		Reflect.set(this.weeks[0], 'Weekday6', e.TeamTime[0].Weekday6);
		for (const i of this.chs) {
			const value = Reflect.get(this.weeks[0], i.name);
			console.log(value);
			Reflect.set(i, i.name, value);
			if (value === 1) {
				Reflect.set(i, 'uCheck', true);
			}
		}
		console.log(this.chs);
	}
	ngOnInit() {
		this.gettime('', '');
		this.ApplyType.value = 0;
		this.Sms.value = 0;
		this.title ='add';
		this.Days = 0;
		this.Name = '';
		const da = {
			State: 0
		};
		this.service.serviceR('workteamTime/13001', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.FrequencyList = res.Result.List;
				// for (const d of res.Result.MaintenanceOrders) {
				//     Reflect.set(d, 'uCheck', false);
				// }
			}
		});
		this.chs = [
			{ id: '1', time: '周一', uCheck: false, name: 'Weekday1' },
			{ id: '2', time: '周二', uCheck: false, name: 'Weekday2' },
			{ id: '3', time: '周三', uCheck: false, name: 'Weekday3' },
			{ id: '4', time: '周四', uCheck: false, name: 'Weekday4' },
			{ id: '5', time: '周五', uCheck: false, name: 'Weekday5' },
			{ id: '6', time: '周六', uCheck: false, name: 'Weekday6' },
			{ id: '7', time: '周日', uCheck: false, name: 'Weekday0' },
		];
		this.weeks = [
			{
				Weekday1: 0,
				Weekday2: 0,
				Weekday3: 0,
				Weekday4: 0,
				Weekday5: 0,
				Weekday6: 0,
				Weekday0: 0
			}
		];
		this.foots = [
			{ value: 'steak-0', viewValue: 'Steak' },
			{ value: 'pizza-1', viewValue: 'Pizza' },
			{ value: 'tacos-2', viewValue: 'Tacos' }
		];
		this.colors = [
			{ id: '1', color: '#BCE1AA' },
			{ id: '2', color: '#FFDAA4' },
			{ id: '3', color: '#7ECEF4' },
			{ id: '4', color: '#FFB6BA' },
			{ id: '5', color: '#84CCCA' },
			{ id: '6', color: '#F29A76' },
			{ id: '7', color: '#C4BAEB' },
			{ id: '8', color: '#D0BEB0' },
			{ id: '9', color: '#88ACDA' },
			{ id: '10', color: '#DCE2EAA' },
		];
		const MTData = {
			State: 0
		};
		this.service.serviceR('ent/buildspace/5301', MTData, (res: any) => {
			if (res.ResultCode === 0) {
				this.Builds = res.Result.Builds;
			}
		});
	}
	gettime(timestart, timeend) {
		setTimeout(() => {
			laydate.render({
				elem: '#test1',
				type: 'date',
				value: timestart,
				trigger: 'click',
				done: (value) => {
					this.ValidStart = value;
				}
			});
			laydate.render({
				elem: '#test2',
				type: 'date',
				value: timeend,
				trigger: 'click',
				done: (value) => {
					this.ValidEnd = value;
				}
			});
		});
	}
	checkItem() {
		let sum = 0;
		for (const d of this.chs) {
			Reflect.set(d, d.name, 0);
			if (d.uCheck === true) {
				Reflect.set(this.weeks[0], d.name, 1);
				sum += 1;
			} else {
				sum -= 1;
			}
		}
		console.log(this.chs);
		console.log(this.weeks);
	}
	dateSelect(w){
		for(let i of this.FrequencyList){
			if(i.Seq == w.value){
				this.SelectServiceType.value = i;
			}
		}
	}
	addDay() {
		const userlist = {};
		// console.log(this.SelectServiceType)
		var flag = false;
		if(this.Days > 0 ){
			Reflect.set(userlist, 'Days', this.Days);
			Reflect.set(userlist, 'Type', this.SelectServiceType.value.Type);
			Reflect.set(userlist, 'State', this.SelectServiceType.value.State);
			Reflect.set(userlist, 'Color', this.SelectServiceType.value.Color);
			Reflect.set(userlist, 'WorkStart', this.SelectServiceType.value.WorkStart);
			Reflect.set(userlist, 'AbbrName', this.SelectServiceType.value.AbbrName);
			Reflect.set(userlist, 'WorkEnd', this.SelectServiceType.value.WorkEnd);
			Reflect.set(userlist, 'CName', this.SelectServiceType.value.CName);
			Reflect.set(userlist, 'Seq', this.SelectServiceType.value.Seq);
			Reflect.set(userlist, 'Name', this.SelectServiceType.value.Name);
			for(var i=0; i<this.daylist.length; i++) {
				if(JSON.stringify(this.daylist[i]).indexOf(JSON.stringify(userlist)) != -1) {
					flag = true;
				}
		  }
			if(flag){
				this.snackBar.open('班次已存在', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
			}else{
	       this.daylist.push(userlist);
			}
		}else{
			this.snackBar.open('天数输入不正确', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		}
		// console.log(userlist);
	}
	save() {
		if (this.Name === '' || this.Name === undefined) {
			this.snackBar.open('未填写规则名称', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		} else if (this.SelectServiceType.value === '' || this.Name === undefined) {
			this.snackBar.open('未选择班次', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		} else if (this.ValidStart === '' || this.ValidStart === undefined) {
			// else if (this.select !== 0) {
			//   if (this.daylist.length === 0) {
			//     this.snackBar.open('请添加班次', '确认', {
			//       duration: 1600,
			//       verticalPosition: 'top',
			//       panelClass: 'snack-bar-color-success'
			//     });
			//   }
			// } else if (this.Members.length === 0) {
			//   this.snackBar.open('未选择工作人员', '确认', {
			//     duration: 1600,
			//     verticalPosition: 'top',
			//     panelClass: 'snack-bar-color-success'
			//   });
			// }
			this.snackBar.open('未选择开始日期', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		} else if (this.ValidEnd === '' || this.ValidEnd === undefined) {
			this.snackBar.open('未选择结束日期', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		} else {
			console.log('nihao');
			if (this.title === 'edit' && this.copySelect == '1') {
				Reflect.set(this.weeks[0], 'Seq', this.SelectServiceType.value);
				const da = {
					// Id: this.id,
					// Seq: this.SelectServiceType.value,
					Type: this.select === 0 ? 0 : 1,
					ValidStart: this.ValidStart,
					ValidEnd: this.ValidEnd,
					Members: this.Members,
					Name: this.Name,
					ApplyType: this.ApplyType.value,
					Sms: this.Sms.value,
					SmsPrehours:this.SmsPrehours,
					SmsName:this.SmsName,
					SmsContent:this.SmsContent,
					TeamTime: this.select === 0 ? this.weeks : this.daylist,
				};
				console.log(da);
				this.service.serviceR('workteam/14002', da, (res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						this.snackBar.open('添加成功', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.show = false;
						this.someEvent.next();
					} else if (res.ResultCode === 999) {
						this.snackBar.open('同一个班次不能连续添加', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					} else if (res.ResultCode === 14002013) {
						this.snackBar.open('生效时间与班次天数不同步', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					}
				});
			} else if (this.title === 'edit' && this.copySelect == '0'){
				Reflect.set(this.weeks[0], 'Seq', this.SelectServiceType.value);
				const da = {
					Id: this.id,
					Seq: this.SelectServiceType.value,
					Type: this.select === 0 ? 0 : 1,
					ValidStart: this.ValidStart,
					ValidEnd: this.ValidEnd,
					Members: this.Members,
					Name: this.Name,
					ApplyType: this.ApplyType.value,
					Sms: this.Sms.value,
					SmsPrehours:this.SmsPrehours,
					SmsName:this.SmsName,
					SmsContent:this.SmsContent,
					TeamTime: this.select === 0 ? this.weeks : this.daylist,
				};
				console.log(da);
				this.service.serviceR('workteam/14003', da, (res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						this.snackBar.open('修改成功', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.show = false;
						this.someEvent.next();
					}
				});
			}
			else {
				Reflect.set(this.weeks[0], 'Seq', this.SelectServiceType.value);
				const da = {
					Type: this.select === 0 ? 0 : 1,
					ValidStart: this.ValidStart,
					ValidEnd: this.ValidEnd,
					Members: this.Members,
					Name: this.Name,
					ApplyType: this.ApplyType.value,
					Sms: this.Sms.value,
					SmsPrehours:this.SmsPrehours,
					SmsName:this.SmsName,
					SmsContent:this.SmsContent,
					TeamTime: this.select === 0 ? this.weeks : this.daylist,
				};
				if (this.select === 0) {
					Reflect.set(da, 'Seq', this.SelectServiceType.value);

				}
				console.log(da);
				this.service.serviceR('workteam/14002', da, (res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						this.snackBar.open('添加成功', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.show = false;
						this.someEvent.next();
					} else if (res.ResultCode === 999) {
						this.snackBar.open('同一个班次不能连续添加', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					} else if (res.ResultCode === 14002013) {
						this.snackBar.open('生效时间与班次天数不同步', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					}
				});
			}
		}
	}
	openUserModelDialog(level) {
		const data = {
			State: 0,
			BSeqs: this.BuildingSeq,
			title: '工作人员选择'
		};
		for (const b of this.Builds) {
			if (this.BuildingSeq === b.Seq) {
				Reflect.set(data, 'subjection', b.Subjection);
			}
		}
		const dialogRef = this.dialog.open(UserDialogComponent, {
			width: '1080px',
			data: { ...data }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				// console.log(result);
				// console.log(this.Members, level);
				if (level === 0) {
					if (this.Members.findIndex(item => item.User === result[0].Seq) > -1) {
						this.Members[this.Members.findIndex(item => item.User === result[0].Seq)].Level = 1;
						this.snackBar.open('人员不能重复', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						return false;
					}

					const userlist = {};
					Reflect.set(userlist, 'Level', 1);
					Reflect.set(userlist, 'User', result[0].Seq);
					Reflect.set(userlist, 'Name', result[0].Name);
					if (this.Members.length !== 0) {
						if (this.prepar(result)) {
							this.snackBar.open('人员不能重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-success'
							});
							return;
						}
						if (this.preparMain(result)) {
							this.snackBar.open('主班人员只能选择一个', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-success'
							});
						} else {
							this.Members.push(userlist);
						}
					} else {
						this.Members.push(userlist);
					}

				} else if (level === 1) {
					if (this.Members.length === 0) {
						result.forEach(item => {
							this.Members.push({
								Level: 2,
								User: item.Seq,
								Name: item.Name
							});
						});
					} else {
						result.forEach(item => {
							let i = 0;
							this.Members.forEach(item2 => {
								item.Seq !== item2.User ? i += 1 : i = i;
								if (item.Seq === item2.User) {
									this.snackBar.open('人员不能重复', '确认', {
										duration: 1600,
										verticalPosition: 'top',
										panelClass: 'snack-bar-color-success'
									});
									return;
								}
							});
							if (i === this.Members.length) {
								this.Members.push({
									Level: 2,
									User: item.Seq,
									Name: item.Name
								});
							}
						});
					}
				}
			}
		});
	}
	prepar(result) {
		for (const i of this.Members) {
			console.log(result.Name, i.Name);
			if (result.Name === i.Name) {
				console.log('一样');
				return true;
			} else {
			}
		}
	}
	preparMain(result) {
		for (const i of this.Members) {
			if (i.Level === 1) {
				return true;
			} else {
			}
		}
	}
	Pdelete(e) {
		console.log(e);
		this.Members.splice(e, 1);
	}
	Ddelete(e) {
		this.daylist.splice(e, 1);
	}
	close(e) {
		this.show = false;
		// this.colors = '';
		// this.FrequencyList = '';
		// this.ImgList = '';
		// this.BeginTime = ''; // 开始日期
		// this.EndTime = ''; // 结束日期
		// this.SelectBeginMM = '';
		// this.SelectBeginHH = '';
		// this.SelectendMM = '';
		// this.SelectendHH = '';
		// this.Builds = '';
		// this.HH = [];
		// this.MM = [];
		// this.foots = '';
		// this.select = '';
		// this.SelectServiceType = '';
		// this.BuildingSeq = null;
		// this.ChooseServiceName  = null;
		// this.ServiceSeq  = null;
		// this.ChooseWorkerName  = null;
		// this.WorkerSeq = null;
		this.Members = [];
		this.daylist = [];
		// this.chs = '';
		// this.weeks = '';
		// this.ValidStart = '';
		// this.ValidEnd = '';
		// this.Name = '';
		this.title = '';
		// this.id = '';
		// this.Days = '';
	}
}
