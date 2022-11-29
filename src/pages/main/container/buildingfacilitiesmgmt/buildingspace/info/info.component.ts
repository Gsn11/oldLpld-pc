import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
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
  buildData: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    // console.log(this.bemInfoData);
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    this.setConfim = false;
    this.crumbsList = [
      { name: '建筑设施管理', open: false, url: '' },
      { name: '空间位置标记', open: true, url: 'facilities' },
      { name: '查看', open: false, url: '' }
    ];

    this.buildData = buildData;
  }

  ngOnInit() {
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      BSSeq: this.bemInfoData.BSSeq,
      FromCache: false
    };
    this.service.serviceR('ent/buildspace/5205', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'BuildingSpaceImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    this.router.navigate(['index/buildingspace']);
  }

  gotoEdit() {
    this.router.navigate(['index/buildingspace/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/buildspace/5204', { BSSeq: this.bemInfoData.BSSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
          });
          this.router.navigate(['index/buildingspace']);
        }
      });
    }
  }
}
