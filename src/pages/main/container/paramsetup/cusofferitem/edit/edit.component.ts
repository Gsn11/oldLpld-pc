import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { IEditList } from './iEdit.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { DeviceDialogComponent } from '../../../component/dialog/device-dialog/device-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  bemInfoData: any;
  customer: any;
  Item = new FormControl('', Validators.required);  // 用户名
  Price = new FormControl('', Validators.required);  // 用户名
  crumbsList: object;
  deviceSelect: any;
  deviceType: string;
  deviceName: string;
  priceType: number[];
  SelectPriceType: any;
  SubSystems: any;
  SelectSubSystems: any;
  constructor(
    private router: Router,
    private service: Service,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '服务预算管理', open: true, url: 'cusofferitem' },
      { name: '修改', open: false, url: '' }
    ];
    this.priceType = [0, 1, 2];
    this.SelectPriceType = new FormControl({
      value: this.bemInfoData.Type,
      disabled: false
    });
    this.SelectSubSystems = new FormControl({
      value: this.bemInfoData.Subsys,
      disabled: false
    });
    this.deviceType = null;
    this.deviceSelect = {
      DeviceName: this.bemInfoData.DeviceName,
      DeviceNo: this.bemInfoData.DeviceNo,
      Seq: this.bemInfoData.Device
    };
    this.deviceName = '请点击选择设备';
  }

  ngOnInit() {
    const data = {
      State: 0,
    };
    this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'SubSystems';
        this.SubSystems = res.Result[key];
      }
    });
    if (this.bemInfoData.Item !== '' || this.bemInfoData) {
      this.Item.setValue(this.bemInfoData.ItemName);
    }
    if (this.bemInfoData.Price !== 0 || this.bemInfoData.Price > 0) {
      this.Price.setValue(this.bemInfoData.Price);
    }
    if (this.deviceSelect.DeviceName) {
      this.deviceName = this.deviceSelect.DeviceName + ' - ' + this.deviceSelect.DeviceNo;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '1080px',
      data: { type: this.deviceType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deviceSelect = result;
        this.deviceName = result.DeviceName + ' - ' + result.DeviceNo + ' - ' + result.Model;
      } else {
        this.deviceSelect = null;
        this.deviceName = '请点击选择设备';
      }
    });
  }

  goback() {
    this.router.navigate(['index/cusofferitem']);
  }

  userSave() {
    if (!this.SelectSubSystems.value) {
      this.snackBar.open('请选择所属子系统', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    if (this.Item.errors) {
      this.Item.markAsTouched({
        onlySelf: true
      });
      return;
    }

    if (this.Price.errors) {
      this.Price.markAsTouched({
        onlySelf: true
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IEditList = {
      Subsys: this.SelectSubSystems.value,
      COISeq: this.bemInfoData.COISeq,
      Item: this.Item.value,
      ItemName: this.Item.value,
      Price: this.Price.value,
      Device: this.deviceSelect ? this.deviceSelect.Seq : '',
      Type: this.SelectPriceType.value
    };
    this.service.serviceR('ent/maintenance/8603', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('修改成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/cusofferitem']);
      }
    });
  }

  getItemErrorMessage() {
    return this.Item.hasError('required') ? '请输入报价条目' : '';
  }
  getPriceErrorMessage() {
    return this.Price.hasError('required') ? '请输入价格' : '';
  }
}
