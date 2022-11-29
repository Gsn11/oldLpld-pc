import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IAddList } from './iAdd.interface';
import * as forge from 'node-forge';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  crumbsList: object;
  htmlString: string;
  AgreementType: any;
  SelectAgreementType: any;
  Title: string;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '法律协议文本', open: true, url: 'agreement' },
      { name: '添加', open: false, url: '' }
    ];
    this.SelectAgreementType = new FormControl('', Validators.required);
    this.AgreementType = [
      { type: '0', name: '维客协议' },
      { type: '1', name: '运营方协议' },
      { type: '2', name: '服务方协议' },
    ];
    this.Title = null;
    this.htmlString = null;
  }

  goback() {
    this.router.navigate(['index/agreement']);
  }

  userSave() {
    if (!this.SelectAgreementType.value) {
      this.snackBar.open('请选择协议类型', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    if (!this.Title) {
      this.snackBar.open('请输入协议标题', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    if (!this.htmlString) {
      this.snackBar.open('请输入协议内容', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    const data: IAddList = {
      Type: this.SelectAgreementType.value,
      Title: this.Title,
      Text: this.getBase64String()
    };
    console.log(data);
    this.service.serviceR('ent/params/agreement/11802', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/agreement']);
      }
    });
  }

  getBase64String() {
    const code = forge.util.createBuffer(this.htmlString, 'utf8').bytes();
    const base64 = forge.util.encode64(code);
    return base64;
  }
}
