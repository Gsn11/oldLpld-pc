import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';
import { ItemsComponent } from '../../../component/items/items.component';
import { PriceComponent } from '../../../component/price/price.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAddList } from './iAdd.interface';
import { Service } from '../../../../../../service/service';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';
import { CameraDialogComponent } from '../../../../component/dialog/camera-dialog/camera-dialog.component';
import { UserManyDialogComponent } from '../../../../component/dialog/userMany-dialog/userMany-dialog.component';
import { SchedulingDialogComponent } from '../../../../component/dialog/scheduling-dialog/scheduling-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { ServiceType, ServiceInside } from '../../../component/json/order.json';
import buildData from '../../../../../../../environments/buildType';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	buildData: any;
	userInfo: any;
	crumbsList: object;
	imgsrc: string;
	imgsrcData: object[] = [];
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	ScheduleSetup: any;
	MSName: string = null; // 计划名称
	BeginTime: string; // 开始日期
	EndTime: string; // 结束日期
	TimeType: any[];
	SelectTimeType: any;
	SelectDay: any;
	Day: any[];
	DayTitle: string = null;
	MSDesc: string = null; // 计划描述
	OrderTimeOut: number = null;
	WorkExpire: number = null;
	ArriveExpire: number = null;
	ServiceType: any;
	SelectServiceType: any;
	MaintenanceTemplates: any;
	Builds: any;
	ServiceProviders: any;
	SelectServiceProviders: any;
	@ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;
	@ViewChild(PriceComponent, null) priceComponent: PriceComponent;
	ServiceFee: number;
	scheItem: any;
	deviceData: any;
	scheduleFirstTime: string;
	scheduleEndTime: string;
	scheduleBeginTime: string;
	ScheduleType: string;
	MaintenanceType: number;
	BuildingSeq: number = null;
	ChooseServiceName: string = null;
	ServiceSeq: any = null;
	ChooseWorkerName: string = null;
	WorkerSeq: any = null;
	NeedQrcode: number;
	NeedSms:number;
	SubList: any;
	SubcharList: any;
	WorkTeamId: any;
	TeamTime: any;
	Zindex: any;
	SubChargers: any;
	videoCode: any;
	videoNameList: any;
	pageRowField: any;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
		private dialog: MatDialog
	) {
		this.buildData = buildData;
		route.data
			.subscribe(
				(res: any) => {
					this.ScheduleType = res.type;
				}
			);
		let crumbsName: string;
		if (this.ScheduleType === 'schedulepatrol') {
			this.pageRowField = '巡检';
			crumbsName = '巡检计划';
			this.MaintenanceType = 0;
		} else if (this.ScheduleType === 'schedulekeep') {
			this.pageRowField = '保养';
			crumbsName = '保养计划';
			this.MaintenanceType = 1;
		} else {
			this.pageRowField = '维修';
			crumbsName = '维修计划';
			this.MaintenanceType = 2;
		}
		this.crumbsList = [
			{ name: '运维中心', open: false },
			{ name: '运维计划', open: false },
			{ name: crumbsName, open: true, url: this.ScheduleType },
			{ name: '添加', open: false }
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
		const Isentver = this.userInfo.Isentver;
		console.log(ServiceType)
		console.log(Isentver)
		if (!Isentver) {
			this.ServiceType = ServiceType;
			this.SelectServiceType = new FormControl({
				value: '0',
				disabled: false
			});
		} else {
			this.ServiceType = ServiceInside;
			if (this.buildData.buildType === '东南水厂') {
				console.log(this.buildData.buildType)
				this.SelectServiceType = new FormControl({
					value: '3',
					disabled: true
				});
			}else{
				this.ServiceType = ServiceType;
				console.log(ServiceType)
				console.log(ServiceInside)
				this.SelectServiceType = new FormControl({
					value: '0',
					disabled: false
				});
			}	
		}
		this.SelectServiceProviders = new FormControl('');
		this.ServiceFee = 0;
		this.deviceData = JSON.parse(localStorage.getItem('bemDevicealarmData'));
		if (this.deviceData) {
			Reflect.set(this.deviceData, 'BuildingName', this.deviceData.Building);
			Reflect.set(this.deviceData, 'Building', this.deviceData.BuildingSeq);
			this.scheItem = [this.deviceData];
		} else {
			this.scheItem = [];
		}
		this.NeedQrcode = 1;
		this.NeedSms  = 1;
	}

	ngOnInit() {
		const data = {
			State: 0
		};
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
		this.service.serviceR('ent/cususer/4101', data, (res: any) => {
			if (res.ResultCode === 0 && res.Result.Users.length > 0) {
				res.Result.Users.map((item: any) => {
					if (this.ServiceSeq === item.Seq) {
						this.ChooseServiceName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
					}
					if (Number(this.WorkerSeq) === item.Seq) {
						this.ChooseWorkerName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
					}
				});
			}
		});
		const MTData = {
			State: 0
		};
		this.service.serviceR('ent/maintenance/8101', MTData, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceTemplates = res.Result.MaintenanceTemplates;
			}
		});
		this.service.serviceR('ent/buildspace/monitor/5301', MTData, (res: any) => {
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
	}

	goback() {
		if (this.deviceData) {
			this.router.navigate(['index/devicealarm']);
		} else {
			this.router.navigate(['index/' + this.ScheduleType]);
		}
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
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}

	getScheduleFirstTime(data: string) {
		this.scheduleFirstTime = data;
		console.log(data);
	}

	getScheduleEndTime(data: string) {
		this.scheduleEndTime = data;
	}

	getScheduleBeginTime(data: string) {
		this.scheduleBeginTime = data;
	}

	changeCodeOpen() {
		this.NeedQrcode = this.NeedQrcode === 0 ? 1 : 0;
		console.log(this.NeedQrcode);
	}

	changeInfoOpen(){
		this.NeedSms = this.NeedSms === 0 ? 1 : 0;
		console.log(this.NeedSms);
	}

	checkPrice(event: any) {
		this.ServiceFee = event.visit;
		this.BuildingSeq = event.Buildings;
	}

	openCameraDialog() {
		const dialogRef = this.dialog.open(CameraDialogComponent, {
			width: '1080px'
		});
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.videoCode = '';
				this.videoNameList = '';
				res.forEach(item => {
					this.videoCode += (item.cameraIndexCode + ',');
					this.videoNameList += (item.cameraName + '，');
				});
				this.videoCode = this.videoCode.substr(0, this.videoCode.length - 1);
				this.videoNameList = this.videoNameList.substr(0, this.videoNameList.length - 1);
			}
		});
	}

	openUserModelDialog(userType: number | string) {
		if (userType === 3) {
			const data = {
				State: 0,
				BSeqs: this.BuildingSeq,
				UserType: userType,
				title: '选择排班',
				time: this.scheduleBeginTime ? this.scheduleBeginTime : this.scheduleFirstTime
			};
			for (const b of this.Builds) {
				if (this.BuildingSeq === b.Seq) {
					Reflect.set(data, 'subjection', b.Subjection);
				}
			}
			const dialogRef = this.dialog.open(SchedulingDialogComponent, {
				width: '1080px',
				data: { ...data }
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					this.SubcharList = result.Name;
					this.WorkTeamId = result.Id;
					this.TeamTime = result.TeamTime[0].Seq;
					for (const i of result.Members) {
						if (i.Level === 1) {
							this.ChooseWorkerName = i.Name;
							this.WorkerSeq = i.User;
						}
					}
				} else {

				}
			});
		} else if (userType === 2) {
			const data = {
				State: 0,
				BSeqs: this.BuildingSeq,
				UserType: userType,
				title: '选择次级负责人'
			};
			for (const b of this.Builds) {
				if (this.BuildingSeq === b.Seq) {
					Reflect.set(data, 'subjection', b.Subjection);
				}
			}
			const dialogRef = this.dialog.open(UserManyDialogComponent, {
				width: '1080px',
				data: { ...data }
			});

			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					// console.log(result[0].selected);
					if (userType === 2) {
						this.SubList = result[0].selected;
					} else {
						this.SubList = result[0].selected;
					}
				} else {
					if (userType === 2) {
						this.ChooseServiceName = null;
						this.ServiceSeq = null;
					} else {
						this.ChooseWorkerName = null;
						this.WorkerSeq = null;
					}
				}
			});
		} else {
			const data = {
				State: 0,
				BSeqs: this.BuildingSeq,
				UserType: userType,
				title: userType === 1 ? '负责人选择' : '工作人员选择',

			};

			console.log(data);

			for (const b of this.Builds) {
				if (this.BuildingSeq === b.Seq) {
					Reflect.set(data, 'subjection', b.Subjection);
				}
			}
			const dialogRef = this.dialog.open(UserDialogComponent, {
				width: '1080px',
				data: { ...data, multiple: userType === 1 ? true : false }
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					if (userType === 1) {
						// this.ChooseServiceName += `${item.LoginId} - ${item.Name} - ${item.UserTel}，`;
						this.ChooseServiceName = '';
						this.ServiceSeq = '';
					} else {
						// this.ChooseWorkerName += `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
						this.ChooseWorkerName = '';
						this.WorkerSeq = '';
					}

					result.forEach(item => {
						if (userType === 1) {
							// this.ChooseServiceName += `${item.LoginId} - ${item.Name} - ${item.UserTel}，`;
							this.ChooseServiceName += `${item.Name}，`;
							this.ServiceSeq += (item.Seq + ',');
						} else {
							// this.ChooseWorkerName += `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
							this.ChooseWorkerName += `${item.Name}，`;
							this.WorkerSeq += (item.Seq + ',');
						}
					});
					if (userType === 1) {
						this.ChooseServiceName = this.ChooseServiceName.substr(0, this.ChooseServiceName.length - 1);
						this.ServiceSeq = this.ServiceSeq.substr(0, this.ServiceSeq.length - 1);
					} else {
						this.ChooseWorkerName = this.ChooseWorkerName.substr(0, this.ChooseWorkerName.length - 1);
						this.WorkerSeq = this.WorkerSeq.substr(0, this.WorkerSeq.length - 1);
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
	}

	verificationData(): boolean {
		if (this.SelectServiceType.value === '0') {
			if (!this.WorkerSeq) {
				this.snackBar.open('请选择工作人员', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return false;
			}
		} else if (this.SelectServiceType.value === '1') {
			if (!this.SelectServiceProviders.value) {
				this.snackBar.open('请选择固定服务商', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return false;
			}
		}
		if (this.MSName === '' || this.MSName === null) {
			this.snackBar.open('请输入计划名称', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}
		if (!this.ServiceSeq) {
			this.snackBar.open('请选择负责人', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}
		if (this.BeginTime === undefined || this.BeginTime === null) {
			this.snackBar.open('请选择开始时间', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}
		if (this.EndTime === undefined || this.EndTime === null) {
			this.snackBar.open('请选择结束时间', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}
		if (this.SelectTimeType.value === '1' || this.SelectTimeType.value === '2' || this.SelectTimeType.value === '3') {
			if (!this.scheduleBeginTime) {
				this.snackBar.open('请选择任务开始时间', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return false;
			}
		}
		if (this.SelectTimeType.value === '2') {
			if (!this.SelectDay.value || this.SelectDay.value.length < 1) {
				this.snackBar.open('请选择每周的哪一天', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return false;
			}
		}
		if (this.SelectTimeType.value === '3') {
			if (!this.SelectDay.value || this.SelectDay.value.length < 1) {
				this.snackBar.open('请选择每月的哪一天', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
				return false;
			}
		}
		if (this.SubList) {
			for (const i of this.SubList) {
				for (const item of this.ServiceSeq.split(',')) {
					if (Number(i.Seq) === Number(item)) {
						this.snackBar.open('负责人不可选为次级负责人', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-danger'
						});
						return false;
					}
				}
			}
			for (const i of this.SubList) {
				if (Number(i.Seq) === Number(this.WorkerSeq)) {
					this.snackBar.open('工作人员不可选为次级负责人', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-danger'
					});
					return false;
				}
			}
		}
		return true;
	}

	createData(): IAddList {
		const data: IAddList = {
			ArriveExpire: this.ArriveExpire,
			BeginTime: this.BeginTime + ' ' + (this.scheduleFirstTime ? this.scheduleFirstTime : '00:00:00'),
			EndTime: this.EndTime + ' ' + (this.scheduleEndTime ? this.scheduleEndTime : '00:00:00'),
			Charger: this.ServiceSeq, // 负责人
			Items: this.itemsComponent.Items,
			MSDesc: this.MSDesc,
			MSName: this.MSName,
			OrderExpire: this.OrderTimeOut,
			Pics: this.manyFile.setImgsrcData,
			ServiceType: this.SelectServiceType.value,
			TimeType: this.SelectTimeType.value,
			WorkExpire: this.WorkExpire,
			Type: this.MaintenanceType,
			PriceVisit: this.ServiceFee,
			NeedSms: this.NeedSms,
			NeedQrcode: this.NeedQrcode
			// NeedSms: this.NeedSms
		};
		if (this.SelectServiceType.value === '0') { // 工作人员
			Reflect.set(data, 'Workers', this.WorkerSeq);
		} else if (this.SelectServiceType === '1') {
			Reflect.set(data, 'SrvProvider', this.SelectServiceProviders.value);
		}
		if (this.SelectServiceType.value === '1' || this.SelectServiceType.value === '2') {
			Reflect.set(data, 'Prices', this.priceComponent.Items);
		}
		if (this.scheduleBeginTime) {
			Reflect.set(data, 'Time', this.scheduleBeginTime);
		}
		if (this.SubList) {
			let SubChargers = '';
			for (const i of this.SubList) {
				SubChargers += i.Seq + ',';
			}
			if (SubChargers.length > 0) {
				SubChargers = SubChargers.substr(0, SubChargers.length - 1);
			}
			this.SubChargers = SubChargers;
			Reflect.set(data, 'SubChargers', this.SubChargers);
		}
		if (this.Zindex) {
			Reflect.set(data, 'Zindex', this.Zindex);
		}
		if (this.WorkTeamId) {
			Reflect.set(data, 'WorkTeamId', this.WorkTeamId);
		}
		if (this.TeamTime) {
			Reflect.set(data, 'TeamTime', this.TeamTime);
		}
		if (this.SelectDay.value) {
			let d = '';
			for (const s of this.SelectDay.value) {
				d += (s.toString() + ',');
			}
			d = d.substr(0, d.length - 1);
			Reflect.set(data, 'Day', d);
		}
		if (this.videoCode) {
			Reflect.set(data, 'Videos', this.videoCode);
		}
		return data;
	}

	userSave() {
		if (this.verificationData() || true) {
			this.snackBar.open('正在生成，请稍等', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			const data = this.createData();
       console.log(data)
			this.service.serviceR('ent/maintenance/8302', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-success'
					});
					this.router.navigate(['index/' + this.ScheduleType]);
				}
			});
		}
	}
}
