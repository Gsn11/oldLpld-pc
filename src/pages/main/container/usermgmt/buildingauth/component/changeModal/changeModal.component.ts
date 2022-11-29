import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
    selector: 'app-changemodal',
    templateUrl: './changeModal.component.html',
    styleUrls: ['./changeModal.component.scss']
})

export class ChangeModalComponent {
    show: boolean;
    writeAllCheck: boolean;
    readAllCheck: boolean;
    title: string;
    @Input() setUsers: any;
    @Input() buildChoose: any;
    @Output() updateData = new EventEmitter();
    radioCheckIndex: number;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.title = '转移/创建责任人';
        this.show = false;
    }

    switchModalBox() {
        this.show = !this.show;
    }

    radioChange(index: number) {
        this.radioCheckIndex = index;
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        this.show = !this.show;
        const data = {
            BSeq: this.buildChoose.Seq,
            CSeq: this.buildChoose.Customer,
            NewUSeq: this.setUsers[this.radioCheckIndex].Seq,
            USeq: this.buildChoose.USeq
        };
        this.service.serviceR('ent/dataauth/7402', data, (res: any) => {
            this.snackBar.open('操作成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
            this.updateData.emit();
        });
    }
}
