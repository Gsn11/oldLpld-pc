import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';

@Component({
	selector: 'app-operationsreport',
	templateUrl: './operationsReport.component.html',
	styleUrls: ['./operationsReport.component.scss']
})
// tslint:disable-next-line:class-name
export class operationsReportComponent implements OnInit {
	dateCheck = '今日';
	data: any;
	indeterminate: any;
	allIsCheck: any;
	dataCheckList: any;
	BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期
	searchName = '';
	elsit: any = '';
	pageSizeOptions: number[];
	paginatorTotal: number;
	pageIndex: number;
	pageSize: number;
	Btnindex: any;
	SeqList: any;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;

	constructor(
		private service: Service,
		private router: Router
	) {
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
	}
	ngOnInit() {
		this.getList('', this.searchName);
	}
	lookDetail() {
		// this.router.navigate(['index/orderStaticReportDetail']);
	}
	checkAll(event: any) {
		this.SeqList = [];
		for (const d of this.dataCheckList) {
			d.uCheck = event.checked;
			if (d.uCheck === true) {
				this.SeqList.push(d.MOSeq);
				console.log(this.SeqList);
			}
		}
	}
	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList(this.elsit, this.searchName);
		console.log(this.pageIndex, this.pageSize);
	}
	checkItem() {
		const len = this.dataCheckList.length;
		this.SeqList = [];
		console.log(len);
		let sum = 0;
		for (const d of this.dataCheckList) {
			if (d.uCheck === true) {
				sum += 1;
				this.SeqList.push(d.MOSeq);
				console.log(this.SeqList);
			} else {
				sum -= 1;
			}
		}
		if (sum === len) {
			this.indeterminate = false;
			this.allIsCheck = true;
		} else if (sum < len && sum > -Math.abs(len)) {
			this.allIsCheck = false;
			this.indeterminate = true;
		} else if (sum === -Math.abs(len)) {
			this.indeterminate = false;
			this.allIsCheck = false;
		}
	}
	getBeginTime(data: string) {
		this.BeginTime = data;
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}
	gotoInfo(e) {
		// tslint:disable-next-line:max-line-length
		const Worker = e.WorkerInfo[0].WorkerName;
		// tslint:disable-next-line:max-line-length
		this.router.navigate(['index/operationsReport/info'], { queryParams: { MOSeq: e.MOSeq, CreatorName: e.CreatorName, WorkerInfo: Worker, OrderNo: e.OrderNo, OrderTime: e.OrderTime, MSDesc: e.MSDesc, MSName: e.MSName } });
	}
	getList(e, name) {
		const da = {
			SortType: 0,
			CommonSearch: name,
			ServiceType: '0',
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
			State: '9,10,16,32,48,73'
		};
		if (e === '') {
		} else {
			Reflect.set(da, 'ScheduleType', e);
		}
		if (this.BeginTime) {
			Reflect.set(da, 'StartTime', this.BeginTime + ' 00:00:00');
		}
		if (this.EndTime) {
			Reflect.set(da, 'EndTime', this.EndTime + ' 23:59:59');
		}
		this.service.serviceR('ent/maintenance/order/8011', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.paginatorTotal = res.Result.Total;
				this.dataCheckList = res.Result.MaintenanceOrders;
				for (const d of res.Result.MaintenanceOrders) {
					Reflect.set(d, 'uCheck', false);
				}
				console.log(res);
			}
		});
	}
	Type(e) {
		console.log(e);
		this.Btnindex = e;
		this.getList(e, this.searchName);
		this.elsit = e;
	}
	seach() {
		this.getList(this.elsit, this.searchName);
	}
	downloadDeviceFile() {
		const SeqString = this.SeqList.toString();
		console.log(SeqString);
		const body = {
			MOSeq: SeqString,
			FileName: '运维记录报表'
		};
		console.log(body);
		new DownloadFile(body, 'ent/maintenance/orderXlsx').downloadfile();
	}
}
