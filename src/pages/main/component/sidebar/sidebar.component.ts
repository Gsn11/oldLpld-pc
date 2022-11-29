import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Version } from '../../../common/version/ver';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('firstSwitch', [
      state('open', style({
        maxHeight: '1400px',
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
        maxHeight: '1400px',
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

export class SidebarComponent {
  bemUserInfo: any;
  sidebarData: any;  // 菜单
  sidebarIndex: number;   // 一级菜单下标
  sideItemIndex: number;  // 二级菜单下标
  sideThirdIndex: number; // 三级菜单下标
  isThirdOpen: boolean;  // 三级菜单点击，二级菜单不高亮的控制变量
  avatar: string;
  userName: string;
  @Input() meunState: boolean;
  version: any;
  Isentver: boolean;
  constructor(
    private router: Router
  ) {
    this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
    this.sidebarIndex = 0;
    this.sideItemIndex = 0;
    this.sideThirdIndex = 0;
    this.isThirdOpen = false;
    this.bemUserInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    if (this.bemUserInfo.Avatar) {
      this.avatar = this.bemUserInfo.Avatar;
    }
    this.userName = this.bemUserInfo.Name;
    if (this.bemUserInfo) {
      this.sidebarData = this.bemUserInfo.Menu;
      this.sidebarData.splice(15,1);
      this.sidebarData.splice(8,1);
      this.sidebarData[13].submenu.splice(1,1);
      this.sidebarData[13].submenu.splice(1,1);
      this.sidebarData[13].submenu.splice(1,1);
      this.sidebarData[13].submenu.splice(1,1);
      this.sidebarData.splice(4,1);
      this.sidebarData[4].submenu[2].submenu.splice(1,1);
      this.sidebarData[4].submenu[2].submenu.splice(1,1);
      this.sidebarData[4].submenu[2].submenu.splice(1,1);
      this.sidebarData.splice(1,1);
      this.sidebarData[11].submenu.splice(1,1);
      console.log(this.sidebarData)
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

  /**
   * 总项目点击事件
   * @param sidebarIndex 总项下标
   */
  toggle(sidebarIndex: number) {
    this.isThirdOpen = false;
    this.sidebarIndex = sidebarIndex;
    this.sideItemIndex = 0;
    this.sideThirdIndex = 0;
    const oldSwitch = this.sidebarData[sidebarIndex].switch;
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
    if (this.sidebarData[sidebarIndex].switch === undefined || this.sidebarData[sidebarIndex].switch === null) {
      return;
    }
    if (oldSwitch === true) {
      this.sidebarData[sidebarIndex].switch = false;
    } else {
      this.sidebarData[sidebarIndex].switch = !this.sidebarData[sidebarIndex].switch;
      console.log(this.sidebarData[sidebarIndex]);
      if (this.sidebarData[sidebarIndex].submenu.length !== 0) {
        this.router.navigate(['index' + this.sidebarData[sidebarIndex].submenu[0].transcode]);
      } else {
        if (this.sidebarData[sidebarIndex].transcode === 'dashboard') {
          console.log(this.sidebarData);
        } else if (this.sidebarData[sidebarIndex].transcode === 'inspection') {
          this.router.navigate(['index/inspection']);
        } else {
          if (this.sidebarData[sidebarIndex].transcode !== '/') {
            this.router.navigate(['index' + this.sidebarData[sidebarIndex].transcode]);
          } else {
            this.router.navigate(['index/home']);
          }
        }
      }
    }
  }

  /**
   * 子项点击事件
   * @param sidebarIndex 总项下标
   * @param sideItemIndex 子项下标
   */
  toggleItem(sidebarIndex: number, sideItemIndex: number) {
    this.sideItemIndex = sideItemIndex;
    this.sideThirdIndex = 0;
    const oldSwitch = this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch;
    for (const s of this.sidebarData) {
      if (s.submenu) {
        for (const c of s.submenu) {
          if (c.submenu) {
            c.switch = false;
          }
        }
      }
    }
    if (this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch === undefined
      || this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch === null) {
      // 获取二级菜单无子项的项目
      this.isThirdOpen = false;
      return;
    }
    if (oldSwitch === true) {
      this.isThirdOpen = false;
      this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch = false;
    } else {
      this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch = !this.sidebarData[sidebarIndex].submenu[sideItemIndex].switch;
      if (this.sidebarData[sidebarIndex].submenu[sideItemIndex].submenu.length !== 0) {
        this.isThirdOpen = true;
        this.router.navigate(['index' + this.sidebarData[sidebarIndex].submenu[sideItemIndex].submenu[0].transcode]);
      } else {
        this.router.navigate(['index' + this.sidebarData[sidebarIndex].submenu[sideItemIndex].transcode]);
      }
    }
  }

  /**
   * 获取三级项目内容
   * @param sidebarIndex 一级项目下标
   * @param sideItemIndex 二级项目下标
   * @param thirdIndex 三级项目下标
   */
  thirdChoose(sidebarIndex: number, sideItemIndex: number, thirdIndex: number) {
    // 获取三级菜单项目
    this.isThirdOpen = true;
    this.sideThirdIndex = thirdIndex;
    this.router.navigate(['index' + this.sidebarData[sidebarIndex].submenu[sideItemIndex].submenu[thirdIndex].transcode]);
  }

  gotoUserinfo() {
    this.router.navigate(['index/userinfo']);
  }
}
