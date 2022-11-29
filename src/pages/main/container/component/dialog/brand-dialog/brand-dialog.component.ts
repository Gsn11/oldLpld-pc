import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Service } from '../../../../../service/service';
import { MatDialogRef } from '@angular/material';

// export interface DialogData {
//     type: string;
// }

@Component({
    selector: 'app-brand-dialog',
    templateUrl: './brand-dialog.component.html',
    styleUrls: ['./brand-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandDialogComponent implements OnInit {
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
        public dialogRef: MatDialogRef<BrandDialogComponent>,
        private service: Service
        // @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        // console.log(data);
        this.selectSeq = null;
        // this.type = data.type;
        this.list = null;
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['BRName', 'Img', 'Proposer'];
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
        this.service.serviceR('ent/params/brand/10011', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.list = res.Result.Brands;
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
        this.selectSeq = el.BRSeq;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
