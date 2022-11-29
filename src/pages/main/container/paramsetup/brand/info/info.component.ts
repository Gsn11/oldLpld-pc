import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  imgsrcData: object[] = [];
  userPower: boolean;
  BRFacturer: string;
  buildData: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.userPower = false;
    this.setConfim = false;
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '品牌管理', open: true, url: 'brand' },
      { name: this.bemInfoData.BRName, open: false, url: '' }
    ];
    this.BRFacturer = '';


    this.buildData = buildData;
  }

  ngOnInit() {
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.searchImgList();
    const data = {
      State: 0,
    };
    this.service.serviceR('ent/params/facturer/10601', data, (res: any) => {
      if (res.ResultCode === 0) {
        for (const f of res.Result.Facturers) {
          if (f.FSeq === this.bemInfoData.BRFacturer) {
            this.BRFacturer = f.FName;
          }
        }
      }
    });
  }

  searchImgList() {
    const data = {
      BRSeq: this.bemInfoData.BRSeq,
      FromCache: false
    };
    this.service.serviceR('ent/params/brand/10005', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'BrandImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    this.router.navigate(['index/brand']);
  }

  gotoEdit() {
    this.router.navigate(['index/brand/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/params/brand/10004', { BRSeqs: this.bemInfoData.BRSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
          });
          this.router.navigate(['index/brand']);
        }
      });
    }
  }
}
