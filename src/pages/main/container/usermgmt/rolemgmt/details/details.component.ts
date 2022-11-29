import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { IDetailsList } from './iDetails.interface';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
    trigger('firstSwitch', [
      state('open', style({
        padding: '0 0 10px 30px',
        maxHeight: '3000px',
        opacity: 1,
      })),
      state('closed', style({
        padding: '0 0 0 30px',
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
  ]
})
export class DetailsComponent implements OnInit {
  pageType: string;
  bemInfoData: any;
  customer: any;
  userInfo: any;
  crumbsList: object;
  customerName: string;
  userPowerList: any;
  userMenuList: any;
  userPowerAllCheck: boolean;
  userMenuAllCheck: boolean;
  RoleName = new FormControl('', Validators.required);
  RoleDesc: string;
  RoleFunc: string;
  RoleMenu: string;
  ChangeNowRoleFunc: string;
  ChangeNowRoleMenu: string;
  userPowerItemsCheck: boolean;
  userPowerListIndex: number;
  userMenuListIndex: number;
  userMenuFirstListIndex: number;
  userMenuSecondListIndex: number;
  // edit
  oldRoleFuncCheckItem: any;
  oldRoleMenuCheckItem: any;
  // 移动端权限
  powerList: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    route.data
      .subscribe(
        (res: any) => {
          this.pageType = res.type;
        }
      );
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.crumbsList = [
      { name: '用户权限', open: false, url: '' },
      { name: '角色设置', open: true, url: 'rolemgmt' },
      { name: '新增', open: false, url: '' }
    ];
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.RoleDesc = '';
    this.RoleFunc = '';
    this.RoleMenu = '';
    this.ChangeNowRoleFunc = '';
    this.ChangeNowRoleMenu = '';
    this.userPowerItemsCheck = false;
    this.userPowerListIndex = null;
    this.userMenuListIndex = null;
    this.userMenuFirstListIndex = null;
    this.userMenuSecondListIndex = null;
    this.powerList = [
      // { name: '财务信息', check: false },
      // { name: '设备维修', check: false },
      // { name: '派单管理', check: false },
      // { name: '转派功能', check: false },
    ];
  }

  ngOnInit() {
    if (this.pageType === 'edit') {
      this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
      if (this.bemInfoData.RoleFrontFunc) {
        const t = this.bemInfoData.RoleFrontFunc.split(',');
        for (const item of t) {
          console.log(this.powerList)
          for (const p of this.powerList) {
            if (item === p.name) {
              p.check = true;
            }
          }
        }
      }
      this.RoleName.setValue(this.bemInfoData.RoleName);
      this.RoleDesc = this.bemInfoData.RoleDesc;
      this.oldRoleFuncCheckItem = this.bemInfoData.RoleFunc ? this.bemInfoData.RoleFunc.split(',') : '';
      this.oldRoleMenuCheckItem = this.bemInfoData.RoleMenu ? this.bemInfoData.RoleMenu.split(',') : '';
    }
    const data = {
      FromCache: false,
    };
    this.service.serviceR('ent/role/2107', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res);
        this.userMenuList = res.Result;
        this.initialData(this.userMenuList, 'submenu');
        if (this.pageType === 'edit') {
          for (const u of this.userMenuList) {
            if (u.children && u.children.length !== 0) {
              this.IsCheckOne(u.children, this.oldRoleMenuCheckItem);
              u.indeterminate = this.checkChildrenData(u.children, this.oldRoleMenuCheckItem);
              for (const c of u.children) {
                if (c.children && c.children.length !== 0) {
                  c.indeterminate = this.checkChildrenData(c.children, this.oldRoleMenuCheckItem);
                }
              }
            }
          }
          this.IsCheckOne(this.userMenuList, this.oldRoleMenuCheckItem);
        }
      }
    });
    this.service.serviceR('ent/role/2106', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.userPowerList = res.Result;
        this.initialData(this.userPowerList, 'functions');
        if (this.pageType === 'edit') {
          this.userPowerList.map((item: any, itemIndex: number) => {
            let sum = 0;
            item.children.map((childitem: any) => {
              this.oldRoleFuncCheckItem.map((oldItem: any) => {
                if (oldItem === childitem.id) {
                  childitem.check = true;
                  sum += 1;
                }
              });
            });
            if (sum < item.children.length && sum > 0) {
              item.indeterminate = true;
            }
            this.oldRoleFuncCheckItem.map((oldItem: any) => {
              if (oldItem === item.id) {
                this.checkItem(itemIndex);
              }
            });
          });
        }
      }
    });
    this.getphonelist();
  }
  getphonelist() {
    const data = {
      FromCache: false,
    };
    this.service.serviceR('ent/role/2108', data, (res: any) => {
      if (res.ResultCode === 0) {
       console.log(res);
       for (const i of res.Result) {
          const object = {};
          Reflect.set(object, 'name', i );
          Reflect.set(object, 'check', false );
          this.powerList.push(object);
          if (this.pageType === 'edit') {
            if (this.bemInfoData.RoleFrontFunc) {
              const t = this.bemInfoData.RoleFrontFunc.split(',');
              for (const item of t) {
                for (const p of this.powerList) {
                  if (item === p.name) {
                    p.check = true;
                  }
                }
              }
            }
          }
       }
      }
    });
  }
  // 初始化时调用重组函数
  initialData(list: any, type: string, total: number = 0) {
    const childItemName = type;
    if (list) {
      if (list.length === total) {
        return;
      }
      Reflect.set(list[total], 'switch', false);
      Reflect.set(list[total], 'indeterminate', false);
      Reflect.set(list[total], 'children', list[total][childItemName]);
      Reflect.set(list[total], 'check', false);
      if (type === 'functions') {
        this.RoleFunc = this.RoleFunc + list[total].id + ',';
      } else if (type === 'submenu') {
        this.RoleMenu = this.RoleMenu + list[total].id + ',';
      }
      this.initialData(list, type, total + 1);
      if (list[total][childItemName]) {
        if (list[total][childItemName].length !== 0) {
          this.initialData(list[total][childItemName], type, 0);
        }
      }
    }
    return;
  }

  checkChildrenData(list: any, oldlist: any) {
    let sum = 0;
    for (const l of list) {
      for (const o of oldlist) {
        if (l.id === o) {
          sum += 1;
        }
      }
    }
    if (sum < list.length && sum > 0) {
      return true;
    } else {
      return false;
    }
  }

  IsCheckOne(list: any, oldList: any) {
    for (const l of list) {
      for (const c of l.children) {
        for (const oldItem of oldList) {
          if (c.id === oldItem) {
            this.checkFontTwo(c);
          }
        }
      }
    }
    for (const l of list) {
      for (const oldItem of oldList) {
        if (l.id === oldItem) {
          this.checkFontOne(l);
        }
      }
    }
  }

  // checkAll 两个全选方法
  // checkAllItem 全选方法对子项目选中方法
  checkAll(event: any, type: string) {
    if (type === 'functions') {
      this.userPowerAllCheck = event.checked;
      this.checkAllItem(this.userPowerList, this.userPowerAllCheck);
    } else if (type === 'submenu') {
      this.userMenuAllCheck = event.checked;
      this.checkAllItem(this.userMenuList, this.userMenuAllCheck);
    }
  }

  checkAllItem(list: any, check: boolean, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      if (check) {
        list[total].check = true;
        list[total].indeterminate = false;
      } else {
        list[total].check = false;
        list[total].indeterminate = false;
      }
      this.checkAllItem(list, check, total + 1);
      if (list[total].children && list[total].children.length !== 0) {
        this.checkAllItem(list[total].children, check, 0);
      }
    }
    return;
  }

  goback() {
    this.router.navigate(['index/rolemgmt']);
  }
  // 添加使用方法，拼凑两项对应的权限字符串
  checkData(list: any, type: string, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      if (type === 'functions') {
        if (!list[total].indeterminate) {
          if (list[total].check) {
            this.ChangeNowRoleFunc = this.ChangeNowRoleFunc + list[total].id + ',';
          }
        }
      } else if (type === 'submenu') {
        if (!list[total].indeterminate) {
          if (list[total].check) {
            this.ChangeNowRoleMenu = this.ChangeNowRoleMenu + list[total].id + ',';
          }
        }
      }
      this.checkData(list, type, total + 1);
      if (list[total].children) {
        if (list[total].children.length !== 0) {
          this.checkData(list[total].children, type, 0);
        }
      }
    }
    return;
  }

  userSave() {
    if (this.RoleName.errors) {
      this.RoleName.markAsTouched({
        onlySelf: true
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    this.ChangeNowRoleFunc = '';
    this.ChangeNowRoleMenu = '';
    this.RoleMenu = this.RoleMenu.substr(0, this.RoleMenu.length - 1);
    this.RoleFunc = this.RoleFunc.substr(0, this.RoleFunc.length - 1);
    this.checkData(this.userMenuList, 'submenu');
    this.checkData(this.userPowerList, 'functions');
    this.ChangeNowRoleFunc = this.ChangeNowRoleFunc.substr(0, this.ChangeNowRoleFunc.length - 1);
    this.ChangeNowRoleMenu = this.ChangeNowRoleMenu.substr(0, this.ChangeNowRoleMenu.length - 1);
    let mpower = '';
    for (const p of this.powerList) {
      if (p.check === true) {
        mpower += `${p.name},`;
      }
    }
    if (mpower) {
      mpower = mpower.substr(0, mpower.length - 1);
    }
    const data: IDetailsList = {
      RoleDesc: this.RoleDesc,  // 角色介绍
      RoleMenu: this.ChangeNowRoleMenu !== '' ? this.ChangeNowRoleMenu : this.RoleMenu, // 角色菜单
      RoleName: this.RoleName.value, // 角色名称
      RoleFunc: this.ChangeNowRoleFunc !== '' ? this.ChangeNowRoleFunc : this.RoleFunc, // 角色功能
      RoleFrontFunc: mpower
    };
    let urlstr: string;
    if (this.pageType === 'edit') {
      Reflect.set(data, 'RoleSeq', this.bemInfoData.RoleSeq);
      urlstr = 'ent/role/2103';
    } else {
      urlstr = 'ent/role/2102';
    }
    console.log(data)
    this.service.serviceR(urlstr, data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/rolemgmt']);
      }
    });
  }

  getRoleNameErrorMessage() {
    return this.RoleName.hasError('required') ? '请输入角色名称' : '';
  }

  /**
   * 点击箭头事件
   * @param Index 下标
   */
  toggle(event: any, Index: number, type: string, zone?: string) {
    if (type === 'fun') {
      this.userPowerListIndex = Index;
    } else if (type === 'menu') {
      if (zone === 'One') {
        this.userMenuFirstListIndex = Index;
      } else if (zone === 'Two') {
        this.userMenuSecondListIndex = Index;
      }
    }
    event.switch = !event.switch;
  }

  /**
   * functionc 的外部项check change绑定事件
   * @param event item
   * @param Index 下标
   */
  checkList(event: any, Index: number) {
    this.userPowerListIndex = Index;
    for (const u of this.userPowerList[Index].children) {
      u.check = event.checked;
    }
  }

  // functionc 子项目check change绑定事件
  checkItem(Index: number = this.userPowerListIndex) {
    const len = this.userPowerList[Index].children.length;
    let sum = 0;
    for (const u of this.userPowerList[Index].children) {
      if (u.check === true) {
        sum += 1;
      } else {
        sum -= 1;
      }
    }
    if (sum === len) {
      this.userPowerList[Index].indeterminate = false;
      this.userPowerList[Index].check = true;
    } else if (sum < len && sum > -Math.abs(len)) {
      this.userPowerList[Index].check = false;
      this.userPowerList[Index].indeterminate = true;
    } else if (sum === -Math.abs(len)) {
      this.userPowerList[Index].indeterminate = false;
      this.userPowerList[Index].check = false;
    }
  }
  // menu 所有选项检索以下各类函数
  // checkMenuOne 首项目检索
  // checkMenuTwo 第二季项目检索
  // checkMenuThree 尾端项目检索

  // checkFontOne 检索二、三项目选中是否影响第一项目
  // checkFontTwo 检索第三项目选中是否影响第二项目
  checkMenuOne(event: any, index: number) {
    this.userMenuFirstListIndex = index;
    for (const u of this.userMenuList[index].children) {
      u.check = event.checked;
      for (const c of u.children) {
        c.check = event.checked;
      }
    }
  }
  checkMenuTwo(event: any, index: number) {
    this.userMenuSecondListIndex = index;
    this.userMenuList[this.userMenuFirstListIndex].indeterminate = true;
    const secondItem = this.userMenuList[this.userMenuFirstListIndex].children[index].children;
    for (const s of secondItem) {
      s.check = event.checked;
      for (const c of s.children) {
        c.check = event.checked;
      }
    }
    this.checkFontOne(this.userMenuList[this.userMenuFirstListIndex]);
  }
  checkMenuThree(event: any) {
    this.checkFontTwo(this.userMenuList[this.userMenuFirstListIndex].children[this.userMenuSecondListIndex]);
    this.checkFontOne(this.userMenuList[this.userMenuFirstListIndex]);
  }

  checkFontOne(list: any) {
    let sum = 0;
    let len = 0;

    if (list.children && list.children.length !== 0) {
      len += list.children.length;
      for (const c of list.children) {
        if (c.check) {
          sum += 1;
        } else {
          sum -= 1;
        }
        if (c.children && c.children.length !== 0) {
          len += c.children.length;
          for (const cc of c.children) {
            if (cc.check) {
              sum += 1;
            } else {
              sum -= 1;
            }
          }
        }
      }
    }
    if (sum === len) {
      list.indeterminate = false;
      list.check = true;
    } else if (sum < len && sum > -Math.abs(len)) {
      list.check = false;
      list.indeterminate = true;
    } else if (sum === -Math.abs(len)) {
      list.indeterminate = false;
      list.check = false;
    }
  }

  checkFontTwo(list: any) {
    let sum = 0;
    const len = list.children.length;
    for (const l of list.children) {
      if (l.check) {
        sum += 1;
      } else {
        sum -= 1;
      }
    }
    if (sum === len) {
      list.indeterminate = false;
      list.check = true;
    } else if (sum < len && sum > -Math.abs(len)) {
      list.check = false;
      list.indeterminate = true;
    } else if (sum === -Math.abs(len)) {
      list.indeterminate = false;
      list.check = false;
    }
  }
}
