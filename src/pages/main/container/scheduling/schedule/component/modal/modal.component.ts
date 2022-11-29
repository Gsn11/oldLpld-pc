import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    show: boolean;
    type: string;
    typeName = 0;
    Seq: number;
    @Output() updateData = new EventEmitter();
    title: string;
    userName: string;
    timeStart: string;
    User: number;
    timeEnd: string;
    dateStr: string;
    week: string;
    workTimeAbbrName : string;
    keySeq: string;
    List : any = [];
    nameSeq : number;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;
    }

    switchModalBox() {
        if(this.type == 'edit'){
            this.title = '班次修改';
        }else{
            this.title = '班次添加';
        }
        this.infoList();
        this.show = !this.show;
    }

    infoList(){
        let data = {};
        data = {
            CommonSearch: '',
            Name: '',
            State: ''
        };
        this.List = [];
        this.service.serviceR('workteamTime/13001', data, (res: any) => {
            this.List = res.Result.List;
        });
    }

    goCancel() {
        this.show = !this.show;
        
    }
    del(){
        let data = {};
        data = {
            Seq: this.Seq
        }
        this.service.serviceR('workteamSchedule/15005', data, (res: any) => {
            this.snackBar.open('删除成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
            this.show = !this.show;
            this.updateData.emit();
        }); 
    }
    userSave() {
        this.show = !this.show;
        let data = {};
        for(let i of this.List) {
            if(i.Seq == this.nameSeq){
                if(this.type == 'edit'){
                    data = {
                        Key: this.keySeq,
                        TimeStart: i.WorkStart,
                        TimeEnd: i.WorkEnd,
                        WorkTimeSeq: this.nameSeq,
                        WorkTimeName: i.Name,
                        WorkTimeAbbrName: i.AbbrName,
                        WorkTimeType: i.Type,
                        WorkTimeColor:i.Color
                    }
                }else{
                    data = {
                        User: this.User,
                        WorkDate:this.dateStr,
                        TimeStart: i.WorkStart,
                        TimeEnd: i.WorkEnd,
                        WorkTimeSeq: this.nameSeq,
                        WorkTimeName: i.Name,
                        WorkTimeAbbrName: i.AbbrName,
                        WorkTimeType: i.Type,
                        WorkTimeColor:i.Color
                    }
                }
            }
        }
        
        if(this.type == 'edit'){
            console.log(data)
            this.service.serviceR('workteamSchedule/15003', data, (res: any) => {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }else{
            this.service.serviceR('workteamSchedule/15002', data, (res: any) => {
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }
    }
}
