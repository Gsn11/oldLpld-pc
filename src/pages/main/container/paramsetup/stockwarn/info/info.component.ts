import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

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
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '库存报警', open: true, url: 'stockwarn' },
      { name: this.bemInfoData.DTName, open: false, url: '' }
    ];
  }

  ngOnInit() {
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      DMSeq: this.bemInfoData.DMSeq,
      FromCache: false
    };
    this.service.serviceR('ent/devicemodel/6105', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'DeviceModelImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    console.log('nihao');
    this.router.navigate(['index/stockwarn']);
  }

  gotoEdit() {
    this.router.navigate(['index/stockwarn/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/devicemodel/6104', { DMSeq: this.bemInfoData.DMSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/devmod']);
        }
      });
    }
  }
}
