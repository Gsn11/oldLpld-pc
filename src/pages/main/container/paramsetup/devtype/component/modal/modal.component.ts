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
    newChildrenItem = new FormControl('', Validators.required);
    code = new FormControl();
    stateList: object;
    stateSelect: any;
    BDSeq: number;
    DTName: string;
    DTParent: number;
    buildData: any;
    @Output() updateData = new EventEmitter();
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.DTParent = 0;
        this.DTName = '';
        this.show = false;
        this.stateList = [
            { value: '正常', state: 0 },
            { value: '销毁', state: 1 },
        ];
        this.stateSelect = new FormControl('valid', [
            Validators.required,
        ]);
        this.BDSeq = 0;

        this.buildData = buildData;
    }

    switchModalBox() {
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.newChildrenItem.errors) {
            this.newChildrenItem.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data: any = {};
        data = {
            DTName: this.newChildrenItem.value,
            DTParent: this.DTParent
        };

        if (this.code && this.code.value) {
            data.Code = this.code.value;
        }

        this.service.serviceR('ent/params/devicetype/10502', data, (res: any) => {
            this.updateData.emit();
            this.snackBar.open('添加成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
        });

    }
    getnewChildrenItemErrorMessage() {
        return this.newChildrenItem.hasError('required') ? '请输入子类型名称' : '';
    }
}
