import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SingleFileComponent } from '../../../../component/fileUpload/singleFile/singleFile.component';
import { RequestService } from '../../../../../../service/request';
import buildData from '../../../../../../../environments/buildType';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    buildData: any;
    show: boolean;
    SName = new FormControl('', Validators.required);
    code = new FormControl();
    type: string;
    Seq: number;
    modalSrc: string;
    systemTitle: string;
    @Output() updateData = new EventEmitter();
    @ViewChild(SingleFileComponent, null) singleFile: SingleFileComponent;
    constructor(
        private requestService: RequestService
    ) {
        this.show = false;
        this.type = 'add';
        this.Seq = 0;

        this.buildData = buildData;
    }

    switchModalBox() {
        if (this.type === 'add') {
            this.systemTitle = '添加子系统';
            this.singleFile.setImgsrc = '';
            this.SName.setValue('');
        } else if (this.type === 'edit') {
            this.systemTitle = '修改子系统';
        }
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        if (this.SName.errors) {
            this.SName.markAsTouched({
                onlySelf: true
            });
            return;
        }
        this.show = !this.show;
        let data: any = {};
        if (this.type === 'add') {
            data = {
                SName: this.SName.value,
                SParent: null,
            };
            if (this.singleFile.setImgsrc) {
                Reflect.set(data, 'Img', this.singleFile.setImgsrc);
            }

            if (this.code) {
                data.Code = this.code.value;
            }

            this.requestService.request('ent/params/subsys/10902', data)
                .subscribe(
                    (res: any) => {
                        this.updateData.emit();
                    },
                    (error: any) => {
                        console.error(error);
                    }
                );
        } else if (this.type === 'edit') {
            data = {
                Seq: this.Seq,
                SName: this.SName.value,
                Img: this.singleFile.setImgsrc,
                OldImg: this.modalSrc
            };

            if (this.code) {
                data.Code = this.code.value;
            }

            this.requestService.request('ent/params/subsys/10903', data)
                .subscribe(
                    (res: any) => {
                        this.updateData.emit();
                    },
                    (error: any) => {
                        console.error(error);
                    }
                );
        }
    }
    getSNameErrorMessage() {
        return this.SName.hasError('required') ? '请输入子系统名称' : '';
    }
}
