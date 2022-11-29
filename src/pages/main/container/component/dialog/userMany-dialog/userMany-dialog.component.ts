import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
	title?: string;
	State: number;
	BSeqs?: number | string;
	UserType?: number;
	subjection?: number | string;
}

export interface ListData {
	LoginId: string;
	Name: string;
	UserTel: string;
	IsAdmin: boolean;
	UserEmail: string;
}

@Component({
	selector: 'app-usermany-dialog',
	templateUrl: './usermany-dialog.component.html',
	styleUrls: ['./usermany-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManyDialogComponent implements OnInit {
	searchName: string = null;
	list: any = null;
	selectSeq: number;
	uData: DialogData;
	PageIndex: number;
	PageSize: number;
	displayedColumns: string[];
	paginatorTotal: number;
	item: any;
	title: string;
	selection: any;
	Teams: any = null;
	SelectTeams = new FormControl('');
	Jobs: any = null;
	SelectJobs = new FormControl('');
	perList: any = [];
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<UserManyDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private cdr: ChangeDetectorRef
	) {
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
		this.selection = new SelectionModel<ListData>(true, []);
		this.getList();
		this.getTeamList();
		this.getJobList();
	}

	getList() {
		const data = {
			pageIndex: this.PageIndex,
			pageSize: this.PageSize,
			...this.uData
		};
		if (this.searchName) {
			Reflect.set(data, 'CommonSearch', this.searchName);
		} else {
			Reflect.set(data, 'CommonSearch', '');
		}
		if (this.SelectTeams.value) {
			Reflect.set(data, 'Team', this.SelectTeams.value);
		}
		if (this.SelectJobs.value) {
			Reflect.set(data, 'Job', this.SelectJobs.value);
		}
		this.requestService.request('ent/cususer/4611', data)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						res.Result.Users.forEach((item, index) => {
							this.selection.selected.forEach(item2 => {
								if ( item.Seq === item2.Seq) {
									res.Result.Users[index] = item2;
								}
							});
						});
						this.list = new MatTableDataSource(res.Result.Users);
						this.paginatorTotal = res.Result.Total;
						this.cdr.markForCheck();
					}
				},
				(error) => {
					// console.error(error);
				}
			);
	}

	check(row) {
		this.selection.toggle(row);
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

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.list.data.length;
		return numSelected === numRows;
	}

	// 分页修改时响应方法
	change(event: any) {
		this.PageIndex = event.pageIndex + 1;
		this.PageSize = event.pageSize;
		this.getList();
	}

	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.list.data.forEach((row: ListData) => this.selection.select(row));
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
