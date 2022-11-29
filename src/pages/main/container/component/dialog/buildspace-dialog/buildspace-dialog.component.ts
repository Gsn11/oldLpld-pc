import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Service } from '../../../../../service/service';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
    type: string;
}

export interface ListData {
    BuildingName: string;
    CName: string;
    Floor: string;
    Zone: string;
    SpacePos: string;
    BSSeq: number;
    Building: number;
    CityPriceVisit: number;
    DistrictPriceVisit: number;
    ProvincePriceVisit: number;
}

@Component({
    selector: 'app-buildspace-dialog',
    templateUrl: './buildspace-dialog.component.html',
    styleUrls: ['./buildspace-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildspaceDialogComponent implements OnInit {
    searchName: string;
    list: any;
    selectSeq: number;
    type: string;
    PageIndex: number;
    PageSize: number;
    displayedColumns: string[];
    paginatorTotal: number;
    item: any;
    selection: any;
    feedbackName: string;
    feedback: any;
    SelectFeedbackType: any;
    constructor(
        private service: Service,
        public dialogRef: MatDialogRef<BuildspaceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.feedbackName = null;
        this.feedback = [
            { name: '布尔型', value: '0' },
            { name: '数值型', value: '1' },
            { name: '文本型', value: '2' },
        ];
        this.selectSeq = null;
        this.type = data.type;
        this.list = null;
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['select', 'BuildingName', 'Floor', 'Zone', 'SpacePos'];
        this.paginatorTotal = null;
        this.item = null;
        this.searchName = '';
        this.SelectFeedbackType = new FormControl({
            value: '0',
            disabled: false
        });
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            CommonSearch: this.searchName,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
            State: 0,
            NeedShare: 1
        };
        this.service.serviceR('ent/buildspace/monitor/5211', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = new MatTableDataSource(res.Result.BuildSpaces);
                this.selection = new SelectionModel<ListData>(true, []);
                this.paginatorTotal = res.Result.Total;
            }
        });
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
