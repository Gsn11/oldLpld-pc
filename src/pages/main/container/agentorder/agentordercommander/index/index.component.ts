import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

// declare var echarts: any;
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	providers: [Service]
})

export class IndexComponent implements OnInit {
	userInfo: any;
	crumbsList: object;
	displayedColumns: any = ['id', 'name', 'state', 'time', 'operate']; // 列表要显示的项
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	beginTime = null;
	endTime = null;
	list = [];

	searchVal = '';

	chooseDeleteSeq: any;
	setConfim: any;

	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private service: Service
	) { }
	ngOnInit() {
		this.crumbsList = [
			// { name: '运维中心', open: false },
			{ name: '派单管理', open: false },
			{ name: '派单管理', open: false }
		];
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));

		this.getList();
	}


	goExamine(el) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		this.router.navigate(['index/agentordercommander/examine']);
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

	// 控制confim模态框
	showConfim(seq: number) {
		this.chooseDeleteSeq = seq;
		this.setConfim = !this.setConfim;
	}

	tableConfimResult(...data: boolean[]) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.service.serviceR('ent/maintenance/dnsc/8007', { MOSeq: this.chooseDeleteSeq }, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('取消订单成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-success'
					});

					this.pageIndex = 1;
					this.pageSize = 10;

					this.getList();
				}
			});
		}
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	getList() {
		const data: any = {
			Customers: this.userInfo.Customer.Seq,
			CommonSearch: this.searchVal,
			ScheduleType: '5',
			ServiceType: 0,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
			State: '104'
		};

		if (this.beginTime) {
			data.StartTime = this.beginTime + ' 00:00:00';
		}

		if (this.endTime) {
			data.EndTime = this.endTime + ' 00:00:00';
		}

		this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.paginatorTotal = res.Result.Total;
				this.list = res.Result.MaintenanceOrders;
			}
		});
	}

	getBeginTime(e) {
		this.beginTime = e;
	}

	getEndTime(e) {
		this.endTime = e;
	}
}
