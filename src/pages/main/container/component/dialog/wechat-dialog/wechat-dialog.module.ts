import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WechatDialogComponent } from './wechat-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        QRCodeModule
    ],
    declarations: [
        WechatDialogComponent
    ],
    exports: [
        WechatDialogComponent
    ],
    entryComponents: [ WechatDialogComponent ]
})

export class WechatDialogModule {}
