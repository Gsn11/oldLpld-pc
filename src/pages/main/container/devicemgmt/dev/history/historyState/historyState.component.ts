import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';

@Component({
    selector: 'app-historystate',
    templateUrl: './historystate.component.html',
    styleUrls: ['./historystate.component.scss']
})

export class HistoryStateComponent implements OnInit {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  userPower: boolean;
  DeviceStatusHiss: any;
  constructor(
    private router: Router,
    private service: Service
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemHistoryStateData'));
    this.userPower = false;
    this.setConfim = false;
    let crumbsName: string;
    let link: string;
    console.log(this.bemInfoData.MainType);
    if (this.bemInfoData.MainType === 1) {
        crumbsName = '智能设备管理';
        link = 'smartdev';
    } else if (this.bemInfoData.MainType === 0) {
        crumbsName = '通用设备管理';
        link = 'commdev';
    } else if (this.bemInfoData.MainType === 7) {
			crumbsName = '安全器材管理';
			link = 'secdev';
		}  else if (this.bemInfoData.MainType === 3) {
      crumbsName = '备品/备件';
      link = 'sparepartsmgmt';
  } else if (this.bemInfoData.MainType === 4) {
    crumbsName = '配件管理';
    link = 'devpartsmgmt';
} else {
        crumbsName = '智联网关管理';
        link = 'gatewaydev';
    }
    this.crumbsList = [
        { name: '设备管理', open: false },
        { name: crumbsName, open: true, url: link },
        { name: '设备状态记录', open: false }
    ];
  }

  ngOnInit() {
    const data = {
      DSeq: this.bemInfoData.Seq,
    };
    this.service.serviceR('ent/device/6009', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res);
        this.DeviceStatusHiss = res.Result.DeviceStatusHiss;
      }
    });
  }

  goback() {
    let link: string;
    if (this.bemInfoData.MainType === 0) {
        link = 'commdev';
    } else if (this.bemInfoData.MainType === 1) {
        link = 'smartdev';
    } else if (this.bemInfoData.MainType === 3) {
      link = 'sparepartsmgmt';
  } else if (this.bemInfoData.MainType === 4) {
    link = 'devpartsmgmt';
} else {
        link = 'gatewaydev';
    }
    link += '/edit';
    localStorage.removeItem('bemHistoryStateData');
    this.router.navigate(['index/' + link]);
  }
}
