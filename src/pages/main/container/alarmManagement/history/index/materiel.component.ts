import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'app-materiel',
	templateUrl: './materiel.component.html',
	styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {
	crumbsList: any;
  radioSelect = 1;
	radio = '';
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 0;
	alarmInfo = false;
	CommonSearch = '';
	BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期

	displayedColumns = ['materiel', 'inOut', 'num', 'unitPrice', 'operate'];
	gradeList  = [];
  buildingType: any;
	elementInfo:any = [];
	warningName = '';
	type: any;

	list: any = [];

	constructor(
		public route: ActivatedRoute,
		public dialog: MatDialog,
		private service: Service,
		private router: Router
	) {
		this.buildingType = new FormControl('');
		route.data.subscribe(res => {
			res.type ? this.type = res.type : this.type = '';
		});
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '报警管理', open: false },
			{ name: '历史报警记录', open: false }
		];

    this.grade();
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
			Level: this.buildingType.value ? this.buildingType.value : null,
			Templates: null,
			Seqs: null,
			CommonSearch: this.CommonSearch,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};
		this.service.serviceR('smsalert/22001', data, (res: any) => {
			if (res.ResultCode === 0) {
				for ( const i of res.Result.List) {
					const names = []; const phones = []; const ids = [];
					for ( const j of i.Users) {
						names.push(j.UName);
						phones.push(j.Tel);
					}
					i.names = names.join();
					i.phones = phones.join();
				 }
				this.list = res.Result.List;
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	// 报警等级
	grade() {
		const data = {
			State: 0
		};
		this.service.serviceR('ent/params/alertlevel/11611', data, (res: any) => {
			if (res.ResultCode === 0) {
					const key = 'DevAlertLevels';
					this.gradeList = res.Result[key];
			}
	});
	}

	//查看详情
	lookInfo(v){
		this.alarmInfo = true;
		this.elementInfo = v;
	}

	getBeginTime(data: string) {
		this.BeginTime = data+' 00:00:00';
	}

	getEndTime(data: string) {
		this.EndTime = data+' 23:59:59';
	}


}
