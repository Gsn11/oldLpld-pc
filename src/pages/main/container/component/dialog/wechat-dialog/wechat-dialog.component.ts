import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    orderId: string;
    qrCode: string;
}

@Component({
    selector: 'app-wechat-dialog',
    templateUrl: './wechat-dialog.component.html',
    styleUrls: ['./wechat-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WechatDialogComponent {
    orderId: string;
    qrCode: string;
    constructor(
        public dialogRef: MatDialogRef<WechatDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.orderId = data.orderId;
        this.qrCode = data.qrCode;
        // console.log(this.orderId, this.qrCode);
        // console.log(data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
