import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IEditList } from './iEdit.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { DeviceDialogComponent } from '../../../../component/dialog/device-dialog/device-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userInfo: any;
  bemInfoData: any;
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
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    // console.log(this.bemInfoData);
    this.SelectDevices = new FormControl({
      value: this.bemInfoData.GatewayNo,
      disabled: false
    });
    this.crumbsList = [
      { name: 'IOT管理', open: false, },
      { name: '智联网关', open: false, },
      { name: 'IP设备监测管理', open: true, url: 'devcheckip' },
      { name: '修改', open: false, }
    ];
    this.Ip = this.bemInfoData.Ip;
    this.Port = this.bemInfoData.Port;
    this.Id = this.bemInfoData.Id;
    this.deviceType = null;
    this.deviceSelect = {
      DeviceName: this.bemInfoData.DevName,
      DeviceNo: this.bemInfoData.DevNo,
      Seq: this.bemInfoData.DevSeq
    };
    // console.log(this.deviceSelect);
    this.deviceName = '请点击选择设备';
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
      }
    });
    if (this.deviceSelect.DeviceName) {
      this.deviceName = this.deviceSelect.DeviceName + ' - ' + this.deviceSelect.DeviceNo;
    }
  }

  goback() {
    this.router.navigate(['index/devcheckip']);
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
    const data: IEditList = {
      Seq: this.bemInfoData.Seq,
      DevNo: this.deviceSelect.DeviceNo,
      DevpcNo: null,
      GatewayNo: this.SelectDevices.value,
      Id: this.Id,
      Ip: this.Ip,
      Port: this.Port
    };
    this.service.serviceR('ent/checkip/12003', data, (res: any) => {
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
