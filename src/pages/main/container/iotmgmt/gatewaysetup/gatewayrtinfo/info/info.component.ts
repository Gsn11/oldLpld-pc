import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  bemInfoData: any;
  crumbsList: object;
  region: object;
  constructor(
    private router: Router
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.region = {
      ProvinceCode : this.bemInfoData.ProvinceCode,
      CityCode: this.bemInfoData.CityCode,
      DistrictCode: this.bemInfoData.DistrictCode
    };
    this.crumbsList = [
      { name: 'IOT管理', open: false },
      { name: '智联网关', open: false },
      { name: '智联网关在线', open: true, url: 'gatewayrtinfo' },
      { name: '查看', open: false }
  ];
  }

  goback() {
    this.router.navigate(['index/gatewayrtinfo']);
  }
}
