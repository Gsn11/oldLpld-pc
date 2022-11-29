import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Service } from '../../../../../service/service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-facturer-dialog',
    templateUrl: './facturer-dialog.component.html',
    styleUrls: ['./facturer-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacturerDialogComponent implements OnInit {
    searchName: string;
    list: any;
    selectSeq: number;
    type: string;
    PageIndex: number;
    PageSize: number;
    displayedColumns: string[];
    paginatorTotal: number;
    item: any;
    constructor(
        public dialogRef: MatDialogRef<FacturerDialogComponent>,
        private service: Service
    ) {
        this.selectSeq = null;
        this.list = null;
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['FName', 'FLocalName', 'Province', 'City', 'District', 'Addr'];
        this.paginatorTotal = null;
        this.item = null;
        this.searchName = '';
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const data = {
            CommonSearch: this.searchName,
            State: 0,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
        };
        this.service.serviceR('ent/params/facturer/10611', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = res.Result.Facturers;
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
        this.selectSeq = el.FSeq;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
