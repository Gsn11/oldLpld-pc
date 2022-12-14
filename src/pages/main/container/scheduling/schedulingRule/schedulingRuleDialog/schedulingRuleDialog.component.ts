import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface DialogData {
    State: number;
    BSeqs: number | string;
    UserType: number;
    subjection?: number | string;
    title?: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-schedulingRuleDialog',
    templateUrl: './schedulingRuleDialog.component.html',
    styleUrls: ['./schedulingRuleDialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulingRuleDialogComponent implements OnInit {
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
    Schedules: any;
    constructor(
        private requestService: RequestService,
        public dialogRef: MatDialogRef<SchedulingRuleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private cdr: ChangeDetectorRef
    ) {
        this.selectSeq = null;
        this.Schedules = data;
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['LoginId', 'Name', 'UserTel', 'UserEmail'];
        this.paginatorTotal = null;
        this.item = null;
        this.title = this.uData.title;
    }

    ngOnInit() {

    }

    getList() {
        const data = this.uData;
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
}
