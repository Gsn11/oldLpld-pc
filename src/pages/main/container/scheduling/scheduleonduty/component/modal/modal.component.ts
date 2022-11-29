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
    typeName = 0;
    Seq: number;
    @Output() updateData = new EventEmitter();
    title: string;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;
    }

    switchModalBox() {
        this.title = '班次修改';
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                LevelType: this.typeName 
            };
            this.service.serviceR('ent/params/alertlevel/11602', data, (res: any) => {
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
