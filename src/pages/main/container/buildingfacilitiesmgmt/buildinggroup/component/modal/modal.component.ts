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
    buildData: any;
    show: boolean;
    BGName = new FormControl('', Validators.required);
    Addr = new FormControl('', Validators.required);
    code = new FormControl();
    type: string;
    stateList: object;
    stateSelect: any;
    stateTypeList: object;
    stateSelectType: any;
    Seq: number;
    title: string;
    @Output() updateData = new EventEmitter();
    Isentver: boolean;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        this.show = false;
        this.stateList = [
            { value: '正常', state: 0 },
            { value: '销毁', state: 1 },
        ];
        this.stateSelect = new FormControl('valid', [
            Validators.required,
        ]);
        let pageName: string;
        if (!this.Isentver) {
            pageName = '建筑设施群';
        } else {
            pageName = buildData.buildType === '联排联调' ? '水工建筑群' : '建筑群';
        }
        this.stateTypeList = [
            { value: '园区', state: '0' },
            { value: pageName, state: '1' },
        ];
        this.stateSelectType = new FormControl('valid', [
            Validators.required,
        ]);
        this.type = 'add';
        this.Seq = 0;

        this.buildData = buildData;
    }

    switchModalBox() {
        if (this.type === 'add') {
            if (!this.Isentver) {
                this.title = '添加园群';
            } else {
                this.title = '添加管理所';
            }
            this.BGName.setValue('');
            this.Addr.setValue('');
            this.stateSelectType.setValue('');
        } else if (this.type === 'edit') {
            if (!this.Isentver) {
                this.title = '修改园群';
            } else {
                this.title = '修改管理所';
            }
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.BGName.errors) {
            this.BGName.markAsTouched({
                onlySelf: true
            });
            return;
        }
        if (this.Addr.errors) {
            this.Addr.markAsTouched({
                onlySelf: true
            });
            return;
        }
        console.log(this.stateSelectType.value);
        if (!this.stateSelectType.value) {
            this.snackBar.open('请选择类型！', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
            return;
        }
        this.show = !this.show;
        let data: any = {};
        if (this.type === 'add') {
            data = {
                BGName: this.BGName.value,
                Addr: this.Addr.value,
                BGType: this.stateSelectType.value
            };

            if (this.code) {
                data.BGCode = this.code.value;
            }

            this.service.serviceR('ent/buildgroup/5102', data, (res: any) => {
                this.snackBar.open('添加成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        } else if (this.type === 'edit') {
            data = {
                BGName: this.BGName.value,
                Addr: this.Addr.value,
                BGType: this.stateSelectType.value === 'valid' ? '' : this.stateSelectType.value.toString(),
                BGSeq: this.Seq
            };

            if (this.code) {
                data.BGCode = this.code.value;
            }

            this.service.serviceR('ent/buildgroup/5103', data, (res: any) => {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }
    }
    getBGNameErrorMessage() {
        if (this.BGName.hasError('required')) {
            if (!this.Isentver) {
                return '请输入园群名称';
            } else {
                return '请输入管理所名称';
            }
        } else {
            return '';
        }
    }

    getAddrErrorMessage() {
        if (this.Addr.hasError('required')) {
            if (!this.Isentver) {
                return '请输入园群地址';
            } else {
                return '请输入管理所地址';
            }
        } else {
            return '';
        }
    }
}
