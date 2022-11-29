import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../../service/service';
import videojs from 'video.js';
import 'videojs-flash';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {
  crumbsList: any = [];
  OrderType: any;
  videoCodeList = [];
  videoList = [];
  Player: any;
  bemInfoData: any;
  @ViewChild('video', null) video: ElementRef;
  constructor(
    private elementRef: ElementRef,
    private service: Service,
    private route: ActivatedRoute,
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));

    route.data.subscribe(
      (data: any) => {
        this.OrderType = data.type;
      }
    );
    route.params.subscribe(
      (params: any) => {
        this.videoCodeList = params.code.split(',');
      }
    );

    let crumbsName: string;
    if (this.OrderType === 'orderfix') {
      crumbsName = '维修派单';
    } else if (this.OrderType === 'orderschedulechk') {
      crumbsName = '巡查派单';
    } else {
      crumbsName = '保养派单';
    }
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '派单管理', open: false },
      { name: crumbsName, open: true, url: this.OrderType },
      { name: '查看视频', open: false }
    ];

    this.getVideoList();
  }

  ngOnInit() {
      this.Player = videojs(
        this.video.nativeElement,
        {
          muted: true,
          controls: true,
          autoplay: true,
          loop: true,
          techOrder: ['html5', 'flash'],
          width: '1000',
          height: '640',
        }, () => {
          // this.Player.src({
          //   src: 'https://www.w3school.com.cn/i/movie.ogg',
          //   // type: this.urltype  // 可不设置
          // });
        }
      );
  }

  getVideoList() {
    this.videoCodeList.forEach(item => {
      this.service.serviceR('hikvision/cameras', {cameraIndexCodes: item}, (res: any) => {
        if (res.ResultCode === 0) {
          this.videoList = this.videoList.concat(res.Result.list);
        }
      });
    });
  }

  lookVideo(data) {
    this.service.serviceR('ent/maintenance/8018', {MOSeq: this.bemInfoData.MOSeq, ActionDesc: data.cameraIndexCode}, (res: any) => {
      if (res.ResultCode === 0) {
      }
    });
    return false;

    this.Player.src({
      src: 'https://www.w3school.com.cn/i/movie.ogg',
      // type: this.urltype  // 可不设置
    });
  }
}
