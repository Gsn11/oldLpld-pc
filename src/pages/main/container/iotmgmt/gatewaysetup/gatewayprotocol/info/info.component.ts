import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  AuthType: string[];
  SecurityMode: string[];
  AgreementType: string[];
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.setConfim = false;
    this.crumbsList = [
      { name: 'IOT管理', open: false, url: '' },
      { name: '智联网关', open: false, url: '' },
      { name: 'IOT协议设置', open: true, url: 'gatewayprotocol' },
      { name: '查看', open: false, url: '' }
    ];
    this.AuthType = ['NONE', 'UsernameAndPassword', 'Certificate', 'IssuedToken'];
    this.SecurityMode = ['NONE', 'Sign', 'SignAndEncrypt'];
    this.AgreementType = ['NONE', 'BASIC128RSA15', 'BASIC256', 'BASIC256SHA256'];
  }

  goback() {
    this.router.navigate(['index/gatewayprotocol']);
  }

  gotoEdit() {
    this.router.navigate(['index/gatewayprotocol/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/iot/gatewayprotocol/11804', {
        Device: this.bemInfoData.DSeq,
        Protocol: this.bemInfoData.Protocol,
        ObjectId: this.bemInfoData.ObjectId
      }, (res: any) => {
        this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
        });
        this.router.navigate(['index/gatewayprotocol']);
      });
    }
  }
}
