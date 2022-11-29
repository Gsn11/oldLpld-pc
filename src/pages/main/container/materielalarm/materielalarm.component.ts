import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadFile } from '../../../common/utils/js/downloadfile';
import { Service } from '../../../service/service';

@Component({
	selector: 'app-materielalarm',
	templateUrl: './materielalarm.component.html',
	styleUrls: ['./materielalarm.component.scss']
})
export class MaterielalarmComponent implements OnInit {
	crumbsList: any = [];
	displayedColumns: any = ['index', 'model', 'id', 'name', 'surplus', 'unit']; // 列表要显示的项
	searchVal = ''; // 搜索值
	list = [];
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	constructor(
		private service: Service,
		private router: Router
	) {
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '物料报警', open: false }
		];

		this.getList();
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	// 物料导出
	materielExpot() {
		new DownloadFile({ CommonSearch: this.searchVal, is_alarm: true, Stat: '0,1' }, 'ent/material/6205').downloadfile();
	}

	// 获取列表
	getList() {
		const data = {
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
			CommonSearch: this.searchVal,
			// Stat: '0,1',
			is_alarm: true // 有传这个参数就是查库存报警
		};


		this.service.serviceR('ent/material/6211', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.Materials;
			}
		});
	}
}
