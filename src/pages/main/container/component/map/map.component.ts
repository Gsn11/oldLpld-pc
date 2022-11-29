import { Component, OnInit, OnDestroy, Input } from '@angular/core';
declare var AMap: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
    map: any;
    isCenter: boolean;
    zoom: number;
    @Input() setGdLng: number;
    @Input() setGdLat: number;
    GdLng: number;
    GdLat: number;
    markers: any = [];
    searchItem: string;
    searchList: [];
    searchState: boolean;
    searchIsTime: any;
    constructor() {
        this.searchState = false;
        this.zoom = 12;
    }
    ngOnInit() {
        this.GdLng = this.setGdLng;
        this.GdLat = this.setGdLat;
        if (this.GdLng && this.GdLat) {
            this.isCenter = true;
        } else {
            this.isCenter = false;
        }
    //     if ( this.map === undefined ) {
    //     this.getMap();
    // }
    }
    // 组件销毁前，回收amap地图资源
    ngOnDestroy() {
        // this.map.destroy();
    }

    getMap() {
        this.map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 12,
            center: [this.GdLng, this.GdLat]
        });
        if (this.isCenter === false) {
            this.mapClickFn();
        } else {
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
            this.map.setCenter([this.GdLng, this.GdLat]); // 设置中心店经纬度
            this.markers.push(marker);
            this.mapClickFn();
        }
    }

    toLocaltion() {
        this.map.panTo([this.GdLng, this.GdLat]);
        this.zoom = 12;
        this.map.setZoom(this.zoom);  //  设置层级
    }

    mapClickFn() {
        this.map.on('click', (e: any) => {
            this.GdLng = e.lnglat.getLng();
            this.GdLat = e.lnglat.getLat();
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
            this.map.setCenter([this.GdLng, this.GdLat]); // 设置中心店经纬度
            this.markers.push(marker);
            this.checkMarkers();
        });
    }

    changeItem() {
        AMap.plugin('AMap.PlaceSearch', () => {
            const autoOptions = {
                city: '全国'
            };
            const placeSearch = new AMap.PlaceSearch(autoOptions);
            placeSearch.search(this.searchItem, (status: any, result: any) => {
                if (result.info === 'OK') {
                    this.searchList = result.poiList.pois;
                }
            });
        });
    }

    closeSearchList() {
        this.searchState = false;
    }

    showSearchList() {
        this.searchState = true;
    }

    selectSearchItem(searchItem: any) {
        this.searchState = false;
        this.GdLng = searchItem.location.lng;
        this.GdLat = searchItem.location.lat;
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
        this.markers.push(marker);
        this.checkMarkers();
        this.map.setCenter([this.GdLng, this.GdLat]); // 设置中心店经纬度
        this.searchItem = searchItem.name;
    }

    changeZoom(type: string) {
        if (type === 'up') {
            this.zoom++;
            if (this.zoom > 18) {
                this.zoom--;
                return;
            }
        } else if (type === 'down') {
            this.zoom--;
            if (this.zoom < 3) {
                this.zoom++;
                return;
            }
        }
        this.map.setZoom(this.zoom);  //  设置层级
    }

    checkMarkers() {
        if (this.markers.length > 1) {
            for (let i = this.markers.length; i > 1; i--) {
                if (i - 2 < 0) {
                    return;
                } else {
                    this.markers[i - 2].setMap(null);
                    this.markers.splice(i - 2, 1);
                }
            }
        }
    }
}
