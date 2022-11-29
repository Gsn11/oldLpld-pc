import { Component, Input, Output, EventEmitter, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from '../../../../service/service';
import { ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';

declare var BimfaceSDKLoaderConfig: any;
declare var BimfaceSDKLoader: any;
declare var Glodon;

export interface DialogData {
  deviceseq: any;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-warehouseOut',
  templateUrl: './warehouseOut.component.html',
  styleUrls: ['./warehouseOut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarehouseOutComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  stateSelect: any;
  stateList: object;
  Remark: any;
  udata: DialogData;
  constructor(
    private dialogRef: MatDialogRef<WarehouseOutComponent>,
    private snackBar: MatSnackBar,
    private service: Service,
    private el: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.stateSelect = new FormControl('');
    this.udata = data;
    this.stateList = [
      { value: '库存', state: 0 },
      { value: '使用中', state: 1 },
      { value: '报废', state: 2 },
    ];
    this.stateSelect.setValue(1);
  }

  ngOnInit() {
    console.log(this.udata);
  }

  save() {
    const data = {
      DSeq: this.udata.deviceseq,
      Stat: this.stateSelect.value,
      Remark: this.Remark
  };
    console.log(data);
    this.service.serviceR('ent/device/6003', data, (res: any) => {
      console.log(res);
      if (res.ResultCode === 0) {
        this.dialogRef.close();
      }
  });
  }
  onNoClick(): void {
    console.log('nihao');
    this.dialogRef.close();
}
}
