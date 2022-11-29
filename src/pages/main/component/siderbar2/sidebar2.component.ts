import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Version } from '../../../common/version/ver';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.scss'],
  animations: [
    trigger('firstSwitch', [
      state('open', style({
        maxHeight: '240px',
        opacity: 1,
      })),
      state('closed', style({
        maxHeight: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0.24s')
      ])
    ]), trigger('thirdSwitch', [
      state('open', style({
        maxHeight: '240px',
        opacity: 1,
      })),
      state('closed', style({
        maxHeight: '0px',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0.24s')
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Sidebar2Component {
  bemUserInfo: any;
  sidebarData: any;  // 菜单
  avatar: string;
  userName: string;
  @Input() meunState: boolean;
  version: any;
  constructor(
    private router: Router
  ) {
    this.bemUserInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    if (this.bemUserInfo.Avatar) {
      this.avatar = this.bemUserInfo.Avatar;
    }
    this.userName = this.bemUserInfo.Name;
    if (this.bemUserInfo) {
      this.sidebarData = this.bemUserInfo.Menu;
      for (const s of this.sidebarData) {
        if (s.submenu) {
          s.switch = false;
          for (const c of s.submenu) {
            if (c.submenu) {
              c.switch = false;
            }
          }
        }
      }
    }
    this.version = Version;
  }

  toggleFirstIcon(data: any) {
    this.router.navigate(['index/home']);
    if (data.submenu.length !== 0) {
      this.router.navigate(['index' + data.submenu[0].transcode]);
    } else {
      if (data.transcode === 'dashboard') {
        this.router.navigate([data.transcode]);
      } else if (data.transcode === 'inspection') {
        this.router.navigate(['index/inspection']);
      } else {
        if (data.transcode !== '/') {
          this.router.navigate(['index' + data.transcode]);
        } else {
          this.router.navigate(['index/home']);
        }
      }
    }
  }

  toggle(event: any, meunSelectObject: { transcode: string }) {
    event.stopPropagation();
    this.router.navigate(['index/' + meunSelectObject.transcode]);
  }

  gotoUserinfo() {
    this.router.navigate(['index/userinfo']);
  }
}
