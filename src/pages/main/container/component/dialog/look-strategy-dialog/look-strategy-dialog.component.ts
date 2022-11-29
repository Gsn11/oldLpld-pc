import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-look-strategy-dialog',
    templateUrl: './look-strategy-dialog.component.html',
    styleUrls: ['./look-strategy-dialog.component.scss'],
})
export class LookStrategyDialogComponent implements OnInit {
    displayedColumns: any[] = ['name', 'variable', 'formula'];
    pageData: any;

    constructor(
        public dialogRef: MatDialogRef<LookStrategyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.pageData = data;
        console.log(data);
    }

    ngOnInit() {
    }

    // 分页修改时响应方法
    change(event: any) {
    }

    choose(el: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
