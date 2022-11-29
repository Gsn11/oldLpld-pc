import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimeCompare } from '../../../../../../common/utils/js/timeCompare';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoAlarmComponent {
  bemInfoData: any;
  crumbsList: object;
  region: object;
  compareTime: string;
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
      { name: '报警管理', open: false },
      { name: '实时报警', open: false },
      { name: '查看', open: false, url: '' }
    ];
    this.compareTime = null;
  }

  goback() {
    this.router.navigate(['index/alertsms']);
  }

  gotoAdd() {
      localStorage.setItem('bemInfoData', JSON.stringify(this.bemInfoData));
      this.router.navigate(['index/alertsms/add']);
  }

  getTime() {
    return new TimeCompare(this.bemInfoData.duration).compare();
  }
}
