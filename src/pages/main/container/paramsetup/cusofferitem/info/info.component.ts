import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
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
      { name: '服务预算管理', open: true, url: 'cusofferitem' },
      { name: '查看', open: false, url: '' }
    ];
  }

  goback() {
    this.router.navigate(['index/cusofferitem']);
  }

  gotoEdit() {
    this.router.navigate(['index/cusofferitem/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/maintenance/8604', { COISeq: this.bemInfoData.COISeq }, (res: any) => {
        this.snackBar.open('删除成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/cusofferitem']);
      });
    }
  }
}
