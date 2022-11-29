import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var AMap: any;
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  imgsrcData: object[] = [];
  map: any;
  userPower: boolean;
  GdLng: number;
  GdLat: number;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '厂商管理', open: true, url: 'facturer' },
      { name: '查看', open: false, url: '' }
    ];
    this.GdLng = this.bemInfoData.GdLng;
    this.GdLat = this.bemInfoData.GdLat;
  }

  ngOnInit() {
    if (this.GdLng === null) {
      this.GdLng = 116.397428;
    }
    if (this.GdLat === null) {
      this.GdLat = 39.90923;
    }
    // this.getMap();
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      FSeq: this.bemInfoData.FSeq,
      FromCache: false
    };
    this.service.serviceR('ent/params/facturer/10605', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'FacturerImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }
  // 组件销毁前，回收amap地图资源
  ngOnDestroy() {
    // this.map.destroy();
  }
  getMap() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 20,
      center: [this.GdLng, this.GdLat]
    });
    const marker = new AMap.Marker({
      icon: new AMap.Icon({
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        size: new AMap.Size(24, 35),  // 承载icon外框大小
        imageSize: new AMap.Size(24, 35), // icon自身大小
      }),
      position: [this.GdLng, this.GdLat],
      offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(this.map);
  }

  goback() {
    this.router.navigate(['index/facturer']);
  }

  gotoEdit() {
    this.router.navigate(['index/facturer/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/params/facturer/10604', { FSeqs: this.bemInfoData.FSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/facturer']);
        }
      });
    }
  }
}
