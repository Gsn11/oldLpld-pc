import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [ Service ]
})
export class InfoComponent implements OnInit {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  imgsrcData: object[] = [];
  userPower: boolean;
  UserTeamJobs: any;
  UserRoles: any;
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
      { name: '用户权限', open: false, url: '' },
      { name: '用户设置', open: true, url: 'usermgmt' },
      { name: '查看', open: false, url: '' }
    ];
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
      USeq: this.bemInfoData.Seq
    };
    this.service.serviceR('user/1006', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.UserTeamJobs = res.Result.UserTeamJobs;
      }
    });
    this.service.serviceR('ent/cususer/4007', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.UserRoles = res.Result.CustomerUserRoles;
      }
    });
  }

  searchImgList() {
    const data = {
      USeq: this.bemInfoData.Seq,
      FromCache: false
    };
    this.service.serviceR('user/1005', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'UserImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    this.router.navigate(['index/usermgmt']);
  }

  gotoEdit() {
    this.router.navigate(['index/usermgmt/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/cususer/4104', { USeq: this.bemInfoData.Seq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
          });
          this.router.navigate(['usermgmt']);
        }
      });
    }
  }
}
