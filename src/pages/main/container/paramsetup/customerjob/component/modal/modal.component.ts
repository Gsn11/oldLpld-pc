import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
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
    JName = new FormControl('', Validators.required);
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
            this.title = '添加岗位';
            this.JName.setValue('');
        } else if (this.type === 'edit') {
            this.title = '修改岗位';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.JName.errors) {
            this.JName.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                JName: this.JName.value
            };
            this.service.serviceR('ent/params/job/10702', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        } else if (this.type === 'edit') {
            data = {
                JSeq: this.JSeq,
                JName: this.JName.value,
            };
            this.service.serviceR('ent/params/job/10703', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        }
    }
    getJNameErrorMessage() {
        return this.JName.hasError('required') ? '请输入岗位名称' : '';
    }
}
