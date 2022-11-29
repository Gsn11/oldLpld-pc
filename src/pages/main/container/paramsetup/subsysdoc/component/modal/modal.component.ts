import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';
import { Service } from '../../../../../../service/service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    show: boolean;
    SName: string;
    Seq: number;
    modalSrc: string;
    systemTitle: string;
    @Output() updateData = new EventEmitter();
    @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
    // imgsrcData: object[] = [];
    docList: object[];
    oldDoc: object[];
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.SName = '';
    }

    switchModalBox() {
        this.systemTitle = '修改子系统';
        this.oldDoc = Array.from(this.docList);
        this.show = !this.show;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        this.show = !this.show;
        const nowImageData = [];
        if (this.manyFile.docList.length > 0) {
            this.manyFile.docList.map((item: any) => {
                const t = {};
                Reflect.set(t, 'DocUrl', item.DocUrl);
                Reflect.set(t, 'DocDesc', item.DocDesc);
                nowImageData.push(t);
            });
            console.log(nowImageData);
        }
        const data = {
            SubsysSeq: this.Seq,
            Docs: nowImageData,
            OldDocs: this.oldDoc,
        };
        this.service.serviceR('ent/params/subsysdoc/11003', data, (res: any) => {
            this.snackBar.open('操作成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
            this.updateData.emit();
        });
    }
}
