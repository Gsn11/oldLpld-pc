import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
// import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
	State: number;
	BSeqs: number | string;
	subjection?: number | string;
	title?: string;
	multiple: any;
}

@Component({
	selector: 'app-user-dialog',
	templateUrl: './user-dialog.component.html',
	styleUrls: ['./user-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
	checkAll = false; // 是否全选
	searchName: string = null;
	list: any = null;
	selectSeq: number;
	uData: DialogData;
	PageIndex: number;
	PageSize: number;
	displayedColumns: string[];
	paginatorTotal: number;
	item: any;
	title = '工作人员选择';
	Teams: any = null;
	SelectTeams = [];
	Jobs: any = null;
	SelectJobs = new FormControl('');
	selection: any;
	checkList = []; // 选中的列
	multiple = true; // 是否多选
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<UserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private cdr: ChangeDetectorRef
	) {
		if (data.multiple === false) {
			this.multiple = data.multiple;
		}
		this.selectSeq = null;
		this.uData = data;
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['select', 'LoginId', 'Name', 'UserTel', 'UserEmail'];
		this.paginatorTotal = null;
		this.item = null;
		this.title = this.uData.title;
	}

	ngOnInit() {
		this.getList();
		this.getTeamList();
		this.getJobList();
	}

	getList() {
		const data = this.uData;
		Reflect.set(data, 'PageIndex', 1);
		Reflect.set(data, 'PageSize', 9999);
		if (this.searchName) {
			Reflect.set(data, 'CommonSearch', this.searchName);
		} else {
			Reflect.set(data, 'CommonSearch', '');
		}
		if (this.SelectTeams) {
			Reflect.set(data, 'Team', this.SelectTeams.toString());
		}
		if (this.SelectJobs.value) {
			Reflect.set(data, 'Job', this.SelectJobs.value == 0 ? '' : this.SelectJobs.value);
		}
		console.log(data);
		this.requestService.request('ent/cususer/4611', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.checkList.forEach(item => {
							res.Result.Users.forEach(item2 => {
								item.Seq === item2.Seq ? item2.check = true : item.check = false;
							});
						});

						this.list = new MatTableDataSource(res.Result.Users);
						this.paginatorTotal = res.Result.Total;
						// this.selection = new SelectionModel(true, []);
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
		this.item = el;
		this.selectSeq = el.Seq;
		this.checkListFn(el);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	getTeamList() {
		const data = {
			State: 0
		};
		this.requestService.request('ent/params/team/10101', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.Teams = res.Result.Teams;
					}
				},
				(error) => {
					// console.error(error);
				}
			);
	}

	getJobList() {
		const data = {
			State: 0
		};
		this.requestService.request('ent/params/job/10701', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.Jobs = res.Result.Jobs;
					}
				},
				(error) => {
					// console.error(error);
				}
			);
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
				const index = this.checkList.findIndex(item => item.Seq === list.Seq);
				if (index === -1) {
					this.checkList.push(list);
				}
			}
		} else {
			const index = this.checkList.findIndex(item => item.Seq === list.Seq);
			this.checkList.splice(index, 1);
		}
	}
}
