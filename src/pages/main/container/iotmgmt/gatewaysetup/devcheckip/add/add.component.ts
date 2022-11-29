import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { DeviceDialogComponent } from '../../../../component/dialog/device-dialog/device-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  crumbsList: object;
  deviceInfo: any;
  Devices: any;
  SelectDevices: any;
  Ip: string;
  Port: number;
  Id: string;
  deviceSelect: any;
  deviceType: string;
  deviceName: string;
  constructor(
    private router: Router,
    private service: Service,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.deviceInfo = JSON.parse(localStorage.getItem('bemDevice'));
    this.SelectDevices = new FormControl('');
    this.crumbsList = [
      { name: 'IOT管理', open: false, },
      { name: '智联网关', open: false, },
      { name: 'IP设备监测管理', open: true, url: 'devcheckip' },
      { name: '新增', open: false, }
    ];
    this.Ip = null;
    this.Port = null;
    this.Id = null;
    this.deviceSelect = null;
    this.deviceName = '请点击选择设备';
    this.deviceType = '1';
  }

  ngOnInit() {
    const gatewayDeviceData = {
      State: 0,
      MainType: '2',
      NeedShare: 1
    };
    this.service.serviceR('ent/device/6001', gatewayDeviceData, (res: any) => {
      if (res.ResultCode === 0) {
        this.Devices = res.Result.Devices;
        if (this.deviceInfo) {
          this.SelectDevices.setValue(this.deviceInfo.DeviceNo);
        }
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
    this.router.navigate(['index/devcheckip']);
  }

  userSave() {
    if (!this.SelectDevices.value) {
      this.snackBar.open('请选择智联网关', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (!this.deviceSelect) {
      this.snackBar.open('请选择被监控设备', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (this.Ip === '' || this.Ip === null) {
      this.snackBar.open('请输入Ip', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (this.Port === null) {
      this.snackBar.open('请输入端口', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IAddList = {
      DevNo: this.deviceSelect.DeviceNo,
      DevpcNo: null,
      GatewayNo: this.SelectDevices.value,
      Id: this.Id,
      Ip: this.Ip,
      Port: this.Port
    };
    this.service.serviceR('ent/checkip/12002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/devcheckip']);
      }
    });
  }
}
