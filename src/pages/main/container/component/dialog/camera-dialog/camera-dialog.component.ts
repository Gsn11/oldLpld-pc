import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
	State: number;
	BSeqs: number | string;
	UserType: number;
	subjection?: number | string;
	title?: string;
	multiple: any;
}

@Component({
	selector: 'app-camera-dialog',
	templateUrl: './camera-dialog.component.html',
	styleUrls: ['./camera-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraDialogComponent implements OnInit {
	checkAll = false; // 是否全选
	searchName: string = null;
	list: any = null;
	PageIndex: number;
	PageSize: number;
	displayedColumns: string[];
	paginatorTotal: number;
	checkList = []; // 选中的列
	multiple = true; // 是否多选
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<CameraDialogComponent>,
		private cdr: ChangeDetectorRef
	) {
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['select', 'code', 'name', 'type'];
		this.paginatorTotal = null;
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		const data = {};
		// console.log(data);
		this.requestService.request('hikvision/cameras', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.checkList.forEach(item => {
							res.Result.Users.forEach(item2 => {
								item.Seq === item2.Seq ? item2.check = true : item.check = false;
							});
						});

						this.list = new MatTableDataSource(res.Result.list);
						this.paginatorTotal = res.Result.total;
						this.cdr.markForCheck();
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
		if (!this.multiple) {
			this.list.data.forEach(item => item.check = false);
			this.checkList = [];
		}
		el.check = el.check ? false : true;
		this.checkListFn(el);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	checkAllFn() {
		if (this.checkAll) {
			this.list.data.forEach(item => {
				item.check = true;
				this.checkListFn(item);
			});
		} else {
			this.list.data.forEach(item => {
				item.check = false;
				this.checkListFn(item);
			});
		}
	}

	checkListFn(list) {
		if (list.check) {
			if (this.checkList.length === 0) {
				this.checkList.push(list);
			} else {
				const index = this.checkList.findIndex(item => item.cameraIndexCode === list.cameraIndexCode);
				if (index === -1) {
					this.checkList.push(list);
				}
			}
		} else {
			const index = this.checkList.findIndex(item => item.cameraIndexCode === list.cameraIndexCode);
			this.checkList.splice(index, 1);
		}
	}
}
