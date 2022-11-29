import { Component, OnInit, Inject } from '@angular/core';
import { Service } from '../../../../../service/service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import buildData from '../../../../../../environments/buildType';

export interface DialogData {
	type: string;
}

@Component({
	selector: 'app-devicemodel-dialog',
	templateUrl: './devicemodel-dialog.component.html',
	styleUrls: ['./devicemodel-dialog.component.scss'],
})
export class DevicemodelDialogComponent implements OnInit {
	searchName: string;
	list: any;
	selectSeq: number;
	type: string;
	PageIndex: number;
	PageSize: number;
	displayedColumns: string[];
	paginatorTotal: number;
	item: any;
	buildData: any;
	constructor(
		public dialogRef: MatDialogRef<DevicemodelDialogComponent>,
		private service: Service,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		// console.log(data);
		this.selectSeq = null;
		this.type = data.type;
		this.list = null;
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['DTName', 'DMName', 'Id', 'BRName'];
		this.paginatorTotal = null;
		this.item = null;
		this.searchName = '';

		this.buildData = buildData;
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		const data = {
			CommonSearch: this.searchName,
			Stat: '0',
			PageIndex: this.PageIndex,
			PageSize: this.PageSize,
			MainType: localStorage.getItem('crumbsName') === '配件管理' ? '3' : this.type
		};
		console.log(data);
		this.service.serviceR('ent/devicemodel/6111', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.DeviceModels;
				// console.log(this.list);
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	// 分页修改时响应方法
	change(event: any) {
		this.PageIndex = event.pageIndex + 1;
		this.PageSize = event.pageSize;
		this.getList();
	}

	choose(el: any) {
		this.item = el;
		this.selectSeq = el.DMSeq;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
