import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IAddList } from './iAdd.interface';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  customer: number;
  crumbsList: object;
  DeviceNo: string;
  DeviceName: string;
  Protocol: any;  // 协议类型
  SelectProtocol: any;
  Devices: any;   //  设备
  SelectDevices: any;
  Modbus: any;  // Modbus路由
  SelectModbus: any;
  BacnetObjects: any;  //  网关在Bacnet中的设备Id
  SelectBacnetObjects: any;
  AuthType: any;
  SelectAuthType: any; // 用户审核模式
  SecurityMode: any;
  SelectSecurityMode: any; // 安全模式(SecurityMode)
  AgreementType: any;
  SelectAgreementType: any; // 安全策略(SecurityPolicy)
  ObjectId: string;
  AgreementIPOrURL: string;
  AgreementPort: number;
  AgreementUserName: string;
  AgreementPwd: string;
  Qos: number = null;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.SelectProtocol = new FormControl('');
    this.Protocol = [
      { name: 'BACNET', id: '0' },
      { name: 'MODBUS', id: '1' },
      { name: 'OPC DA', id: '2' },
      { name: 'OPC UA', id: '3' },
      { name: 'OBIX', id: '4' },
      { name: 'BEM', id: '5' },
      { name: 'MQTT', id: '6' },
    ];
    this.SelectDevices = new FormControl('');
    // Bacnet 协议中默认定义为device类型，默认，默认，默认！
    this.SelectBacnetObjects = new FormControl({
      value: 'device',
      disabled: true
    });
    this.SelectModbus = new FormControl('');
    this.crumbsList = [
      { name: 'IOT管理', open: false, url: '' },
      { name: '智联网关', open: false, url: '' },
      { name: 'IOT协议设置', open: true, url: 'gatewayprotocol' },
      { name: '新增', open: false, url: '' },
    ];
    this.AuthType = [
      { id: '0', name: 'NONE' },
      { id: '1', name: 'UsernameAndPassword' },
      { id: '2', name: 'Certificate' },
      { id: '3', name: 'IssuedToken' },
    ];
    this.SelectAuthType = new FormControl('');
    this.SecurityMode = [
      { id: '0', name: 'NONE' },
      { id: '1', name: 'Sign' },
      { id: '2', name: 'SignAndEncrypt' },
    ];
    this.SelectSecurityMode = new FormControl('');
    this.AgreementType = [
      { id: '0', name: 'NONE' },
      { id: '1', name: 'BASIC128RSA15' },
      { id: '2', name: 'BASIC256' },
      { id: '2', name: 'BASIC256SHA256' },
    ];
    this.SelectAgreementType = new FormControl('');
    this.ObjectId = null;
    this.AgreementIPOrURL = null;
    this.AgreementPort = null;
    this.AgreementUserName = '';
    this.AgreementPwd = '';
  }

  ngOnInit() {
    const devicesData = {
      Customer: this.customer,
      State: 0,
      MainType: 2
    };
    this.service.serviceR('ent/device/6001', devicesData, (res: any) => {
      if (res.ResultCode === 0) {
        this.Devices = res.Result.Devices;
      }
    });
    const ModbusData = {
      Customer: this.customer,
      State: 0,
      MainType: 1
    };
    this.service.serviceR('ent/device/6001', ModbusData, (res: any) => {
      if (res.ResultCode === 0) {
        this.Modbus = res.Result.Devices;
      }
    });
    const data = {
      State: 0
    };
    this.service.serviceR('ent/params/bacnetobject/11101', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.BacnetObjects = res.Result.BacnetObjects;
      }
    });
  }

  protocolChange() {
    this.ObjectId = null;
  }

  goback() {
    this.router.navigate(['index/gatewayprotocol']);
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
    if (!this.SelectProtocol.value) {
      this.snackBar.open('请选择协议类型', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (this.AgreementIPOrURL === '') {
      this.snackBar.open('请输入对应协议主机IP或url', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    const data: IAddList = {
      Device: this.SelectDevices.value,  // 智联网关Seq
      Ip: this.AgreementIPOrURL,  //  对应协议主机IP或url
      ObjectId: this.ObjectId,  // 网关在Bacnet中的设备Id, Modbus路由地址（id）, 服务clsid, 服务endpoint url, 服务的根url, 项目ID
      Protocol: this.SelectProtocol.value, // 协议类型
      Pwd: this.AgreementPwd,  // 对应协议密码
      User: this.AgreementUserName,  // 对应协议用户名
    };
    Reflect.set(data, 'SmartDev', null);
    if (this.SelectProtocol.value === '0') {
      if (!this.ObjectId) {
        this.snackBar.open('请输入网关在Bacnet中的设备Id', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
      Reflect.set(data, 'ObjectId', 'device ' + this.ObjectId);
    } else if (this.SelectProtocol.value === '1') {
      if (!this.SelectModbus.value) {
        this.snackBar.open('请选择Modbus路由', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
      if (!this.ObjectId) {
        this.snackBar.open('请输入Modbus路由地址（id）', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      } else if (parseInt(this.ObjectId, null) < 1 || parseInt(this.ObjectId, null) > 247) {
        this.snackBar.open('请输入Modbus路由地址（id）必须是1~247的数字', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
      Reflect.set(data, 'SmartDev', this.SelectModbus.value);
    } else if (this.SelectProtocol.value === '2') {
      if (!this.ObjectId) {
        this.snackBar.open('请输入服务clsid', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
    } else if (this.SelectProtocol.value === '3') {
      if (!this.ObjectId) {
        this.snackBar.open('请输入服务endpoint url', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
      if (this.SelectAuthType.value) {
        Reflect.set(data, 'AuthType', this.SelectAuthType.value);
      }
      if (this.SelectSecurityMode.value) {
        Reflect.set(data, 'SecurityMode', this.SelectSecurityMode.value);
      }
      if (this.SelectAgreementType.value) {
        Reflect.set(data, 'SecurityPolicy', this.SelectAgreementType.value);
      }
    } else if (this.SelectProtocol.value === '4') {
      if (!this.ObjectId) {
        Reflect.set(data, 'ObjectId', '/obix/config/Drivers');
      }
    } else if (this.SelectProtocol.value === '5') {
      if (!this.ObjectId) {
        this.snackBar.open('请填写项目ID', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
      // BEM Agreement no action
    } else if (this.SelectProtocol.value === '6') {
      // Qos Agreement no action now
      // This is test program code, Not use code
      Reflect.set(data, 'Qos', this.Qos);
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    if (this.AgreementPort) {
      Reflect.set(data, 'Port', this.AgreementPort);
    }
    // console.log(data);
    this.service.serviceR('ent/iot/gatewayprotocol/11802', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/gatewayprotocol']);
      }
    });
  }
}
