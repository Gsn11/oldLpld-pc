import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TimeCompare } from '../../../../../../common/utils/js/timeCompare';
import { Service } from '../../../../../../service/service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	searchName: string;
	crumbsList: object;
	customer: any;
	displayedColumns: string[];
	setData: object;
	initialCompanyList: any;
	@ViewChild(MatSort, null) sort: MatSort;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	pageIndex: number;
	pageSize: number;
	SystemList: any;
	SystemSelect = new FormControl();
	constructor(
		private router: Router,
		private service: Service
	) {
		this.crumbsList = [
			{ name: '运维中心', open: false },
			{ name: '故障管理', open: false },
			{ name: '报警诊断', open: false },
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.setData = {
			CommonSearch: '',
			CSeq: this.customer,
			AlertType: '0,1'
		};
		this.initialCompanyList = null;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.displayedColumns = ['timeStr', 'building', 'devName', 'metricDesc', 'levelName', 'time', 'orderState', 'Other'];
		this.searchName = '';
	}

	ngOnInit() {
		if (localStorage.getItem('BemPageIndex')) {
			this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.getItem('BemPageSize')) {
			this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		this.getList();
		const data = {
			State: 0,
		};
		this.service.serviceR('ent/params/subsys/monitor/10911', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.SystemList = res.Result.SubSystems;
			}
		});
		if (localStorage.getItem('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.getItem('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}

	getList() {
		this.service.serviceR('ent/diagalert/9101', this.setData, (res: any) => {
			if (res.ResultCode === 0) {
				this.initialCompanyList = new MatTableDataSource(res.Result.AlertList);
				this.initialCompanyList.sort = this.sort;
				this.initialCompanyList.paginator = this.paginator;
			}
		});
	}

	gotoAdd(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/diagalert/add']);
	}

	applyFilter() {
		this.initialCompanyList.filter = this.searchName.trim();
		if (this.initialCompanyList.paginator) {
			this.initialCompanyList.paginator.firstPage();
		}
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
	}

	selectClose(selectName: any) {
		this.initialCompanyList.filter = selectName.value.trim();
		if (this.initialCompanyList.paginator) {
			this.initialCompanyList.paginator.firstPage();
		}
	}

	gotoInfo(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/diagalert/info']);
	}

	// startTime: number, endTime: number
	getTime(duration: number) {
		return new TimeCompare(duration).compare();
	}
	downloadDeviceFile() {
		const body = {
			CommonSearch: this.searchName ? this.searchName : '',
			SubsysSeq: '',
			AlertType: '0,1',
			FileName: '报警诊断'
		};
		new DownloadFile(body, 'ent/diagalert/9101/export').downloadfile();
	}
}
