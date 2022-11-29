import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IEditList } from './iEdit.component';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
export class EditComponent implements OnInit {
  bemInfoData: any;
  crumbsList: object;
  SPName: string;
  Contact: string;
  Tel: number;
  ServiceZone: string;
  selectBusiDomains: any;
  BusiDomains: any;
  region: any;
  nowItemName: string;
  newChildrenItem: any;
  changeItem: any;
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
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.region = JSON.parse(localStorage.getItem('bemRegionJSON'));
    this.newChildrenItem = new FormControl();
    this.Tel = this.bemInfoData.Tel;
    this.SPName = this.bemInfoData.SPName;
    this.Contact = this.bemInfoData.Contact;
    this.ServiceZone = '';
    this.selectBusiDomains = new FormControl();
    this.changeItem = this.region[0];
    this.newChildrenItem.setValue(this.region[0].region);
    this.nowItemName = this.newChildrenItem.value;
    this.checkServiceZoom = false;
    this.regionChooseList = null;
    this.setRegionConfim = false;
    this.regionChooseIndex = null;
    this.crumbsList = [
      { name: '运维中心', open: false, url: '' },
      { name: '固定服务商', open: true, url: 'srvprovider' },
      { name: '修改', open: false, url: '' }
    ];
    this.isType = 'edit';
    this.regionAllCheck = false;
  }

  ngOnInit() {
    const tempList = [];
    this.initialData(this.region);
    if (this.bemInfoData.ServiceZone) {
      for (const s of this.bemInfoData.ServiceZone) {
        for (const r of this.region) {
          r.switch = false;
          for (const c of r.regionEntitys) {
            c.switch = false;
            for (const d of c.regionEntitys) {
              if (s === d.code) {
                d.check = true;
                tempList.push({
                  code: d.code,
                  region: d.region
                });
                this.regionChooseList = tempList;
              } else {
                d.check = false;
              }
            }
          }
        }
      }
    }
    const data = {
      FromCache: false,
      State: 0
    };
    this.service.serviceR('ent/params/busidomain/11501', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.BusiDomains = res.Result.BusiDomains;
      }
    });
    if (this.bemInfoData.BusiDomain) {
      this.bemInfoData.BusiDomain = this.bemInfoData.BusiDomain.split(',');
      this.selectBusiDomains.value = this.bemInfoData.BusiDomain;
    }
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

  goback() {
    history.back();
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

  userSave() {
    if (this.SPName === '') {
      this.snackBar.open('请输入固定服务器', '确认', {
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

    const data: IEditList = {
      SPSeq: this.bemInfoData.Seq,
      SPName: this.SPName,
      Contact: this.Contact,
      Tel: this.Tel,
      ServiceZone: this.ServiceZone,
      BusiDomain: domains,
    };
    this.service.serviceR('ent/serviceprovider/8503', data, (res: any) => {
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
}
