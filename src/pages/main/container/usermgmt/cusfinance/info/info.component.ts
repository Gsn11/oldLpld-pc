import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  userPower: boolean;
  PriceList: any;
  MaintenanceOrderHis: any;
  MaintenanceActions: any;
  MaintenanceScheItems: any;
  constructor(
    private router: Router
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    // console.log(this.bemInfoData);
    this.userPower = false;
    this.setConfim = false;
    this.crumbsList = [
      { name: '用户权限', open: false },
      { name: '财务资金', open: true, url: 'cusfinance' },
      { name: '查看', open: false }
    ];
  }

  goback() {
    this.router.navigate(['index/cusfinance']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }
}
