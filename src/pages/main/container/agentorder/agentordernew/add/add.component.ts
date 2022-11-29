import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { ItemsComponent } from '../../../maintenance/component/items/items.component';
import { UserManyDialogComponent } from '../../../component/dialog/userMany-dialog/userMany-dialog.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';

// declare var echarts: any;
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss'],
	providers: [Service]
})

export class AddComponent implements OnInit {
	@ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;

	scheItem = [];

	crumbsList: object;
	imgsrcData: object[] = [];

	name = '';
	des = '';
	workPerList = [];

	MaintenanceTemplates: any;
	Builds: any;

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
	}

	openUserModelDialog() {
		const data = {
			BSeqs: null,
			State: 0,
			UserType: 0,
			title: '选择代班长'
		};

		const dialogRef = this.dialog.open(UserManyDialogComponent, {
			width: '1080px',
			data: { ...data }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.workPerList = result[0].selected;
				console.log(this.workPerList);
				console.log(result[0].selected);
			} else {

			}
		});
	}

	goback() {
		history.go(-1);
	}

	dispatch() {
		const data: any = {
			MSName: this.name,
			OrderDesc: this.des,
			Pics: this.manyFile.setImgsrcData,
			ScheItems: this.itemsComponent.Items
		};
		if (this.workPerList.length > 0) {
			data.Monitors = '';
			this.workPerList.forEach((item, index) => {
				data.Monitors += (item.Seq + ',');
			});
			data.Monitors = data.Monitors.substr(0, data.Monitors.length - 1);
		} else {
			this.snackBar.open('请选择代班长', '确认', {
			  duration: 1600,
			  verticalPosition: 'top',
			  panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		this.service.serviceR('ent/maintenance/dnsc/8002', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('新增成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				window.history.go(-1);
			}
		});
	}

}
