import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IAddList } from './iAdd.component';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [
    trigger('firstSwitch', [
      state('open', style({
        maxHeight: '1600px',
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
        maxHeight: '1600px',
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
  ]
})
export class AddComponent implements OnInit {
  crumbsList: object;
  SPName: string;
  Contact: string;
  Tel: number;
  ServiceZone: string;
  selectBusiDomains: any;
  BusiDomains: object;
  region: any;
  checkServiceZoom: boolean;
  regionChooseList: any;
  regionChooseIndex: number;
  setRegionConfim: boolean;
  setRegionData: any;
  regionAllCheck: boolean;
  isType: string;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.region = JSON.parse(localStorage.getItem('bemRegionJSON'));
    this.Tel = null;
    this.SPName = '';
    this.Contact = '';
    this.ServiceZone = '';
    this.selectBusiDomains = new FormControl();
    this.crumbsList = [
      { name: '运维中心', open: false, url: '' },
      { name: '固定服务商', open: true, url: 'srvprovider' },
      { name: '新增', open: false, url: '' }
    ];
    this.checkServiceZoom = false;
    this.regionChooseList = null;
    this.setRegionConfim = false;
    this.regionChooseIndex = null;
    this.isType = 'add';
    this.regionAllCheck = false;
  }

  ngOnInit() {
    this.initialData(this.region);
    const data = {
      FromCache: false,
      State: 0
    };
    // 此处是查询擅长行业内容，无需删除
    this.service.serviceR('ent/params/busidomain/11501', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.BusiDomains = res.Result.BusiDomains;
      }
    });
  }

  initialData(list: any, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      Reflect.set(list[total], 'check', false);
      Reflect.set(list[total], 'switch', false);
      Reflect.set(list[total], 'name', list[total].region);
      if (list[total].regionEntitys.length !== 0) {
        Reflect.set(list[total], 'children', list[total].regionEntitys);
      }
      this.initialData(list, total + 1);
      if (list[total].regionEntitys) {
        if (list[total].regionEntitys.length !== 0) {
          this.initialData(list[total].regionEntitys, 0);
        }
      }
    }
    return;
  }

  checkAll(event: any) {
      this.regionAllCheck = event.checked;
      this.checkAllItem(this.region, this.regionAllCheck);
  }

  checkAllItem(list: any, check: boolean, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      if (check) {
        list[total].check = true;
      } else {
        list[total].check = false;
      }
      this.checkAllItem(list, check, total + 1);
      if (list[total].regionEntitys.length !== 0) {
        this.checkAllItem(list[total].regionEntitys, check, 0);
      }
    }
    return;
  }

  chooseService() {
    if (this.checkServiceZoom) {
      return;
    }
    this.checkServiceZoom = !this.checkServiceZoom;
  }

  checkOk() {
    this.checkServiceZoom = false;
    const region: any = [];
    for (const r of this.region) {
      for (const c of r.regionEntitys) {
        for (const d of c.regionEntitys) {
          if (d.check) {
            region.push({
              code: d.code,
              region: d.region
            });
          }
        }
      }
    }
    this.regionChooseList = region;
  }

  deleteItem(index: number) {
    this.regionChooseIndex = index;
    this.showProductConfim();
  }

  closeChoosePlant() {
    this.checkServiceZoom = false;
  }

  goback() {
    this.router.navigate(['index/srvprovider']);
  }

  showProductConfim() {
    this.setRegionConfim = !this.setRegionConfim;
  }
  // confim组件返回值 true 确定 / false 取消
  regionConfimResult(...data: any) {
    this.setRegionConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.regionChooseList.splice(this.regionChooseIndex, 1);
    }
  }

  userSave() {
    if (this.SPName === '') {
      this.snackBar.open('请输入固定服务商', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (this.Contact === '') {
      this.snackBar.open('请输入联系人', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    if (!this.Tel) {
      this.snackBar.open('请输入电话', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    if (this.regionChooseList) {
      let num = 0;
      while (num < this.regionChooseList.length) {
        this.ServiceZone = this.ServiceZone + this.regionChooseList[num].code + ',';
        num++;
      }
      this.ServiceZone = this.ServiceZone.substr(0, this.ServiceZone.length - 1);
    }
    let domains = '';
    if (this.selectBusiDomains.value) {
      for (const s of this.selectBusiDomains.value) {
        domains = domains + s + ',';
      }
      domains = domains.substr(0, domains.length - 1);
    }
    const data: IAddList = {
      SPName: this.SPName,
      Contact: this.Contact,
      Tel: this.Tel,
      ServiceZone: this.ServiceZone,
      BusiDomain: domains
    };
    this.service.serviceR('ent/serviceprovider/8502', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('操作成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
        this.router.navigate(['index/srvprovider']);
      }
    });
  }
}
