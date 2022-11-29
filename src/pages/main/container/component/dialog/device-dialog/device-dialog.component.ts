import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

export interface DialogData {
	type: string;
	buildingSeq: any;
}

@Component({
	selector: 'app-device-dialog',
	templateUrl: './device-dialog.component.html',
	styleUrls: ['./device-dialog.component.scss'],
})
export class DeviceDialogComponent implements OnInit {
	searchName: string;
	list: any;
	selectSeq: number;
	type: string;
	PageIndex: number;
	PageSize: number;
	displayedColumns: string[];
	paginatorTotal: number;
	buildingSeq: any;
	item: any;
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<DeviceDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		// console.log(data);
		this.selectSeq = null;
		this.type = data.type;
		this.buildingSeq = data.buildingSeq;
		this.list = null;
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['DeviceName', 'DeviceNo', 'Model', 'Facturer'];
		this.paginatorTotal = null;
		this.item = null;
		this.searchName = '';
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		const data: any = {
			CommonSearch: this.searchName,
			PageIndex: this.PageIndex,
			PageSize: this.PageSize,
			Stat: '0,1',
			NeedShare: 1,
			MainType: '1,2'
		};

		if (this.buildingSeq) {
			// data.Building = this.buildingSeq;
		}
		// if (this.type) {
		//     Reflect.set(data, 'MainType', '0,1');
		// }
		// console.log(this.list);
		this.requestService.request('ent/device/monitor/6011', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.list = new MatTableDataSource(res.Result.Devices);
						// this.list.paginator = this.paginator;
						this.paginatorTotal = res.Result.Total;
						// console.log(this.list);
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
		this.selectSeq = el.Seq;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
