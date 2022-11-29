import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface DialogData {
	time: any;
	State: number;
	BSeqs: number | string;
	UserType: number;
	subjection?: number | string;
	title?: string;
}

@Component({
	selector: 'app-scheduling-dialog',
	templateUrl: './scheduling-dialog.component.html',
	styleUrls: ['./scheduling-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulingDialogComponent implements OnInit {
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
	SelectTeams = new FormControl('');
	Jobs: any = null;
	SelectJobs = new FormControl('');
	Time: any;
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<SchedulingDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private cdr: ChangeDetectorRef
	) {
		this.selectSeq = null;
		this.uData = data;
		this.PageIndex = 1;
		this.PageSize = 10;
		this.displayedColumns = ['Name', 'TeamTime', 'Type', 'ValidStart'];
		this.paginatorTotal = null;
		this.item = null;
		this.title = this.uData.title;
		this.Time = data.time;
	}

	ngOnInit() {
		this.getList();
	}
	showConfim(e) {
		const name1 = (e[0].Weekday0 === 1 ? '周日' : '');
		const name2 = (e[0].Weekday1 === 1 ? '周一' : '');
		const name3 = (e[0].Weekday2 === 1 ? '周二' : '');
		const name4 = (e[0].Weekday3 === 1 ? '周三' : '');
		const name5 = (e[0].Weekday4 === 1 ? '周四' : '');
		const name6 = (e[0].Weekday5 === 1 ? '周五' : '');
		const name7 = (e[0].Weekday6 === 1 ? '周六' : '');
		return name1 + name2 + name3 + name4 + name5 + name6 + name7;
	}
	getList() {
		console.log(this.uData);
		const da = {
			State: '0',
			Time: this.Time,
			PageIndex: '1',
			PageSize: '10'
		};
		// const data = this.uData;
		// if (this.searchName) {
		//     Reflect.set(data, 'CommonSearch', this.searchName);
		// } else {
		//     Reflect.set(data, 'CommonSearch', '');
		// }
		// if (this.SelectTeams.value) {
		//     Reflect.set(data, 'Team', this.SelectTeams.value);
		// }
		// if (this.SelectJobs.value) {
		//     Reflect.set(data, 'Job', this.SelectJobs.value);
		// }
		console.log(da);
		this.requestService.request('workteam/14011', da)
			.subscribe(
				(res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						this.list = new MatTableDataSource(res.Result.List);
						// this.paginatorTotal = res.Result.Total;
						// this.cdr.markForCheck();
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
		this.item = el;
		this.selectSeq = el.Seq;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
