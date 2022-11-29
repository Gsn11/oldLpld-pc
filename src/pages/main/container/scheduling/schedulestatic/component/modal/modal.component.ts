import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    unfoldId: string;
    list:any ={
        Name: '',
        LoginId: "",
        RestCount: 0,
        RestList: [],
        Seq: 0,
        State: 0,
        UserTel: "",
        WorkDays: 0,
        WorkHours: 0,
        WorkList: []
    };
    @Output() updateData = new EventEmitter();
    title: string;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
    }

    unfold(e){
        if( this.unfoldId == e ){
            this.unfoldId = '-1';
        }else{
            this.unfoldId = e;
        }
    }

    switchModalBox() {
        if (this.type === 'duty') {
            this.title = '查看上班统计';
        } else if (this.type === 'leave') {
            this.title = '查看请假统计';
        }else{
            this.title = '查看值班统计';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

}
