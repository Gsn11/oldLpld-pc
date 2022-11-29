import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { DownloadFile } from '../../../../../../common/utils/js/downloadfile';
import { MarketList, InsideList, ServiceTypeNow, ServiceInside } from '../../../component/json/order.json';
import { CheckDialogComponent } from '../../../../component/dialog/check-dialog/check-dialog.component';
import { CoreModalComponent } from '../orderComponent/coreModal.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	orderMany: any;
	searchName: string;
	crumbsList: object;
	userInfo: any;
	customer: any;
	confimType: string;
	confimTitle: string;
	setConfim: boolean;
	pageSizeOptions: number[];
	activeChoose: number;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	@ViewChild(CoreModalComponent, null) core: CoreModalComponent;
	displayedColumns: string[];
	chooseDeleteSeq: number;
	changePwdUseUSeq: number;
	changePwdUsePhone: string;
	enableUSeq: number;
	enableState: number;
	StateList: any;
	StateListCompany: any;
	StateListAll: any;
	BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期
	SelectTabIndex: number;
	ServiceType: any;
	SelectServiceType: any;
	OrderType: string;
	GotoAdd: string;
	GotoEdit: string;
	GotoInfo: string;
	GotoRecharge: string;
	ScheduleType: string;
	goLookVideo: any;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
		private dialog: MatDialog
	) {
		route.data
			.subscribe(
				(res: any) => {
					this.OrderType = res.type;
				}
			);
		this.route.params
			.subscribe((res: any) => {
				this.SelectTabIndex = res.tabType || 0;
			});
		let crumbsName: string;
		if (this.OrderType === 'orderfix') {
			crumbsName = '维修派单';
			this.GotoEdit = 'orderfix/edit';
			this.GotoInfo = 'orderfix/info';
			this.GotoRecharge = 'orderfix/recharge';
			this.ScheduleType = '2,3,5';
			this.goLookVideo = 'orderfix/video';
		} else if (this.OrderType === 'orderschedulechk') {
			crumbsName = '巡查派单';
			this.GotoEdit = 'orderschedulechk/edit';
			this.GotoInfo = 'orderschedulechk/info';
			this.GotoRecharge = 'orderschedulechk/recharge';
			this.ScheduleType = '0';
			this.goLookVideo = 'orderschedulechk/video';
		} else if (this.OrderType === 'orderkeep') {
			crumbsName = '保养派单';
			this.GotoEdit = 'orderkeep/edit';
			this.GotoInfo = 'orderkeep/info';
			this.GotoRecharge = 'orderkeep/recharge';
			this.ScheduleType = '1';
			this.goLookVideo = 'orderkeep/video';
		}
		this.crumbsList = [
			// { name: '运维中心', open: false },
			{ name: '派单管理', open: false },
			{ name: crumbsName, open: false }
		];
		this.displayedColumns = ['OrderNo', 'MSName', 'Type', 'State', 'OrderTime', 'Other'];
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.customer = this.userInfo.Customer.Seq;
		this.confimTitle = '确认取消派单吗？';
		this.setConfim = false;
		this.pageSizeOptions = [5, 10, 20];
		this.StateListAll = MarketList;
		this.StateListCompany = InsideList;
		this.SelectTabIndex = this.SelectTabIndex || 0;
		this.searchName = '';
		const Isentver = this.userInfo.Isentver;
		// if (!Isentver) {
		// 	this.ServiceType = ServiceTypeNow;
		// 	this.SelectServiceType = new FormControl('');
		// } else {
			this.ServiceType = ServiceInside;
			this.SelectServiceType = new FormControl({
				value: '0',
				disabled: false
			});
		// }
	}

	ngOnInit() {
		this.StateList = this.StateListAll;
		if (localStorage.hasOwnProperty('BemSelectServiceType')) {
			this.SelectServiceType.setValue(localStorage.getItem('BemSelectServiceType').toString());
			if (this.SelectServiceType.value === '0') {
				this.StateList = this.StateListCompany;
			}
		}
		if (localStorage.hasOwnProperty('BemSelectItem')) {
			this.SelectTabIndex = parseInt(localStorage.getItem('BemSelectItem'), null);
		}
		if (localStorage.hasOwnProperty('BemPageIndex')) {
			this.StateList[this.SelectTabIndex].PageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.hasOwnProperty('BemPageSize')) {
			this.StateList[this.SelectTabIndex].PageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		this.getList();
		if (localStorage.hasOwnProperty('BemSelectServiceType')) {
			localStorage.removeItem('BemSelectServiceType');
		}
		if (localStorage.hasOwnProperty('BemSelectItem')) {
			localStorage.removeItem('BemSelectItem');
		}
		if (localStorage.hasOwnProperty('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.hasOwnProperty('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}

	lookVideo(el) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		this.router.navigate(['index/' + this.goLookVideo, { code: el.Videos }]);
	}


	getList(list?: number[]) {
		let u: number[];
		const data = {
			Customers: this.customer,
			CommonSearch: this.searchName,
			ScheduleType: this.ScheduleType
		};
		u = [0];
		if (this.SelectServiceType.value !== '') {
			this.StateList = this.StateListCompany;
			Reflect.set(data, 'ServiceType', this.SelectServiceType.value);
			// u = [0, 1, 2, 3, 4];
		} else {
			this.StateList = this.StateListAll;
		}
		if (list && list.length !== 0) {
			u = list;
		}
		if (this.BeginTime) {
			Reflect.set(data, 'StartTime', this.BeginTime + ' 00:00:00');
		}
		if (this.EndTime) {
			Reflect.set(data, 'EndTime', this.EndTime + ' 23:59:59');
		}

		u.map((l) => {
			Reflect.set(data, 'PageIndex', this.StateList[l].PageIndex);
			Reflect.set(data, 'PageSize', this.StateList[l].PageSize);
			Reflect.set(data, 'State', this.getServiceType(l));
			this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
				if (res.ResultCode === 0) {
					res.Result.MaintenanceOrders.forEach(item => {
						if (item.Subchargers) {
							item.Subchargers = item.Subchargers.split(',');
							item.Subchargers.forEach(subchargers => {
								if (subchargers === this.userInfo.UserInfo.userSeq) {
									item.isSubchargers = true;
								}
							});
						}
					});
					Reflect.set(this.StateList[l], 'list', res.Result.MaintenanceOrders ? res.Result.MaintenanceOrders : null);
					Reflect.set(this.StateList[l], 'paginatorTotal', res.Result.Total);
				}
			});
		});
	}
	downloadOrderFile() {
		let FileNameData = '';
		if (this.OrderType === 'orderfix') {
			FileNameData = '维修派单';
		} else if (this.OrderType === 'orderschedulechk'){
			FileNameData = '巡查派单';
		} else if (this.OrderType === 'orderkeep'){
			FileNameData = '保养派单';
		}
		const body = {
			Customers: this.customer,
			CommonSearch: this.searchName,
			ScheduleType: this.ScheduleType,
			FileName: FileNameData
		};
		if (this.SelectServiceType.value === '0') {
			Reflect.set(body, 'ServiceType', this.SelectServiceType.value);
		}
		if (this.BeginTime) {
			Reflect.set(body, 'StartTime', this.BeginTime + ' 00:00:00');
		}
		if (this.EndTime) {
			Reflect.set(body, 'EndTime', this.EndTime + ' 23:59:59');
		}
		Reflect.set(body, 'State', this.getServiceType(this.SelectTabIndex));
		new DownloadFile(body, 'ent/maintenance/order/export').downloadfile();
	}

	getServiceType(tabindex: number): string {
		let state: string;
		// if (tabindex === 0) {
		//     // 待接单
		//     state = '0,61';
		// } else
		// if (tabindex === 4) {
		//     // 待服务
		//     state = '1,2';
		// } else if (tabindex === 2) {
		//     // 待付款
		//     state = '50,60';
		// } else
		if (tabindex === 0) {
			// 待审核
			state = '70,72,99,100,102,104';
		} else if (tabindex === 1) {
			// 待确认
			state = '71,80';
		} else if (tabindex === 2) {
			// 执行中
			state = '3,4,5,6,7,8,14,15,21,74,75,81';
		} else if (tabindex === 3) {
			// 已完成
			state = '9,10,73,32,48';
		} else if (tabindex === 4) {
			// 异常终止
			state = '11,12,13,49';
		} else if (tabindex === 5) {
			// 状态异常
			state = '20,22';
		}
		return state;
	}

	getBeginTime(data: string) {
		this.BeginTime = data;
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}

	tabGroupChange(event: any) {
		this.SelectTabIndex = event.index;
		this.getList([this.SelectTabIndex]);
	}

	gotoAdd() {
		localStorage.setItem('BemPageIndex', JSON.stringify(this.StateList[this.SelectTabIndex].PageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.StateList[this.SelectTabIndex].PageSize));
		localStorage.setItem('BemSelectServiceType', JSON.stringify(parseInt(this.SelectServiceType.value, null)));
		localStorage.setItem('BemSelectItem', JSON.stringify(this.SelectTabIndex));
		// 巡查派单和保养派单没有新增派单功能，所以这里是单项导航
		this.router.navigate(['index/orderfix/add']);
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
		Reflect.set(this.StateList[this.SelectTabIndex], 'PageIndex', event.pageIndex + 1);
		Reflect.set(this.StateList[this.SelectTabIndex], 'PageSize', event.pageSize);
		this.getList([this.SelectTabIndex]);
	}

	// 请整改
	OrderReview(seq: number): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '确认请整改？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log(result);
				// ActionDesc: result,
				const d = {
					MOSeq: seq
				};
				this.service.serviceR('ent/maintenance/8008', d, ((res: any) => {
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.getList();
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					}
				}));
			}
		});
	}

	// state === 7 验收通过
	verifyOk(seq: number, type: string) {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '同意验收？'
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = {
					MOSeq: seq
				};
				this.service.serviceR(type === 'market' ? 'ent/maintenance/8009' : 'ent/maintenance/inside/8009', data, ((res: any) => {
					// console.log(res);
					if (res.ResultCode === 0) {
						this.snackBar.open('验收成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.getList();
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
					}
				}));
			}
		});
	}

	checkOk(seq: number): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '审核同意？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = {
					MOSeq: seq
				};
				this.service.serviceR('ent/maintenance/inside/8111', data, ((res: any) => {
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.getList([this.SelectTabIndex]);
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.getList([this.SelectTabIndex]);
					}
				}));
			}
		});
	}

	gotoInfo(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.StateList[this.SelectTabIndex].PageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.StateList[this.SelectTabIndex].PageSize));
		localStorage.setItem('BemSelectServiceType', JSON.stringify(parseInt(this.SelectServiceType.value, null)));
		localStorage.setItem('BemSelectItem', JSON.stringify(this.SelectTabIndex));
		this.router.navigate(['index/' + this.GotoInfo]);
	}

	gotoEdit(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.StateList[this.SelectTabIndex].PageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.StateList[this.SelectTabIndex].PageSize));
		localStorage.setItem('BemSelectServiceType', JSON.stringify(parseInt(this.SelectServiceType.value, null)));
		localStorage.setItem('BemSelectItem', JSON.stringify(this.SelectTabIndex));
		this.router.navigate(['index/' + this.GotoEdit]);
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
			this.service.serviceR('ent/maintenance/8011', { MOSeq: this.chooseDeleteSeq }, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('取消订单成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-success'
					});
					this.getList([this.SelectTabIndex]);
				}
			});
		}
	}

	gotoPayOrder(orderNo: string, orderSeq: number) {
		const data = {
			OrderNo: orderNo,
			OrderSeq: orderSeq
		};
		localStorage.setItem('fixOrderItem', JSON.stringify(data));
		this.router.navigate(['index/' + this.GotoRecharge]);
	}
	showValue(OverTime: any, Exception: any) {
		let Value = '';
		if (OverTime === 1 && Exception === 1) {
			Value = '反馈超时|位置异常';
		} else if (OverTime === 1 && Exception === 0) {
			Value = '反馈超时';
		} else if (OverTime === 0 && Exception === 1) {
			Value = '位置异常';
		} else {
			Value = '正常';
		}
		return Value;
	}
	score(el: any) {
		console.log(el);
		this.orderMany = el;
		this.core.show = !this.core.show;
	}
	error(el: any) {
		const data = {
			MOSeq: el.MOSeq,
		};
		if (el.OverTime === 1) {
			Reflect.set(data, 'OverTime', 2);
		}
		if (el.Exception === 1) {
			Reflect.set(data, 'Exception', 2);
		}
		this.service.serviceR('ent/maintenance/8066', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('确认成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
				this.getList([this.SelectTabIndex]);
			}
		});
	}
}
