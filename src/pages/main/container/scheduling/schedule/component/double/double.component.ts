import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import buildData from '../../../../../../../environments/buildType';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';

@Component({
    selector: 'app-double',
    templateUrl: './double.component.html',
    styleUrls: ['./double.component.scss']
})

export class DoubleComponent {
    show: boolean;
    Name = new FormControl('', Validators.required);
    displayedColumns = ['id', 'nameLogin', 'name', 'phone', 'status'];
    type: string;
    typeName = 0;
    saveUserData = {ids: '', names: ''};
    Seq: number;
    userList = [];
    dateChange:number = 0;
    BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期
    @Output() updateData = new EventEmitter();
    title: string;
    buildData: any;
    dates: any;
    dateSeq: number;
    constructor(
        public dialog: MatDialog,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;

        this.buildData = buildData;
    }

    switchModalBox() {
        this.title = '班次批量修改';
        this.infoList(this.type,0);
        this.show = !this.show;
    }

    infoList(type,statusType){
        let data = {};
        data = {
            CommonSearch: '',
            Name: '',
            State: '',
            Type: this.dateChange == 1 ? 0 : 1
        };
        this.dates = [];
        this.service.serviceR('workteamTime/13001', data, (res: any) => {
            this.dates = res.Result.List;
            if(type != 'edit'){
                this.dateSeq = res.Result.List[0].Seq;
            }else if (type == 'edit' && statusType == 1){
                this.dateSeq = res.Result.List[0].Seq;
            }
        });
    }

    dateSelect(e){
    let statusType = 0;
    if(this.type == 'edit'){
        statusType = 1
    }
     this.dateChange  = e;
     this.infoList(this.type,statusType);
    }

    userListDelete(i){
        const oldData = [...this.userList];
        oldData.splice(i,1);
        this.userList = oldData;
        this.saveUserData = {ids: '', names: ''};
        const ids = []; const names = [];
        for ( const i of this.userList) {
            ids.push(i.Seq);
            names.push(i.Name);
        }
        this.saveUserData.ids = ids.join();
        this.saveUserData.names = names.join();
    }

    openUserModelDialog() {
        const data = {
            State: 0,
            title: '选择工作人员'
        };
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '1080px',
            data: { ...data }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const oldData = [...this.userList];
                this.saveUserData = {ids: '', names: ''};
                const ids = []; const names = [];
                if (this.type === 'edit'){
                   for(let i of result){
                    var num = i.Seq
                    var isExist = false
                    for(let j of this.userList){
                        var n = j.Seq
                        if(n === num){
                            isExist = true
                            break;  
                        }
                       }
                       if (!isExist) {
                        oldData.push(i);
                        this.userList = oldData;
                      }else{
                        this.snackBar.open('人员已存在', '确认', {
                            duration: 1600,
                            verticalPosition: 'top',
                            panelClass: 'snack-bar-color-success'
                        }); 
                      }
                   }
                }else{
                    this.userList = result
                }
                for ( const i of this.userList) {
                    ids.push(i.Seq);
                    names.push(i.Name);
                }
                this.saveUserData.ids = ids.join();
                this.saveUserData.names = names.join();
                // this.ChooseUserName = `${result.LoginId} - ${result.Name} - ${result.UserTel}`;
            } else {
                this.saveUserData = {ids: '', names: ''};
            }
        });
    }

    goCancel() {
        this.show = !this.show;
    }

    getBeginTime(data: string) {
		this.BeginTime = data;
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}

    userSave() {
        if (this.Name.errors) {
            this.Name.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                Desc: this.Name.value,
                Type:this.dateChange == 0 ? 1 : 0,
                StartDate: this.BeginTime,
                EndDate: this.EndTime,
                TeamTime: this.dateSeq,
                Users : this.saveUserData.ids
            };
            this.service.serviceR('holiday/17002', data, (res: any) => {
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        } else if (this.type === 'edit') {
           if(this.saveUserData.ids == ''){
            const ids = [];
            for ( const i of this.userList) {
                ids.push(i.Seq);
            }
            this.saveUserData.ids = ids.join();
           }
            data = {
                Holiday: this.Seq,
                Desc: this.Name.value,
                Type:this.dateChange,
                Date: this.BeginTime,
                TeamTime: this.dateSeq,
                Users : this.saveUserData.ids
            };
            this.service.serviceR('holiday/17003', data, (res: any) => {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }
        location.reload();
    }
    getNameErrorMessage() {
        return this.Name.hasError('required') ? '请输入节日描述' : '';
    }
}
