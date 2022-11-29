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
    SubjectionId = new FormControl('', Validators.required);
    Addr: string;
    type: string;
    Seq: number;
    title: string;
    @Output() updateData = new EventEmitter();
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;
        this.Addr = '';
    }

    switchModalBox() {
        if (this.type === 'add') {
            this.title = '添加归属区域';
            this.SubjectionId.setValue('');
            this.Addr = '';
        } else if (this.type === 'edit') {
            this.title = '修改归属区域';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.SubjectionId.errors) {
            this.SubjectionId.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                SubjectionId: this.SubjectionId.value,
                Addr: this.Addr,
            };
            this.service.serviceR('ent/subjection/3802', data, (res: any) => {
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        } else if (this.type === 'edit') {
            data = {
                SubjectionId: this.SubjectionId.value,
                Addr: this.Addr,
                Seq: this.Seq
            };
            this.service.serviceR('ent/subjection/3803', data, (res: any) => {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }
    }
    getSubjectionIdErrorMessage() {
        return this.SubjectionId.hasError('required') ? '请输入归属区域' : '';
    }
}
