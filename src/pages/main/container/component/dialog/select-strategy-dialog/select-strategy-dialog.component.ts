import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

export interface DialogData {
    type: string;
    buildingSeq: any;
}

@Component({
    selector: 'app-select-strategy-dialog',
    templateUrl: './select-strategy-dialog.component.html',
    styleUrls: ['./select-strategy-dialog.component.scss'],
})
export class SelectStrategyDialogComponent implements OnInit {
    searchName: string;
    list: any = [];
    selectList: any = [];
    type: string;
    PageIndex: number;
    PageSize: number;
    displayedColumns: string[];
    paginatorTotal: number;
    item: any;
    constructor(
        private service: Service,
        public dialogRef: MatDialogRef<SelectStrategyDialogComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        // console.log(data);
        this.PageIndex = 1;
        this.PageSize = 10;
        this.displayedColumns = ['select', 'group'];
    }

    ngOnInit() {
        this.getList();
    }

    search() {
        this.PageIndex = 1;
        this.PageSize = 10;
        this.getList();
    }

    getList() {
        const data = {
            Name: this.searchName,
            State: 0,
            PageIndex: this.PageIndex,
            PageSize: this.PageSize
        };

        this.service.serviceR('ent/strategy/17011', data, (res: any) => {
          if (res.ResultCode === 0) {
            this.list = res.Result.List;

            this.paginatorTotal = res.Result.Total;

            this.list.forEach(item => {
                this.selectList.forEach(item2 => {
                    item.Seq === item2.Seq ? item.check = true : item.Seq = item.Seq;
                });
            });
            this.list.forEach(item => {
                this.getListGroup(item);
            });
          }
        });
    }

    getListGroup(item) {
        const data = {
            SSeq: item.Seq,
        };

        this.service.serviceR('ent/strategy/17005', data, (res: any) => {
          if (res.ResultCode === 0) {
              item.group = res.Result.List;
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
        el.check ? el.check = false : el.check = true;

        if (el.check) {
            this.selectList.push(el);
        } else {
            const index = this.selectList.findIndex(item => item.Seq === el.Seq);
            this.selectList.splice(index, 1);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirm(): any {
        this.dialogRef.close(this.selectList);
    }
}
