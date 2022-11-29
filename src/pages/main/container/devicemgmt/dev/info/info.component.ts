import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  buildData: any;
  imgsrcData = [];
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  docListData: object[] = [];
  userPower: boolean;
  DeviceType: string;
  MainType: number;
  GotoEdit: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    route.data
      .subscribe(
        (res: any) => {
          this.DeviceType = res.type;
        }
      );
    let curmbsName1: string;
    let crumbsName: string;
    if (this.DeviceType === 'smartdev') {
      curmbsName1 = '设备管理';
      crumbsName = '智能设备管理';
      this.MainType = 1;
      this.GotoEdit = 'smartdev/edit';
    } else if (this.DeviceType === 'commdev') {
      curmbsName1 = '设备管理';
      crumbsName = '通用设备管理';
      this.MainType = 0;
      this.GotoEdit = 'commdev/edit';
    } else if (this.DeviceType === 'commdev') {
      curmbsName1 = '设备管理';
      crumbsName = '安全器材管理';
      this.MainType = 0;
      this.GotoEdit = 'secdev/edit';
    } else if (this.DeviceType === 'gatewaydev') {
      curmbsName1 = 'IOT管理';
      crumbsName = '智联网关管理';
      this.MainType = 2;
      this.GotoEdit = 'gatewaydev/edit';
    } else if (this.DeviceType === 'sparepartsmgmt') {
      curmbsName1 = '设备管理';
      crumbsName = '备品/备件';
      this.MainType = 2;
      this.GotoEdit = 'sparepartsmgmt/edit';
    } else {
      curmbsName1 = '设备管理';
      crumbsName = '配件管理';
      this.MainType = 2;
      this.GotoEdit = 'devpartsmgmt/edit';
    }
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));


    if (buildData.buildType === '东南水厂') {
      if (this.bemInfoData.BuyDate) {
        this.bemInfoData.BuyDate = this.bemInfoData.BuyDate.split('-')[0] + '-' + this.bemInfoData.BuyDate.split('-')[1];
      }
      if (this.bemInfoData.ManuDate) {
        this.bemInfoData.ManuDate = this.bemInfoData.ManuDate.split('-')[0] + '-' + this.bemInfoData.ManuDate.split('-')[1];
      }
      if (this.bemInfoData.InstallDate) {
        this.bemInfoData.InstallDate = this.bemInfoData.InstallDate.split('-')[0] + '-' + this.bemInfoData.InstallDate.split('-')[1];
      }
      if (this.bemInfoData.WarrantyExpire) {
        this.bemInfoData.WarrantyExpire = this.bemInfoData.WarrantyExpire.split('-')[0] + '-' + this.bemInfoData.WarrantyExpire.split('-')[1];
      }
    }
    console.log(this.bemInfoData);
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    this.crumbsList = [
      { name: curmbsName1, open: false, url: '' },
      { name: crumbsName, open: true, url: this.DeviceType },
      { name: '查看', open: false, url: '' }
    ];

    this.buildData = buildData;
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
        // this.imgsrcData = res.Result[key];
        this.imgsrcData = [];
        res.Result[key].forEach(item => {
          if (item.ImgExt.toLowerCase() === 'png' || item.ImgExt.toLowerCase() === 'jpg' || item.ImgExt.toLowerCase() === 'gif') {
            this.imgsrcData.push(item);
          } else {
            Reflect.set(item, 'DocDesc', Reflect.get(item, 'ImgDesc'));
            Reflect.set(item, 'DocUrl', Reflect.get(item, 'ImgUrl'));
            this.docListData.push(item);
          }
        });
      }
    });
  }

  goback() {
    this.router.navigate(['index/' + this.DeviceType]);
  }

  gotoEdit() {
    this.router.navigate(['index/' + this.GotoEdit]);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/device/6004', { DSeq: this.bemInfoData.Seq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
          });
          this.router.navigate(['index/' + this.DeviceType]);
        }
      });
    }
  }
}
