import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { DeviceDialogComponent } from '../../../component/dialog/device-dialog/device-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  customer: any;
  userInfo: any;
  crumbsList: object;
  Item = new FormControl('', Validators.required);  // 用户名
  Price = new FormControl('', Validators.required);  // 用户名
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
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '服务预算管理', open: true, url: 'cusofferitem' },
      { name: '新增', open: false, url: '' }
    ];
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.priceType = [0, 1, 2];
    this.SelectPriceType = new FormControl({
      value: 0,
      disabled: false
    });
    this.SelectSubSystems = new FormControl('');
    this.deviceSelect = null;
    this.deviceName = '请点击选择设备';
    this.deviceType = null;
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
    const data: IAddList = {
      Subsys: this.SelectSubSystems.value,
      Item: this.Item.value,
      Price: this.Price.value,
      Device: this.deviceSelect ? this.deviceSelect.Seq : '',
      Type: this.SelectPriceType.value
    };
    this.service.serviceR('ent/maintenance/8602', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
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
