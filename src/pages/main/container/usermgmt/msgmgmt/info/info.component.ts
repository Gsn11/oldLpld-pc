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
  userPower: boolean;
  imgsrcData: object[] = [];
  attach: object[] = [];
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.manyFileUseType = 'info';
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    if (this.bemInfoData.hasOwnProperty('attach')) {
      this.attach = JSON.parse(this.bemInfoData.attach);
    }
    if (this.bemInfoData.hasOwnProperty('pics')) {
      this.imgsrcData = JSON.parse(this.bemInfoData.pics);
    }
    this.crumbsList = [
      { name: '用户管理', open: false, url: '' },
      { name: '推送消息管理', open: true, url: 'msgmgmt' },
      { name: '查看', open: false, url: '' }
    ];
  }

  goback() {
    this.router.navigate(['index/msgmgmt']);
  }
}
