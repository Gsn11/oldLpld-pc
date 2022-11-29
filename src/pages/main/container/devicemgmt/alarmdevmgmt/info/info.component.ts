import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  imgsrcData: object[] = [];
  userPower: boolean;
  MainType: number;
  GotoEdit: string;
  constructor( 
    private router: Router,
    private service: Service
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.crumbsList = [
      { name: '设备管理', open: false, url: '' },
      { name: '设备维保报警管理', open: true, url: 'devicealarm' },
      { name: '查看', open: false, url: '' }
    ];
  }

  ngOnInit() {
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      DSeq: this.bemInfoData.Seq,
      FromCache: false
    };
    this.service.serviceR('ent/device/6005', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'DeviceImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    this.router.navigate(['index/devicealarm']);
  }

  gotoOrderKeep() {
    localStorage.setItem('bemDevicealarmData', JSON.stringify(this.bemInfoData));
    this.router.navigate(['index/schedulekeep/add']);
  }
}
