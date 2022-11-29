import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';
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
    this.userPower = false;
    this.setConfim = false;
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '运维计划', open: false },
      { name: '巡检模板', open: true, url: 'patrolpostemplate' },
      { name: '查看', open: false }
    ];
  }

  ngOnInit() {
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
  }

  goback() {
    this.router.navigate(['index/patrolpostemplate']);
  }

  gotoEdit() {
    this.router.navigate(['index/patrolpostemplate/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/maintenance/8104', { MTSeq: this.bemInfoData.MTSeq }, (res: any) => {
        this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-success'
        });
        this.router.navigate(['index/patrolpostemplate']);
      });
    }
  }
}
