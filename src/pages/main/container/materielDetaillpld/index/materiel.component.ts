import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../service/service';
import buildData from '../../../../../environments/buildType';

@Component({
	selector: 'app-materiel',
	templateUrl: './materiel.component.html',
	styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {
	crumbsList: any;
	buildData = buildData;

	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 0;

	BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期

	displayedColumns = ['materiel', 'inOut', 'num', 'unitPrice', 'allPrice', 'time', 'inOutPer', 'msgNum', 'remark', 'operate'];

	type: any;

	list: any = [];

	constructor(
		public route: ActivatedRoute,
		public dialog: MatDialog,
		private service: Service,
		private router: Router
	) {
		route.data.subscribe(res => {
			res.type ? this.type = res.type : this.type = '';
		});
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '物料列表', open: false }
		];

		this.buildData = buildData;

		this.getList();
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	getList() {
		const data  = {
			StartTime: this.BeginTime,
			EndTime: this.EndTime,
			Building: buildData.materielVal[this.type].Building,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};

		this.service.serviceR('ent/materialstock/6311', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.MaterialStocks;
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	getBeginTime(data: string) {
		this.BeginTime = data;
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}

	goEdit(el) {
		sessionStorage.setItem('materielDetailItem', JSON.stringify(el));
		this.router.navigate(['index/' + this.type + 'stockdetail/edit']);
	}

}
