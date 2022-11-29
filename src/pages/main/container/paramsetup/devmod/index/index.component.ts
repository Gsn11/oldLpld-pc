import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { ExcelUploadComponent } from '../../../component/excelUpload/excelUpload.component';
import buildData from '../../../../../../environments/buildType';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	searchName: string;
	crumbsList: object;
	customer: any;
	setConfim: boolean;
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];
	paginatorTotal: number;
	UploadAddr: string;
	downloadInfo: string;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	@ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;

	displayedColumns: string[];
	list: object[];
	chooseDeleteSeq: number;
	checkType: any = '';
	buildData: any;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.crumbsList = [
			{ name: '参数设置', open: false },
			{ name: '设备型号管理', open: false }
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.setConfim = false;
		this.pageSize = 10;
		this.displayedColumns = ['MainType', 'DTName', 'DMName', 'BRName', 'Id', 'Other'];
		this.list = null;
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.searchName = null;
		this.UploadAddr = 'ent/devicemodel/6106';
		this.downloadInfo = '请下载设备对照表';
		this.buildData = buildData;

	}

	ngOnInit() {
		if (localStorage.getItem('BemPageIndex')) {
			this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.getItem('BemPageSize')) {
			this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		this.getList();
		if (localStorage.getItem('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.getItem('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}
	fileBoxChange() {
		console.log(this.excelUpload);
		this.excelUpload.fileBoxChange();
	}
	getList() {
		const data: any = {
			State: 0,
			// MainType: this.checkType
		};

		if (this.checkType) {
			data.MainType = this.checkType;
		}

		if (this.searchName) {
			Reflect.set(data, 'CommonSearch', this.searchName);
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		} else {
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		}

		this.service.serviceR('ent/devicemodel/6111', data, (res: any) => {
			if (res.ResultCode === 0) {
				const key = 'DeviceModels';
				this.list = res.Result[key];
				console.log(this.list);
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	gotoAdd() {
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/devmod/add']);
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	gotoInfo(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/devmod/info']);
	}

	gotoEdit(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/devmod/edit']);
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
			this.service.serviceR('ent/devicemodel/6104', { DMSeq: this.chooseDeleteSeq }, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('删除成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-info'
					});
					this.getList();
				}
			});
		}
	}
}

