import { Component, OnInit } from '@angular/core';
import { GetUserIP } from '../pages/common/utils/js/getUserIP';
import { AppService } from './app.component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  constructor(
    private appService: AppService
  ) {
    this.isLogin = false;
  }
  ngOnInit(): void {
    // 默认获取用户当前IP地址
    const ip = new GetUserIP();
    if (!localStorage.getItem('bemUserIP')) {
      ip.getUserIP((userIp: any) => {
        localStorage.setItem('bemUserIP', userIp);
      });
    } else {
      ip.getUserIP((userIp: any) => {
        if (userIp !== localStorage.getItem('bemUserIP')) {
          localStorage.setItem('bemUserIP', userIp);
        }
      });
    }

    // 默认获取国内地区
    if (!localStorage.getItem('bemRegionJSON')) {
      this.appService.getRegion()
      .subscribe(
        (res) => {
          // console.log(res);
          localStorage.setItem('bemRegionJSON', JSON.stringify(res));
        },
        (error) => {
          console.log(2);
          // console.log(error);
        }
      );
    }

  }
}
