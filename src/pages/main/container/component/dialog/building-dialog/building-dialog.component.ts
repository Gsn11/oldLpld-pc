import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import buildData from '../../../../../../environments/buildType';

export interface DialogData {
	type: string;
	buildSeq: any;
}

@Component({
	selector: 'app-building-dialog',
	templateUrl: './building-dialog.component.html',
	styleUrls: ['./building-dialog.component.scss'],
})
export class BuildingDialogComponent implements OnInit {
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
	buildSeq: any;
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<BuildingDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.selectSeq = null;
		this.type = data.type;
		this.buildSeq = data.buildSeq;
		this.list = null;
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['BuildingName', 'Floor', 'Zone', 'SpacePos'];
		this.paginatorTotal = null;
		this.item = null;
		this.searchName = '';

		this.buildData = buildData;

		if (buildData.buildType === '东南水厂') {
			this.displayedColumns = ['BuildingName', 'Zone'];
		}
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		const data: any = {
			CommonSearch: this.searchName,
			PageIndex: this.PageIndex,
			PageSize: this.PageSize,
			State: 0,
			NeedShare: 1
		};

		if (this.buildSeq) {
			data.BSeq = this.buildSeq;
		}

		this.requestService.request('ent/buildspace/monitor/5211', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.list = new MatTableDataSource(res.Result.BuildSpaces);
						this.paginatorTotal = res.Result.Total;
					}
				},
				(error) => {
					// console.error(error);
				}
			);
	}

	// 分页修改时响应方法
	change(event: any) {
		this.PageIndex = event.pageIndex + 1;
		this.PageSize = event.pageSize;
		this.getList();
	}

	choose(el: any) {
		// console.log(el);
		this.item = el;
		this.selectSeq = el.BSSeq;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
