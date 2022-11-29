import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../service/service';
import { FormControl, FormBuilder } from '@angular/forms';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../component/fileUpload/manyFile/manyFile.component';
import { ItemsComponent } from '../inspectionComponent/items/items.component';
import { PriceComponent } from '../inspectionComponent/price/price.component';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var echarts: any;
import { InspectionModalComponent } from '../../component/inspectionModal/inspectionModal.component';
import { FaultModalComponent } from '../../component/faultModal/faultModal.component';
import { SpacetreeModalComponent } from '../../component/spacetreeModal/spacetreeModal.component';
import { UserDialogComponent } from '../../component/dialog/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import buildData from '../../../../../environments/buildType';


@Component({
	selector: 'app-inspection',
	templateUrl: './inspection.component.html',
	styleUrls: ['./inspection.component.scss'],
	providers: [Service]
})
export class InspectionComponent implements OnInit {
	ChooseServiceName: string = null;
	BuildingSeq: number = null;
	ServiceSeq: number = null;
	ChooseWorkerName: string = null;
	WorkerSeq: any;
	NeedQrcode: number;
	Devinolist: any;
	spacetreeList: any; // 传入空间树数据
	Forecast: any;
	userInfo: any;
	pieTopMiddle: any;
	pieTopRight: any;
	barMiddleLeft: any;
	lineMiddleRight: any;
	barBottom: any;
	pirit: any;
	userinfo: any;
	allCheck: any;
	isshow: any;
	id: any;
	insetvalId: any;
	Date: any;
	Time: any;
	num: any;
	crumbsList: object;
	imgsrc: string;
	imgsrcData: object[] = [];
	@ViewChild(CalendarComponent, null) calendar: CalendarComponent;
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	@ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;
	@ViewChild(PriceComponent, null) priceComponent: PriceComponent;
	ScheduleSetup: any;
	Users: any;
	SelectUsers: any;
	MSName: string; // 计划名称
	BeginTime: string; // 开始日期
	EndTime: string; // 结束日期
	TimeType: any[];
	SelectTimeType: any;
	SelectDay: any;
	Day: any[];
	DayTitle: string;
	SelectHH: any;
	HH: number[];
	SelectMM: any;
	MM: number[];
	SelectBeginMM: any;
	SelectBeginHH: any;
	SelectendMM: any;
	SelectendHH: any;
	MSDesc: string; // 计划描述
	OrderTimeOut: number;
	WorkExpire: number;
	ArriveExpire: number;
	ServiceType: any;
	SelectServiceType: any;
	MaintenanceTemplates: any;
	Builds: any;
	Workers: any;
	searchName: string;
	SelectWorkers: any;
	ServiceProviders: any;
	SelectServiceProviders: any;
	scheItem: any;
	options: any;
	List: any;
	SLen: any;
	formatLabel: any;
	value: any;
	dataList: any;
	AlarmNum: any;
	NormalNum: any;
	WorkingTotal: any;
	Total: any;
	diagalert: any;
	faultList: any;
	all: any;
	open: any;
	close: any;
	// tslint:disable-next-line:variable-name
	In_title: any;
	// tslint:disable-next-line:variable-name
	Alam_title: any;
	@ViewChild(InspectionModalComponent, null) inspectionComponent: InspectionModalComponent;
	@ViewChild(FaultModalComponent, null) faultComponent: FaultModalComponent;
	@ViewChild(SpacetreeModalComponent, null) spacetreeComponent: SpacetreeModalComponent;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
		fb: FormBuilder,
		private dialog: MatDialog
	) {
		console.log(location.port);
		if (location.port === '61081') {
			this.In_title = '自动巡检';
			this.Alam_title = '';
		} else {
			this.In_title = '自动巡检';
			this.Alam_title = 'AI';
		}
		this.all = true;
		this.open = false;
		this.close = false;
		this.allCheck = 0;
		this.num = 0;
		this.isshow = false;
		// tslint:disable-next-line:max-line-length;
		this.userinfo = [
			{ id: 0, title_name: '机房巡检', project_num: '129', start_date: '2019年9月21日', end_date: '2019年10月29日', all_time: 38, img: '../../../../../assets/inspection/7.png' },
			{ id: 0, title_name: '空调巡检', project_num: '88', start_date: '2019年11月23日', end_date: '2019年12月23日', all_time: 30, img: '../../../../../assets/inspection/8.png' },
			{ id: 0, title_name: '水泵巡检', project_num: '101', start_date: '2019年11月18日', end_date: '2019年11月29日', all_time: 11, img: '../../../../../assets/inspection/9.png' },
			{ id: 0, title_name: '温度巡检', project_num: '210', start_date: '2019年11月16日', end_date: '2019年12月25日', all_time: 29, img: '../../../../../assets/inspection/10.png' },
			{ id: 0, title_name: '湿度巡检', project_num: '300', start_date: '2019年11月15日', end_date: '2019年11月17日', all_time: 2, img: '../../../../../assets/inspection/11.png' },
		];
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.imgsrc = '';
		this.TimeType = [
			{ name: '单次', state: '0' },
			{ name: '每日', state: '1' },
			{ name: '每周', state: '2' },
			{ name: '每月', state: '3' },
		];
		this.SelectTimeType = new FormControl({
			value: '0',
			disabled: false
		});
		this.Day = [];
		this.SelectDay = new FormControl('');
		this.HH = [];
		this.SelectHH = new FormControl();
		this.MM = [];
		this.SelectMM = new FormControl();
		this.SelectUsers = new FormControl('');
		this.SelectDay = new FormControl('');
		this.SelectBeginMM = new FormControl('');
		this.SelectBeginHH = new FormControl('');
		this.SelectendMM = new FormControl('');
		this.SelectendHH = new FormControl('');
		this.ServiceType = [
			{ name: buildData.serviceProvider, state: '0' },
			{ name: '固定服务商', state: '1' },
			{ name: '服务大市场', state: '2' },
		];
		this.SelectServiceType = new FormControl({
			value: '0',
			disabled: false
		});
		this.crumbsList = [
			{ name: '运维中心', open: false },
			{ name: '运维计划', open: false },
			{ name: '巡检计划', open: true, url: 'schedulepatrol' },
			{ name: '添加', open: false }
		];
		this.SelectWorkers = new FormControl('');
		this.SelectServiceProviders = new FormControl('');
		this.MSName = null;
		this.MSDesc = null;
		this.OrderTimeOut = null;
		this.WorkExpire = null;
		this.ArriveExpire = null;
		this.DayTitle = null;
		this.scheItem = [];
	}
	// battleInit() {
	//   this.allCheck++;
	//   if (this.allCheck === this.SLen) {
	//     clearInterval(this.id);
	//   }
	// }
	// CheckInit() {
	//   this.num++;
	//   if (this.num === 18) {
	//     clearInterval(this.insetvalId);
	//   }
	// }
	getDaysBetween(dateString1, dateString2) {
		const startDate = Date.parse(dateString1);
		const endDate = Date.parse(dateString2);
		const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
		// alert(days);
		return days;
	}
	changeState(seq: number, state: number) {
		const changeState = state === 0 ? 1 : 0;
		console.log(changeState);
		const data = {
			State: changeState,
			MSSeq: seq
		};
		this.service.serviceR('ent/maintenance/8303', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.getList('0,1');
				this.snackBar.open('操作成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
			}
		});
	}
	getTime() {
		const date = new Date();
		const Month = date.getMonth() + 1;
		const Day = date.getDate();
		const Y = date.getFullYear() + '-';
		const M = Month < 10 ? '0' + Month + '-' : Month + '-';
		const D = Day + 1 < 10 ? '0' + Day : Day;
		this.Date = Y + M + D;
		const houers = date.getHours();
		const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
		const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

		return (houers < 10 ? '0' + houers : houers) + ':' + minutes + ':' + seconds;
	}
	getList(id) {
		const data = {
			Type: '4',
			State: id
		};

		this.service.serviceR('ent/maintenance/8311', data, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				const state = res.Result.MaintenanceSchedules.length;
				this.SLen = state;
				// tslint:disable-next-line:prefer-for-of
				for (let i = 0; i < res.Result.MaintenanceSchedules.length; i++) {
					const len = res.Result.MaintenanceSchedules[i].Items.length;
					res.Result.MaintenanceSchedules[i].NumLength = len;
					const BeginTime = res.Result.MaintenanceSchedules[i].BeginTime;
					const EndTime = res.Result.MaintenanceSchedules[i].EndTime;
					const day = this.getDaysBetween(BeginTime, EndTime);
					res.Result.MaintenanceSchedules[i].all_time = day.toFixed(1);
				}
				console.log(res.Result.MaintenanceSchedules);
				this.List = res.Result.MaintenanceSchedules;
			}
		});
	}
	ngOnInit() {
		this.getList('0,1');
		const data = {
			State: 0,
		};
		const table = { state: 0 };
		// 巡检巡检计划统计数据
		this.service.serviceR('ent/aiot/count/scheme', table, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res);
				this.AlarmNum = res.Result.AlarmNum;
				this.NormalNum = res.Result.NormalNum;
				this.WorkingTotal = res.Result.WorkingTotal;
				this.Total = res.Result.Total;
				setTimeout(() => {
					this.spirit(this.NormalNum, this.AlarmNum);
				}, 500);
			}
		});
		// 2.18.13.	查询AIOT巡检巡检计划曲线图数据
		this.service.serviceR('ent/aiot/chart/scheme', table, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.DateList, res.Result.AlarmList);
				this.barBottomBar(res.Result.DateList, res.Result.NormalList, res.Result.AlarmList);
			}
		});
		// 2.18.13.	ai预测
		const list = {
			CommonSearch: '',
			CSeq: 20,
			AlertType: '0,1',
		};
		this.service.serviceR('ent/diagalert/9101', list, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.Total);
				this.Forecast = res.Result.Total;
			}
		});
		// 2.18.13.	ai告警
		const Dalist = {
			AlertType: '2',
			CSeq: 20,
			CommonSearch: '',
		};
		this.service.serviceR('ent/diagalert/9101', Dalist, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.Total);
				this.diagalert = res.Result.Total;
			}
		});
		const scheduleSetupData = {
			Customer: this.userInfo.Customer.Seq
		};
		this.service.serviceR('ent/params/schedulesetup/11701', scheduleSetupData, (res: any) => {
			if (res.ResultCode === 0) {
				this.ScheduleSetup = res.Result.ScheduleSetup[0];
				this.OrderTimeOut = this.ScheduleSetup.OrderTimeOut;
				this.WorkExpire = this.ScheduleSetup.WorkExpire;
				this.ArriveExpire = this.ScheduleSetup.ArriveExpire;
			}
		});
		// this.service.serviceR('ent/cususer/4101', data, (res: any) => {
		//   if (res.ResultCode === 0) {
		//     this.Users = Array.from(res.Result.Users);
		//     this.Workers = Array.from(res.Result.Users);
		//     this.SelectUsers.setValue(this.Users[0].Seq);
		//     this.SelectWorkers.setValue(this.Workers[0].Seq);
		//   }
		// });
		let h = 0;
		let m = 0;
		while (h < 24) {
			this.HH.push(h);
			h++;
		}
		while (m < 60) {
			this.MM.push(m);
			m++;
		}

		const MTData = {
			State: 0
		};
		this.service.serviceR('ent/maintenance/8101', MTData, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceTemplates = res.Result.MaintenanceTemplates;
			}
		});
		this.service.serviceR('ent/buildspace/5301', MTData, (res: any) => {
			if (res.ResultCode === 0) {
				this.Builds = res.Result.Builds;
			}
		});
		this.service.serviceR('ent/serviceprovider/8511', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.ServiceProviders = res.Result.ServiceProviders;
				if (this.ServiceProviders[0]) {
					this.SelectServiceProviders.setValue(this.ServiceProviders[0].Seq);
				}
			}
		});
		setInterval(() => {
			this.Time = this.getTime();
		}, 1000);
		const basicData = {
			State: 0
		};
		const that = this;

		const maxData = 2000;
		// 开启图表
		setTimeout(() => {
			// this.barBottomBar();
		}, 500);
		// this.id = setInterval(() => {
		//   this.battleInit();
		// }, 5);
		// this.insetvalId = setInterval(() => {
		//   this.CheckInit();
		// }, 5);
	}
	timeTypeChange(event: any) {
		const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		if (event.value === '2') {
			this.DayTitle = '每周的哪一天';
			this.Day = [];
			let i = 0;
			while (i < 7) {
				i++;
				this.Day.push({
					name: i,
					check: false,
					value: days[i - 1]
				});
			}
		} else if (event.value === '3') {
			this.DayTitle = '每月的哪一天';
			this.Day = [];
			let i = 0;
			while (i < 31) {
				i++;
				this.Day.push({
					name: i,
					check: false,
					value: i
				});
			}
		}
	}
	getBeginTime(data: string) {
		this.BeginTime = data;
		this.SelectBeginHH.value = 0;
		this.SelectBeginMM.value = 0;
	}
	getEndTime(data: string) {
		this.EndTime = data;
		this.SelectendHH.value = 23;
		this.SelectendMM.value = 59;
	}
	userSave() {
		if (this.Devinolist === undefined) {
			console.log('nihao');
			this.snackBar.open('请添加设备', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.SelectServiceType.value === '1') {
			if (!this.SelectServiceProviders.value) {
				this.snackBar.open('请选择固定服务商', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return;
			}
		}
		if (this.WorkerSeq === undefined) {
			this.snackBar.open('请选择负责人', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.MSName === '' || this.MSName === null) {
			this.snackBar.open('请输入计划名称', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.BeginTime === undefined || this.BeginTime === null) {
			this.snackBar.open('请选择开始时间', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.EndTime === undefined || this.EndTime === null) {
			this.snackBar.open('请选择结束时间', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		let time: string;
		if (this.SelectTimeType.value === '1' || this.SelectTimeType.value === '2' || this.SelectTimeType.value === '3') {
			if (this.SelectHH.value < 0 || this.SelectHH.value >= 24) {
				this.snackBar.open('请选择小时', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return;
			}
			if (this.SelectMM.value < 0 || this.SelectMM >= 60) {
				this.snackBar.open('请选择分钟', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return;
			}
			console.log(this.Devinolist);
			time = (this.SelectHH.value < 10 ? '0' + this.SelectHH.value : this.SelectHH.value) + ':' +
				(this.SelectMM.value < 10 ? '0' + this.SelectMM.value : this.SelectMM.value) + ':00';
		}
		let Begin: string;
		let End: string;
		Begin = (this.SelectBeginHH.value < 10 ? '0' + this.SelectBeginHH.value : this.SelectBeginHH.value) + ':' +
			(this.SelectBeginMM.value < 10 ? '0' + this.SelectBeginMM.value : this.SelectBeginMM.value) + ':00';
		End = (this.SelectendHH.value < 10 ? '0' + this.SelectendHH.value : this.SelectendHH.value) + ':' +
			(this.SelectendMM.value < 10 ? '0' + this.SelectendMM.value : this.SelectendMM.value) + ':00';
		this.snackBar.open('正在生成，请稍等', '确认', {
			duration: 1600,
			verticalPosition: 'top',
			panelClass: 'snack-bar-color-info'
		});
		const array = {};
		console.log(this.Devinolist);
		for (const d of this.Devinolist) {
			Reflect.set(d, 'MSeq', d.Seq);
			Reflect.set(d, 'Device', d.SmartDev);
			Reflect.deleteProperty(d, 'Seq');
			Reflect.deleteProperty(d, 'uCheck');
			Reflect.deleteProperty(d, 'UploadFormula');
			Reflect.deleteProperty(d, 'State');
			Reflect.deleteProperty(d, 'SmartDevNo');
			Reflect.deleteProperty(d, 'SmartDevName');
			Reflect.deleteProperty(d, 'SmartDev');
			Reflect.deleteProperty(d, 'MetricsDesc');
			Reflect.deleteProperty(d, 'IsAlert');
			Reflect.deleteProperty(d, 'Id');
			Reflect.deleteProperty(d, 'GatewayName');
			Reflect.deleteProperty(d, 'Gateway');
			Reflect.deleteProperty(d, 'Formula');
			Reflect.deleteProperty(d, 'Duration');
			Reflect.deleteProperty(d, 'DMOBOrgId');
			Reflect.deleteProperty(d, 'DMOBDesc');
			Reflect.deleteProperty(d, 'BoxDevNo');
			Reflect.deleteProperty(d, 'BoxDevName');
			Reflect.deleteProperty(d, 'BoxDev');
			Reflect.deleteProperty(d, 'AlertLevel');
			Reflect.deleteProperty(d, 'AlertFormula');
			Reflect.deleteProperty(d, 'Customer');
			if (d.Protocol === 'Bem') {
				Reflect.set(d, 'Protocol', 5);
			} else if (d.Protocol === 'bacnet') {
				Reflect.set(d, 'Protocol', 0);
			} else if (d.Protocol === 'modbus') {
				Reflect.set(d, 'Protocol', 1);
			} else if (d.Protocol === 'opc da2.0') {
				Reflect.set(d, 'Protocol', 2);
			} else if (d.Protocol === 'opc ua') {
				Reflect.set(d, 'Protocol', 3);
			} else if (d.Protocol === 'obix') {
				Reflect.set(d, 'Protocol', 4);
			} else if (d.Protocol === 'mqtt') {
				Reflect.set(d, 'Protocol', 6);
			}
		}
		const data = {
			ArriveExpire: this.ArriveExpire,
			BeginTime: this.BeginTime + ' ' + Begin,
			EndTime: this.EndTime + ' ' + End,
			Charger: this.WorkerSeq,
			Items: this.Devinolist,
			MSDesc: this.MSDesc,
			MSName: this.MSName,
			OrderExpire: this.OrderTimeOut,
			Pics: this.manyFile.setImgsrcData,
			ServiceType: this.SelectServiceType.value,
			TimeType: this.SelectTimeType.value,
			WorkExpire: this.WorkExpire,
			Type: 4,
		};
		console.log(data);
		if (this.SelectServiceType.value === '0') {
			Reflect.set(data, 'Workers', this.SelectWorkers.value);
		} else if (this.SelectServiceType === '1') {
			Reflect.set(data, 'SrvProvider', this.SelectServiceProviders.value);
		}
		if (this.SelectServiceType.value === '1' || this.SelectServiceType.value === '2') {
			Reflect.set(data, 'Prices', this.priceComponent.Items);
		}
		// if (time) {
		//   Reflect.set(data, 'Time', time);
		// }
		if (this.SelectDay.value) {
			let d = '';
			for (const s of this.SelectDay.value) {
				d += (s.toString() + ',');
			}
			d = d.substr(0, d.length - 1);
			Reflect.set(data, 'Day', d);
		}
		this.service.serviceR('ent/maintenance/8302', data, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.snackBar.open('成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
				this.isshow = false;
				this.getList('0,1');
			}
		});
	}
	barBottomBar(...data: any) {
		this.barBottom = {
			title: {
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			// legend: {
			//     data: ['邮件营销']
			// },
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					axisLabel: {
						// rotate: 40,
						show: true,
						textStyle: {
							color: '#81E8FE',
							fontSize: '75%'
						}
					},
					data: data[0]
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLabel: {
						show: true,
						textStyle: {
							color: '#81E8FE',
							fontSize: '75%'
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: false
					},
				}
			],
			series: [
				{
					name: '故障',
					type: 'line',
					stack: '总量',
					smooth: true,
					symbol: 'none',
					itemStyle: {
						normal: {
							color: '#FD6972'
						}
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#FD6972'
							},
							{
								offset: 1,
								color: '#011837'
							},
							]
							)
						}
					},
					data: data[2]
				},
				{
					name: '正常',
					type: 'line',
					stack: '总量',
					smooth: true,
					symbol: 'none',
					itemStyle: {
						normal: {
							color: '#00FFFF'
						}
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#0b4b85'
							},
							{
								offset: 1,
								color: '#011837'
							},
							]
							)
						}
					},
					data: data[1]
				},
			]
		};
	}
	spirit(nomal, err) {
		this.pirit = {
			// tooltip: {
			// },
			xAxis: {
				max: 100,
				splitLine: { show: false },
				offset: 10,
				axisLine: {
					lineStyle: {
						color: '#999'
					}
				},
				axisLabel: {
					margin: 10
				}
			},
			yAxis: {
				data: [],
				inverse: true,
				axisTick: { show: false },
				axisLine: { show: false },
				axisLabel: {
					margin: 10,
					color: '#999',
					fontSize: 16
				}
			},
			grid: {
				top: 'center',
				height: 200,
				left: 0,
				right: 0
			},
			series: [{
				// current data
				type: 'pictorialBar',
				symbol: 'image://../../../../../assets/home/13.jpg',
				symbolRepeat: 'fixed',
				symbolMargin: '10%',
				symbolClip: true,
				symbolSize: [1, 30],
				symbolBoundingData: 2000,
				data: [nomal],
				z: 10
			}, {
				// full data
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						opacity: 0.2
					}
				},
				label: {
					show: true,
					// formatter(params) {
					//     return (params.value / data.maxData * 100).toFixed(1) + ' %';
					// },
					position: 'right',
					offset: [0, 0],
					color: 'green',
					fontSize: 18
				},
				animationDuration: 0,
				symbolRepeat: 'fixed',
				symbolMargin: '10%',
				symbol: 'image://../../../../../assets/home/13.jpg',
				symbolSize: [1, 30],
				symbolBoundingData: 2000,
				data: [nomal + err],
				z: 5
			}]
		};
	}

	gotoHome() {
		this.router.navigate(['index/home']);
	}

	clickShowModal(index) {
		this.inspectionComponent.show = !this.inspectionComponent.show;
		for (let i = 0; i < this.List[index].Items.length; i++) {
			if (this.List[index].Items[i].alarm) {
				console.log(this.List[index].Items[i]);
				this.List[index].Items.splice(i, 1);
			}
			console.log(this.List[index].Items);
		}
		this.dataList = this.List[index];
		console.log(this.List[index].Items);
		this.inspectionComponent.sChelIMg(this.List[index].MSSeq);
	}
	fautlShow(index) {
		console.log(this.faultComponent);
		this.faultComponent.faultshow = !this.faultComponent.faultshow;
		this.faultList = this.List[index];
		this.faultComponent.getList(this.List[index].MSSeq);
		console.log(this.faultList);
		// console.log(index);
	}
	fShow() {
		console.log(this.spacetreeComponent);
		const data = {
			// Id: '',
			// DeviceNo: '',
			// DevSeq: '',
			// Gateway: '',
			// GatewaySeq: '',
			// SmartDevSeq: '',
			// BoxDevSeq: '',
			// State: '',
			// CommonSearch: '',
			PageIndex: '',
			PageSize: ''
		};
		console.log(data);
		this.service.serviceR('ent/iot/metricsbem/11901', data, (res: any) => {
			if (res.ResultCode === 0) {
				for (const d of res.Result.MetricsBems) {
					Reflect.set(d, 'uCheck', false);
				}
				this.spacetreeList = res.Result.MetricsBems;
				console.log(this.spacetreeList);
			}
		});
		this.spacetreeComponent.fshow = !this.spacetreeComponent.fshow;
		// this.faultList = this.List[index];
		// this.SpacetreeComponent.getList(this.List[index].MSSeq);
		console.log(this.faultList);
		// console.log(index);
	}
	change(key) {
		console.log(key);
		this.Devinolist = key;
	}
	openUserModelDialog(userType: number | string) {
		const data = {
			State: 0,
			BSeqs: this.BuildingSeq,
			UserType: 1,
			title: '请选择负责人'
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
				if (userType === 1) {
					this.ChooseServiceName = `${result[0].LoginId} - ${result[0].Name} - ${result[0].UserTel}`;
					this.ServiceSeq = result[0].Seq;
				} else {
					this.ChooseWorkerName = `${result[0].LoginId} - ${result[0].Name} - ${result[0].UserTel}`;
					this.WorkerSeq = result[0].Seq;
				}
			} else {
				if (userType === 1) {
					this.ChooseServiceName = null;
					this.ServiceSeq = null;
				} else {
					this.ChooseWorkerName = null;
					this.WorkerSeq = null;
				}
			}
		});
	}
	onChecked(id) {
		console.log(this.all, this.open, this.close);
		if (id === 1) {
			this.all = true;
			this.open = false;
			this.close = false;
			this.getList('0,1');
		} else if (id === 2) {
			this.all = false;
			this.open = true;
			this.close = false;
			this.getList('0');
		} else {
			this.all = false;
			this.open = false;
			this.close = true;
			this.getList('1');
		}
	}
}
