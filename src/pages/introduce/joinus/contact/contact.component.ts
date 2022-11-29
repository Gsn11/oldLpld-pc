import { Component, OnInit, OnDestroy } from '@angular/core';
declare var AMap: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  map: any;
  markers: any;
  constructor() {
    this.markers = [];
  }
  ngOnInit() {
    this.getMap();
  }
  // 组件销毁前，回收amap地图资源
  ngOnDestroy() {
    this.map.destroy();
  }
  getMap() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 20,
      center: ['119.31791', '26.088397']
    });
    // if (this.isCenter === false) {
    //     this.mapClickFn();
    // } else {
    const marker = new AMap.Marker({
      icon: new AMap.Icon({
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        size: new AMap.Size(24, 35),  // 承载icon外框大小
        imageSize: new AMap.Size(24, 35), // icon自身大小
      }),
      position: ['119.31791', '26.088397'],
      offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(this.map);
    this.map.setCenter(['119.31791', '26.088397']); // 设置中心店经纬度
    this.markers.push(marker);
    // this.mapClickFn();
    // }
  }
}
