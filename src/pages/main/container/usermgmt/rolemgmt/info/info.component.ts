import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  isType: string;

  userPowerList: any;
  userMenuList: any;
  userPowerAllCheck: boolean;
  userMenuAllCheck: boolean;
  RoleName: string;
  RoleDesc: string;
  RoleFunc: string;
  RoleMenu: string;
  funcIsCheck: number;
  menuIsCheck: number;
  ChangeNowRoleFunc: string;
  ChangeNowRoleMenu: string;
  oldRoleFuncCheckItem: any;
  oldRoleMenuCheckItem: any;
  allSwitchIsOpen: boolean;
  mpower: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.bemInfoData.RoleFrontFunc) {
      this.mpower = this.bemInfoData.RoleFrontFunc.split(',');
    } else {
      this.mpower = null;
    }
    this.RoleName = this.bemInfoData.RoleName;
    this.RoleDesc = this.bemInfoData.RoleDesc;
    this.RoleFunc = this.bemInfoData.RoleFunc ? this.bemInfoData.RoleFunc.split(',') : '';
    this.RoleMenu = this.bemInfoData.RoleMenu ? this.bemInfoData.RoleMenu.split(',') : '';
    this.setConfim = false;
    this.crumbsList = [
      { name: '用户权限', open: false, url: '' },
      { name: '角色设置', open: true, url: 'rolemgmt' },
      { name: '查看', open: false, url: '' }
    ];
    this.isType = 'info';
    this.allSwitchIsOpen = true;
  }

  ngOnInit() {
    const data = {
      FromCache: false,
    };
    this.service.serviceR('ent/role/2107', data, (res: any) => {
      if (res.ResultCode === 0) {
        if (this.RoleMenu) {
          const list = res.Result;
          this.initialData(list, 'submenu');
          this.userMenuList = list;
        }
      }
    });
    this.service.serviceR('ent/role/2106', data, (res: any) => {
      if (res.ResultCode === 0) {
        if (this.RoleFunc) {
          const list = res.Result;
          this.initialData(list, 'functions');
          this.userPowerList = list;
        }
      } else {
        this.userPowerList = [];
      }
    });
  }

  initialData(list: any, type: string, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      Reflect.set(list[total], 'isChoose', false);
      Reflect.set(list[total], 'children', list[total][type]);
      Reflect.set(list[total], 'useId', list[total].name);
      Reflect.set(list[total], 'display', false);
      if (type === 'submenu') {
        for (const m of this.RoleMenu) {
          if (list[total].id === m) {
            Reflect.set(list[total], 'display', true);
          }
        }
      } else {
        for (const f of this.RoleFunc) {
          if (list[total].id === f) {
            Reflect.set(list[total], 'display', true);
          }
        }
      }
      this.initialData(list, type, total + 1);
      if (list[total][type]) {
        if (list[total][type].length !== 0) {
          this.initialData(list[total][type], type, 0);
        }
      }
    }
    return;
  }

  goback() {
    this.router.navigate(['index/rolemgmt']);
  }

  gotoEdit() {
    this.router.navigate(['index/rolemgmt/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/role/2104', { RoleSeq: this.bemInfoData.RoleSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/rolemgmt']);
        }
      });
    }
  }

  powerTreeChange(tree: any) {
    this.initailChooseData(this.userPowerList);
  }

  menuTreeChange(tree: any) {
    this.initailChooseData(this.userMenuList);
  }

  initailChooseData(list: any) {
    list.map((item: any) => {
      item.isChoose = false;
      if (item.children) {
        this.initailChooseData(item.children);
      }
    });
  }
}
