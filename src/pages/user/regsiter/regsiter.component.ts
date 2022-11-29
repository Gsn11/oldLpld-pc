import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RegsiterService } from './regsiter.service';
import { IRegsiterInterface } from './regsiter.interface';

@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrls: ['./regsiter.component.scss'],
  providers: [RegsiterService],
})
export class RegsiterComponent {
  Name = new FormControl('', Validators.required);  // 企业名称
  LegalPerson = new FormControl('', Validators.required);   // 联系人
  userCode = new FormControl('', Validators.required);  // 验证码
  Tel = new FormControl('', Validators.required);   // 联系电话
  codeImg: string;    // 验证码默认图片
  Addr: string;
  ReffererCode: string;
  checkIsSetInformation: boolean;
  LoginId = new FormControl('', Validators.required);
  isError: boolean;
  errorMsg: string;
  constructor(
    private regsiterService: RegsiterService,
    private router: Router,
  ) {
    this.Addr = null;
    this.ReffererCode = null;
    this.checkIsSetInformation = true;
    this.errorMsg = null;
    this.isError = false;
  }

  telChanger() {
    if (this.Tel.value.length >= 11) {
      this.checkIsSetInformation = false;
    } else {
      this.checkIsSetInformation = true;
    }
  }

  gotoPlant(): void {
    this.isError = false;
    if (this.Name.errors) {
      this.Name.markAsTouched({
        onlySelf: true
      });
      return;
    }

    if (this.LegalPerson.errors) {
      this.LegalPerson.markAsTouched({
        onlySelf: true
      });
      return;
    }

    if (this.Tel.errors) {
      this.Tel.markAsTouched({
        onlySelf: true
      });
      return;
    }

    if (this.LoginId.errors) {
      this.LoginId.markAsTouched({
        onlySelf: true
      });
      return;
    }

    const regsiterData: IRegsiterInterface = {
      Name: this.Name.value,
      ReffererCode: this.ReffererCode,
      Addr: this.Addr,
      Tel: parseInt(this.Tel.value, null),
      LegalPerson: this.LegalPerson.value,
      LoginId: this.LoginId.value,
      RecommendCode: this.LoginId.value
    };
    this.regsiterService.setRegister(regsiterData)
      .subscribe(
        (res: any) => {
          this.errorMsg = '提交成功，我们会尽快处理，请耐心等待！';
          this.isError = true;
        },
        (error: any) => {
          if (error.error.ResultCode === 3007002) {
            this.errorMsg = '企业登录名已存在，请勿重复提交！';
          } else if (error.error.ResultCode === 3007003) {
            this.errorMsg = '企业名称已存在，请勿重复提交！';
          }
          this.isError = true;
          throw error;
        }
      );
  }

  hiddenErrorBox() {
    this.isError = false;
  }

  getNameErrorMessage() {
    return this.Name.hasError('required') ? '请输入企业名称' : '';
  }
  getLegalPersonErrorMessage() {
    return this.LegalPerson.hasError('required') ? '请输入联系人' : '';
  }
  getUserCodeErrorMessage() {
    return this.userCode.hasError('required') ? '请输入验证码' : '';
  }
  getTelErrorMessage() {
    return this.Tel.hasError('required') ? '请输入联系电话' : '';
  }
  getLoginIdErrorMessage() {
    return this.LoginId.hasError('required') ? '请输入登录名' : '';
  }

  goWlyIntroducePage() {
    this.router.navigate(['']);
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }
}
