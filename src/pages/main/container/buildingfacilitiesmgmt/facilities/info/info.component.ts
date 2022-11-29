import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
declare var AMap: any;
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

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
  GdLat: number; // 高德地图纬度
  GdLng: number; // 高德地图经度
  BuildGroups: any;
  Subjection: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    // console.log(this.bemInfoData);
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
    let menu1: string;
    if (!Isentver) {
        menu1 = '建筑设施管理';
    } else {
        menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
    }
    this.crumbsList = [
      { name: menu1, open: false, url: '' },
      { name: '设施管理', open: true, url: 'facilities' },
      { name: '查看', open: false, url: '' }
    ];
    if (this.bemInfoData.gdLat) {
      this.GdLat = this.bemInfoData.gdLat ? this.bemInfoData.gdLat : '';
    } else {
      this.GdLat = 39.90923;
    }
    if (this.bemInfoData.gdLng) {
      this.GdLng = this.bemInfoData.gdLng ? this.bemInfoData.gdLng : '';
    } else {
      this.GdLng = 116.397428;
    }
  }

  ngOnInit() {
    this.getMap();
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      BSeq: this.bemInfoData.Seq,
      FromCache: false
    };
    this.service.serviceR('ent/building/5005', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'BuildingImages';
        this.imgsrcData = res.Result[key];
      }
    });
    this.service.serviceR('ent/buildgroup/5111', data, (res: any) => {
      if (res.ResultCode === 0) {
        for (const b of res.Result.BuildGroups) {
          if (b.BGSeq === this.bemInfoData.BuildingGroupSeq) {
            this.BuildGroups = b.BGName;
            return;
          }
        }
      }
    });
    this.service.serviceR('ent/subjection/3811', data, (res: any) => {
      if (res.ResultCode === 0) {
        for (const s of res.Result.Subjections) {
          if (s.Seq === this.bemInfoData.Subjection) {
            this.Subjection = s.SubjectionId;
            return;
          }
        }
      }
    });
  }
  // 组件销毁前，回收amap地图资源
  ngOnDestroy() {
    this.map.destroy();
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
    this.router.navigate(['index/facilities']);
  }

  gotoEdit() {
    this.router.navigate(['index/facilities/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/building/5004', { BSeq: this.bemInfoData.Seq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
          });
          this.router.navigate(['index/facilities']);
        }
      });
    }
  }
}
