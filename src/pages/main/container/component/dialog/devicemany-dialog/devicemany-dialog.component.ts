import { Component, OnInit, Inject} from '@angular/core';
import { Service } from '../../../../../service/service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
    type: string;
    buildingSeq: number | string;
    isParts: any;
}

export interface ListData {
    BuildingSeq: string;
    DeviceName: string;
    DeviceNo: string;
    Model: string;
    Facturer: string;
    Brand: string;
}


@Component({
    selector: 'app-devicemany-dialog',
    templateUrl: './devicemany-dialog.component.html',
    styleUrls: ['./devicemany-dialog.component.scss'],
})
export class DeviceManyDialogComponent implements OnInit {
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
    buildingSeq: number | string;
    isParts = false; // 是否查询部件
    constructor(
        public dialogRef: MatDialogRef<DeviceManyDialogComponent>,
        private service: Service,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.selectSeq = null;
        this.type = data.type;
        this.buildingSeq = data.buildingSeq;
        this.list = null;
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['select', 'DeviceName', 'DeviceNo', 'Model', 'Facturer'];
        this.paginatorTotal = null;
        this.item = null;
        this.searchName = '';
        data.isParts ? this.isParts = true : this.isParts = false;
    }

    ngOnInit() {
        this.getList();
    }
    search() {
        this.getList();
    }
    getList() {
        const data = {
            CommonSearch: this.searchName,
            PageIndex: 1,
            PageSize: 9999,
            Stat: '0,1',
            NeedShare: 1,
            MainType: '1,2'
        };

        if (this.isParts) {
            Reflect.set(data, 'MainType', 3);
            Reflect.set(data, 'SearchType', true);
        }

        console.log(data);

        if (this.buildingSeq !== null) {
            Reflect.set(data, 'Building', this.buildingSeq);
        }
        // if (this.type) {
        //     Reflect.set(data, 'MainType', '0,1');
        // }
        this.service.serviceR('ent/device/monitor/6011', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res);
                this.list = new MatTableDataSource(res.Result.Devices);
                // console.log(this.list);
                this.selection = new SelectionModel<ListData>(true, []);
                // console.log(this.selection);
                this.paginatorTotal = res.Result.Total;
            }
        });
        // const data = {
        //     CommonSearch: this.searchName,
        //     PageIndex: this.PageIndex,
        //     PageSize: this.PageSize,
        //     Stat: '0,1',
        //     NeedShare: 1
        // };
        // if (this.type) {
        //     Reflect.set(data, 'MainType', this.type);
        // }
        // // console.log(this.list);
        // this.service.serviceR('ent/device/6011', data)
        //     .subscribe(
        //         (res: any) => {
        //             if (res.ResultCode === 0) {
        //                 this.list = new MatTableDataSource(res.Result.Devices);
        //                 // this.list.paginator = this.paginator;
        //                 this.paginatorTotal = res.Result.Total;
        //                 // console.log(this.list);
        //             }
        //         },
        //         (error) => {
        //             // console.error(error);
        //         }
        //     );
    }

    // 分页修改时响应方法
    change(event: any) {
        this.PageIndex = event.pageIndex + 1;
        this.PageSize = event.pageSize;
        this.getList();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.list.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.list.data.forEach((row: ListData) => this.selection.select(row));
    }

    choose(el: any) {
        this.item = el;
        this.selectSeq = el.DMSeq;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}