import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../../service/service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    show: boolean;
    MCode = new FormControl('', Validators.required);
    MDesc = new FormControl('', Validators.required);
    oldMCode: string;
    type: string;
    JSeq: number;
    @Output() updateData = new EventEmitter();
    title: string;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.JSeq = 0;
    }

    switchModalBox() {
        if (this.type === 'add') {
            this.title = '添加度量变量';
            this.MCode.setValue('');
            this.MDesc.setValue('');
        } else if (this.type === 'edit') {
            this.title = '修改度量变量';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.MDesc.errors) {
            this.MDesc.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                MCode: this.MCode.value,
                MDesc: this.MDesc.value
            };
            this.service.serviceR('ent/params/metrics/11002', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        } else if (this.type === 'edit') {
            data = {
                MCode: this.oldMCode,
                MDesc: this.MDesc.value,
                newMcode: this.MCode.value,
            };
            this.service.serviceR('ent/params/metrics/11003', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        }
    }
    getMCodeErrorMessage() {
        return this.MCode.hasError('required') ? '请输入度量变量' : '';
    }
    getMDescErrorMessage() {
        return this.MCode.hasError('required') ? '请输入变量说明' : '';
    }
}
