import { Component, Input, Output, EventEmitter, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from '../../../../service/service';
import { ElementRef} from '@angular/core';
declare var BimfaceSDKLoaderConfig: any;
declare var BimfaceSDKLoader: any;
declare var Glodon;

export interface DialogData {
  title?: string;
  State: number;
  BSeqs?: number | string;
  UserType?: number;
  subjection?: number | string;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-threeD',
  templateUrl: './threeD.component.html',
  styleUrls: ['./threeD.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeDComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<ThreeDComponent>,
    private snackBar: MatSnackBar,
    private service: Service,
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

  }

  ngOnInit() {
    this.loadMap();
  }
  loadMap() {
    const loaderConfig = new BimfaceSDKLoaderConfig();
    // console.log(this.viewToken);
    loaderConfig.viewToken = '7d3e159473dc4ba3934ded70b623b53f';
    // 加载BIMFACE JSSDK加载器
    BimfaceSDKLoader.load(loaderConfig, this.successCallback, this.failureCallback);
  }
  successCallback(viewMetaData) {
    const that = this;
    // 创建WebApplication，直接显示模型或图纸
    const dom4Show = document.getElementById('domId');
    console.log(dom4Show);
    // tslint:disable-next-line:no-unused-expression
    new Glodon.Bimface.Application.WebApplicationDemo(viewMetaData, dom4Show);
  }
  // 加载失败回调函数
   failureCallback(error) {
      console.log(error);
    }
    onNoClick(): void {
      console.log('nihao');
      this.dialogRef.close();
  }
}
