import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SingleFileComponent } from '../component/fileUpload/singleFile/singleFile.component';
import { CalendarComponent } from '../component/calendar/calendar.component';
import { ManyFileComponent } from '../component/fileUpload/manyFile/manyFile.component';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../service/service';

@Component({
    selector: 'app-userinfo',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
    bemUserInfo: any;
    userinfo: any;
    loginId: string;
    isAdmin: boolean;
    RoleName: string;  // 角色
    TeamJobName: string; // 岗位
    barIndex: number;
    userName: any;
    userPhone: any;
    userEmail: string;
    sideMoveLineTop: string;
    crumbsList: object;
    sexList: object;
    sex: any;
    imgsrc: string = null;
    imgsrcData: object[] = null;
    oldImgsrcData: object[] = [];
    createDate: string;
    date: any;
    @ViewChild(SingleFileComponent, null) singleFile: SingleFileComponent;
    @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
    @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
    userOldPwd: any;
    userNewPwd: any;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.bemUserInfo = null;
        this.userName = new FormControl('', [Validators.required]);
        this.userPhone = new FormControl('', [Validators.required]);
        this.userOldPwd = new FormControl('', [Validators.required]);
        this.userNewPwd = new FormControl('', [Validators.required]);
        this.isAdmin = false;
        this.sexList = [
            { value: '女', state: '1' },
            { value: '男', state: '0' },
        ];
        this.sex = new FormControl('', Validators.required);
        this.barIndex = 0;
        this.userinfo = [
            { name: '修改资料', state: 1, },
            { name: '密码修改', state: 0, }
        ];
        this.sideMoveLineTop = '11px';
    }

    ngOnInit() {
        this.searchUserInfo();
    }

    // 资料选项卡切换
    activeSwitchBar(index: number) {
        this.barIndex = index;
        const top = index * 40 + 11;
        this.sideMoveLineTop = `${top}px`;
    }

    searchUserInfo() {
        const data = {
            FromCache: false
        };
        this.service.serviceR('user/self/1001', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.bemUserInfo = res.Result.Users[0];
                const oldInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
                const avatar = this.bemUserInfo.Avatar;
                oldInfo.Avatar = avatar;
                localStorage.setItem('bemUserInfo', JSON.stringify(oldInfo));
                this.loginId = this.bemUserInfo.LoginId;
                this.isAdmin = this.bemUserInfo.IsAdmin;
                this.userName.setValue(this.bemUserInfo.Name);
                this.userPhone.setValue(this.bemUserInfo.UserTel);
                this.sex.setValue(this.bemUserInfo.Sex.toString());
                this.userEmail = this.bemUserInfo.UserEmail ? this.bemUserInfo.UserEmail : '';
                this.createDate = this.bemUserInfo.CreateTime ? (this.bemUserInfo.CreateTime).substr(0, 10) : '';
                this.imgsrc = this.bemUserInfo.Avatar ? this.bemUserInfo.Avatar : '';

                const dataRole = {
                    State: 0,
                    USeq: this.bemUserInfo.Seq
                };
                this.service.serviceR('ent/cususer/4007', dataRole, (roleRes: any) => {
                    if (roleRes.ResultCode === 0) {
                        this.RoleName = roleRes.Result.CustomerUserRoles;
                    }
                });
            }
        });
        this.service.serviceR('ent/user/1005', data, (res: any) => {
            if (res.ResultCode === 0) {
                if (res.Result.UserImages.length !== 0) {
                    this.imgsrcData = res.Result.UserImages;
                    this.oldImgsrcData = Array.from(res.Result.UserImages);
                } else {
                    this.imgsrcData = [];
                    this.oldImgsrcData = [];
                }
            }
        });
        this.service.serviceR('ent/user/1006', data, (res: any) => {
            if (res.ResultCode === 0) {
                if (res.Result.UserTeamJobs.length !== 0) {
                    this.TeamJobName = `${res.Result.UserTeamJobs[0].TName} - ${res.Result.UserTeamJobs[0].JName}`;
                } else {
                    this.TeamJobName = '';
                }
            }
        });
    }

    goback() {
        window.history.back();
    }

    userSave() {
        if (this.userPhone.errors) {
            this.userPhone.markAsTouched({
                onlySelf: true
            });
            this.snackBar.open('请输入正确的手机号', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
            });
            return;
        }

        if (this.userName.errors) {
            this.userName.markAsTouched({
                onlySelf: true
            });
            this.snackBar.open('请输入正确的姓名', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
            });
            return;
        }
        const data = {
            Birthday: this.calendar.selectDate,
            Email: this.userEmail,
            Name: this.userName.value,
            OldPics: this.oldImgsrcData,
            Pics: this.manyFile.setImgsrcData,
            Sex: !this.sex.value ? '' : this.sex.value,
            Tel: this.userPhone.value,
            USeq: this.bemUserInfo.Seq,
        };
        if (this.singleFile.setImgsrc) {
            Reflect.set(data, 'Avatar', this.singleFile.setImgsrc);
            Reflect.set(data, 'OldAvatar', this.bemUserInfo.Avatar);
        }
        this.service.serviceR('ent/user/1003', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-info'
                });
                this.searchUserInfo();
            }
        });
    }

    pwdSave() {
        if (this.userOldPwd.errors) {
            this.userOldPwd.markAsTouched({
                onlySelf: true
            });
            this.snackBar.open('请输入旧密码', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
            });
            return;
        }

        if (this.userNewPwd.errors) {
            this.userNewPwd.markAsTouched({
                onlySelf: true
            });
            this.snackBar.open('请输入新密码', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
            });
            return;
        }
        const data = {
            OldPassword: this.userOldPwd.value,
            Password: this.userNewPwd.value
        };
        this.service.serviceR('ent/user/1008', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-info'
                });
            }
        });
    }

    getUserPhoneErrorMessage() {
        return this.userPhone.hasError('required') ? '请输入手机号' : '';
    }

    getUserNameErrorMessage() {
        return this.userName.hasError('required') ? '请输入姓名' : '';
    }

    getUserOldPwdErrorMessage() {
        return this.userOldPwd.hasError('required') ? '请输入旧密码' : '';
    }

    getUserNewPwdErrorMessage() {
        return this.userNewPwd.hasError('required') ? '请输入新密码' : '';
    }
}
