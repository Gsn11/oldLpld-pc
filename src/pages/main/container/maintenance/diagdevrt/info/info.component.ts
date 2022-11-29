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
      { name: '运维中心', open: false, url: '' },
      { name: '设备实时状态', open: true, url: 'diagdevrt' },
      { name: '查看', open: false, url: '' }
    ];
  }
  valueInit(value: any) {
    // if (metric === 'device_online') {
    //     if (value === '1' || value === 1) {
    //         value = '正常';
    //     } else {
    //         value = '故障';
    //     }
    // }
    if (value === false) {
        value = '正常';
    } else if (typeof (value) === 'number') {
        value = value.toFixed(2);
    } else {
        value = '故障';
    }
    return value;
}
  goback() {
    this.router.navigate(['index/diagdevrt']);
  }
}
