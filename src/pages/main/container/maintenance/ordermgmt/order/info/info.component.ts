import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../component/dialog/confirm-dialog/confirm-dialog.component';
import { CheckDialogComponent } from '../../../../component/dialog/check-dialog/check-dialog.component';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
	userInfo: any;
	bemInfoData: any;
	bemSelectItem: any;
	crumbsList: object;
	setConfim: boolean;
	userPower: boolean;
	PriceList: any;
	MaintenanceOrderHis: any;
	MaintenanceActions: any;
	MaintenanceScheItems: any;
	IsReOrder: boolean;
	IsSuccess: boolean;
	OrderType: string;
	Isentver: string;
	isVisible = false;
	ImgUrlBig = '';
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
		let crumbsName: string;
		if (this.OrderType === 'orderfix') {
			crumbsName = '维修派单';
		} else if (this.OrderType === 'orderschedulechk') {
			crumbsName = '巡查派单';
		} else {
			crumbsName = '保养派单';
		}
		this.crumbsList = [
			{ name: '运维中心', open: false },
			{ name: '派单管理', open: false },
			{ name: crumbsName, open: true, url: this.OrderType },
			{ name: '查看', open: false }
		];
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
		this.bemSelectItem = JSON.parse(localStorage.getItem('BemSelectItem'));
		this.userPower = false;
		this.setConfim = false;
		if (localStorage.hasOwnProperty('BemReOrderScheItem')) {
			localStorage.removeItem('BemReOrderScheItem');
		}
		if (localStorage.hasOwnProperty('BemReOrderPriceItem')) {
			localStorage.removeItem('BemReOrderPriceItem');
		}
		if (localStorage.hasOwnProperty('BemReOrderList')) {
			localStorage.removeItem('BemReOrderList');
		}
		if (this.bemInfoData.State === 11 || this.bemInfoData.State === 12 || this.bemInfoData.State === 13) {
			this.IsReOrder = true;
		} else {
			this.IsReOrder = false;
		}
		if (this.bemInfoData.State === 9 || this.bemInfoData.State === 10 || this.bemInfoData.State === 16 ||
			this.bemInfoData.State === 32 || this.bemInfoData.State === 48) {
			this.IsSuccess = true;
		} else {
			this.IsSuccess = false;
		}
		this.Isentver = this.userInfo.Isentver;
	}

	ngOnInit() {
		if (this.userInfo.Customer.Seq === this.bemInfoData.Customer && this.bemSelectItem !== 4) {
			this.userPower = true;
		} else {
			this.userPower = false;
		}
		const data = {
			OrderSeq: this.bemInfoData.MOSeq,
		};
		this.service.serviceR('ent/maintenance/8801', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.PriceList = res.Result.OrderPrices;
			}
		});
		const OrderHistroy = {
			MOSeq: this.bemInfoData.MOSeq
		};
		this.service.serviceR('ent/maintenance/history/8009', OrderHistroy, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceOrderHis = res.Result.MaintenanceOrderHis;
				console.log(this.MaintenanceOrderHis);
			}
		});

		this.service.serviceR('ent/maintenance/8901', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceActions = res.Result.MaintenanceActions;
				console.log(this.MaintenanceActions);
			}
		});
		const ScheduleData = {
			MOSeq: this.bemInfoData.MOSeq,
			// DevSeq: this.bemInfoData.DeviceSeq,
		};
		// if (!ScheduleData.DevSeq) {
		//   Reflect.set(ScheduleData, 'Space', this.bemInfoData.Space);
		// }
		this.service.serviceR('ent/maintenance/8015', ScheduleData, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(111);
				console.log(res);
				res.Result.MaintenanceOrderItems.forEach(list => {
					if (list.FeedbackType === 0) {
						if (list.MoiValue === null) {
							list.MoiValue = '';
						} else {
							if (Number(list.MoiValue) === 1) {
								list.MoiValue = '是';
							} else {
								list.MoiValue = '否';
							}
						}
					}
				});
				this.MaintenanceScheItems = res.Result.MaintenanceOrderItems;
				console.log(this.MaintenanceScheItems);
			}
		});
	}


	// 图片放大
	imgBig(img){
		this.ImgUrlBig = img;
		this.isVisible = true;
	}

	goback() {
		this.router.navigate(['index/' + this.OrderType]);
	}

	gotoEdit() {
		this.router.navigate(['index/' + this.OrderType + '/edit']);
	}

	ReSetOrder() {
		localStorage.setItem('BemReOrderScheItem', JSON.stringify(this.MaintenanceScheItems));
		localStorage.setItem('BemReOrderPriceItem', JSON.stringify(this.PriceList));
		localStorage.setItem('BemReOrderList', JSON.stringify(this.bemInfoData));
		this.router.navigate(['index/' + this.OrderType + '/add', { type: 'Re' }]);
	}

	openImage(url: string) {
		window.open(url);
	}

	checkFaild(): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '审核拒绝？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = {
					MOSeq: this.bemInfoData.MOSeq
				};
				this.service.serviceR('ent/maintenance/8004', data, ((res: any) => {
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					}
				}));
			}
		});
	}

	// 审核通过
	checkOk(): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '审核通过？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = {
					MOSeq: this.bemInfoData.MOSeq
				};
				this.service.serviceR('ent/maintenance/inside/8111', data, ((res: any) => {
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					}
				}));
			}
		});
	}

	// 同意验收
	verifyOk(): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '审核通过？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = {
					MOSeq: this.bemInfoData.MOSeq
				};
				this.service.serviceR('ent/maintenance/8009', data, ((res: any) => {
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					}
				}));
			}
		});
	}

	// 请整改
	OrderReview(): void {
		const dialogRef = this.dialog.open(CheckDialogComponent, {
			width: '300px',
			data: {
				title: '确认请整改？'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log(result);
				const d = {
					MOSeq: this.bemInfoData.MOSeq
				};
				this.service.serviceR('ent/maintenance/8008', d, ((res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						this.snackBar.open('操作成功！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					} else {
						this.snackBar.open('系统错误！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-success'
						});
						this.router.navigate(['index/' + this.OrderType]);
					}
				}));
			}
		});
	}

	showConfim() {
		this.setConfim = !this.setConfim;
	}

	// confim组件返回值 true 确定 / false 取消
	infoConfimResult(...data: any) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.service.serviceR('ent/maintenance/8011', { MOSeq: this.bemInfoData.MOSeq }, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('删除成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-success'
					});
					this.router.navigate(['index/' + this.OrderType]);
				}
			});
		}
	}
}
