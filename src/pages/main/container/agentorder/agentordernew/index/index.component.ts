import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';

// declare var echarts: any;
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	providers: [Service]
})

export class IndexComponent implements OnInit {
	crumbsList: object;
	displayedColumns: any = ['index']; // 列表要显示的项
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	name = '';

	constructor(
		private router: Router,
		private service: Service
	) { }
	ngOnInit() {
		this.crumbsList = [
			// { name: '运维中心', open: false },
			{ name: '派单管理', open: false },
			{ name: '派单管理', open: false }
		];
	}


	addStrategygroup() {
		this.router.navigate(['index/agentordernew/add']);
	}

}
