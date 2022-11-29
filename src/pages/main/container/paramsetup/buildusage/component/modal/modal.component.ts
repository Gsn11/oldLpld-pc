import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';
import buildData from '../../../../../../../environments/buildType';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    show: boolean;
    newChildrenCode = new FormControl('', Validators.required);
    newChildrenItem = new FormControl('', Validators.required);
    BDSeq: number;
    Name: string;
    Parent: string;
    @Output() updateData = new EventEmitter();
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.Parent = '0';
        this.Name = '';
        this.show = false;
        this.BDSeq = 0;
    }

    switchModalBox() {
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.newChildrenCode.errors) {
            this.newChildrenCode.markAsTouched({
                onlySelf: true
            });
            return;
        }
        if (this.newChildrenItem.errors) {
            this.newChildrenItem.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        data = {
            BUCode: this.newChildrenCode.value,
            BUDesc: this.newChildrenItem.value,
            BUParent: this.Parent
        };
        this.service.serviceR('ent/params/buildusage/10302', data, (res: any) => {
            this.updateData.emit();
            this.snackBar.open('添加成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
        });

    }
    getnewChildrenCodeErrorMessage() {
        return this.newChildrenItem.hasError('required') ? (buildData.buildType === '联排联调' ? '请输入水工建筑物分类代码' : '请输入建筑物分类代码') : '';
    }
    getnewChildrenItemErrorMessage() {
        return this.newChildrenItem.hasError('required') ? (buildData.buildType === '联排联调' ? '请输入水工建筑物分类名称' : '请输入建筑物分类名称') : '';
    }
}
