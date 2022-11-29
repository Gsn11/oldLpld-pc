import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  userPower: boolean;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    this.crumbsList = [
      { name: 'IOT管理', open: false, },
      { name: '智联网关', open: false, },
      { name: '监测点管理', open: true, url: 'devmetric' },
      { name: '查看', open: false, }
    ];
  }

  goback() {
    this.router.navigate(['index/devmetric']);
  }

  gotoEdit() {
    this.router.navigate(['index/devmetric/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      let pLink: string;
      switch (this.bemInfoData.Protocol) {
        case 'BACNET': pLink = 'ent/iot/metricsbacnet/11504'; break;
        case 'MODBUS': pLink = 'ent/iot/metricsmodbus/11604'; break;
        case 'OPC': pLink = 'ent/iot/metricsopc/11704'; break;
        case 'OBIX': pLink = 'ent/iot/metricsobix/11404'; break;
        case 'Bem': pLink = 'ent/iot/metricsbem/11904'; break;
      }
      this.service.serviceR(pLink, { Seq: this.bemInfoData.Seq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/devmetric']);
        }
      });
    }
  }
}
