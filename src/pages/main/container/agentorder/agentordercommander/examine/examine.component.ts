import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { ItemsComponent } from '../../../maintenance/component/items/items.component';
import { UserManyDialogComponent } from '../../../component/dialog/userMany-dialog/userMany-dialog.component';
import { MatSnackBar, MatDialog } from '@angular/material';

// declare var echarts: any;
@Component({
	selector: 'app-examine',
	templateUrl: './examine.component.html',
	styleUrls: ['./examine.component.scss'],
	providers: [Service]
})

export class ExamineComponent implements OnInit {
	@ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;

	crumbsList: object;
	imgsrcData: object[] = [];

	name = '';
	des = '';
	workPerList = [];
	workExpire = '';
	hour = '';

	MaintenanceTemplates = null;
	Builds = null;

	deviceColumns: any = ['posi', 'dev', 'img']; // 列表要显示的项
	orderStateColumns: any = ['state', 'time', 'behavior']; // 列表要显示的项
	orderOperateColumns: any = ['person', 'behavior', 'time', 'des', 'img']; // 列表要显示的项

	info: any;

	MaintenanceScheItems: any = [];
	MaintenanceOrderHis: any;
	MaintenanceActions: any;

	repairPersonList: any = [];
	acceptPersonList: any = [];

	constructor(
		private snackBar: MatSnackBar,
		private router: Router,
		private service: Service,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.crumbsList = [
			// { name: '运维中心', open: false },
			{ name: '派单管理', open: false },
			{ name: '派单管理', open: false }
		];
		this.service.serviceR('ent/maintenance/8101', {
			State: 0
		}, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceTemplates = res.Result.MaintenanceTemplates;
			}
		});
		this.service.serviceR('ent/buildspace/monitor/5301', {
			State: 0
		}, (res: any) => {
			if (res.ResultCode === 0) {
				this.Builds = res.Result.Builds;
			}
		});

		this.info = JSON.parse(localStorage.getItem('bemInfoData'));

		this.getItemList();


		this.service.serviceR('ent/maintenance/history/8009', {MOSeq: this.info.MOSeq}, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceOrderHis = res.Result.MaintenanceOrderHis;
			}
		});

		this.service.serviceR('ent/maintenance/8901', {OrderSeq: this.info.MOSeq}, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceActions = res.Result.MaintenanceActions;
			}
		});
	}

	getItemList() {
		this.service.serviceR('ent/maintenance/8015', {MOSeq: this.info.MOSeq}, (res: any) => {
			if (res.ResultCode === 0) {
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
			}
		});
	}

	openUserModelDialog(type) { // type 1：意见人员 2：通知人员
		// const data = {
		// 	State: 0,
		// 	BSeqs: this.BuildingSeq,
		// 	UserType: userType,
		// 	title: '选择次级负责人'
		// };
		// for (const b of this.Builds) {
		// 	if (this.BuildingSeq === b.Seq) {
		// 		Reflect.set(data, 'subjection', b.Subjection);
		// 	}
		// }
		const dialogRef = this.dialog.open(UserManyDialogComponent, {
			width: '1080px',
			data: {  }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				type === 0 ? this.repairPersonList = result[0].selected : this.acceptPersonList = result[0].selected;
			} else { }
		});
	}

	goback() {
		history.go(-1);
	}

	confirm() {
		const data = {
			MOSeq: this.info.MOSeq,
			Works: '',
			Chargers: '',
			WorkExpire: this.workExpire
		};

		if (this.repairPersonList.length === 0) {
			this.snackBar.open('请选择维修人员', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			  });
			return false;
		} else {
			this.repairPersonList.forEach(item => {
				data.Works += (item.Seq + ',');
			});
			data.Works = data.Works.substring(0, data.Works.length - 1);
		}

		if (this.acceptPersonList.length === 0) {
			this.snackBar.open('请选择验收审核人员', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			  });
			return false;
		} else {
			this.acceptPersonList.forEach(item => {
				data.Chargers += (item.Seq + ',');
			});
			data.Chargers = data.Chargers.substring(0, data.Chargers.length - 1);
		}

		this.service.serviceR('ent/maintenance/dnsc/8005', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('操作成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				window.history.go(-1);
			}
		});
	}
}
