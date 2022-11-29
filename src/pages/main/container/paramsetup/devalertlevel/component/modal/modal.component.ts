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
    Name = new FormControl('', Validators.required);
    type: string;
    typeName = 0;
    Seq: number;
    @Output() updateData = new EventEmitter();
    title: string;
    buildData: any;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;

        this.buildData = buildData;
    }

    switchModalBox() {
        if (this.type === 'add') {
            this.title = '添加报警等级';
            if (this.buildData.buildType === '东南水厂') {
                this.title = '添加ABC等级';
            }
            this.Name.setValue('');
        } else if (this.type === 'edit') {
            this.title = '修改报警等级';
            if (this.buildData.buildType === '东南水厂') {
                this.title = '修改ABC等级';
            }
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.Name.errors) {
            this.Name.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data = {};
        if (this.type === 'add') {
            data = {
                AlertLevelName: this.Name.value,
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
        } else if (this.type === 'edit') {
            data = {
                Seq: this.Seq,
                AlertLevelName: this.Name.value,
                LevelType: this.typeName
            };
            this.service.serviceR('ent/params/alertlevel/11603', data, (res: any) => {
                this.snackBar.open('修改成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
                this.updateData.emit();
            });
        }
    }
    getNameErrorMessage() {
        return this.Name.hasError('required') ? '请输入报警等级' : '';
    }
}
