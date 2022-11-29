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
    busidomainName = new FormControl('', Validators.required);
    type: string;
    BDSeq: number;
    title: string;
    @Output() updateData = new EventEmitter();
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.BDSeq = 0;
    }

    switchModalBox() {
        if (this.type === 'add') {
            this.busidomainName.setValue('');
            this.title = '添加行业';
        } else if (this.type === 'edit') {
            this.title = '修改行业';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.busidomainName.errors) {
            this.busidomainName.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                BDName: this.busidomainName.value
            };
            this.service.serviceR('ent/params/busidomain/11502', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        } else if (this.type === 'edit') {
            data = {
                BDSeq: this.BDSeq,
                BDName: this.busidomainName.value
            };
            this.service.serviceR('ent/params/busidomain/11503', data, (res: any) => {
                this.updateData.emit();
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            });
        }
    }
    getbusidomainNameErrorMessage() {
        return this.busidomainName.hasError('required') ? '请输入行业名称' : '';
    }
}
