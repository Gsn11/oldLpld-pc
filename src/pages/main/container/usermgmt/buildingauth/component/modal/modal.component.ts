import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    show: boolean;
    writeAllCheck: boolean;
    readAllCheck: boolean;
    @Input() title: string;
    @Input() setUsers: any;
    @Output() updateData = new EventEmitter();
    @Input() type: string;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.show = false;
        this.writeAllCheck = false;
        this.readAllCheck = false;
    }

    switchModalBox() {
        this.show = !this.show;
    }

    checkAll(event: any, type: string) {
        if (type === 'w') {
            for (const s of this.setUsers) {
                Reflect.set(s, 'AuditWrite', event.checked);
            }
        } else if (type === 'r') {
            for (const s of this.setUsers) {
                this.writeAllCheck = event.checked;
                Reflect.set(s, 'AuditRead', event.checked);
                Reflect.set(s, 'AuditWrite', event.checked);
            }
        }
    }

    checkItem(event: any, type: string, index: number) {
        if (type === 'w') {
            Reflect.set(this.setUsers[index], 'AuditWrite', event.checked);
        } else if (type === 'r') {
            if (event.checked === true) {
                Reflect.set(this.setUsers[index], 'AuditRead', event.checked);
                Reflect.set(this.setUsers[index], 'AuditWrite', event.checked);
            } else {
                Reflect.set(this.setUsers[index], 'AuditRead', event.checked);
            }
        }
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        const data = [];
        console.log(this.setUsers);
        for (const s of this.setUsers) {
            const item = {};
            if (s.AuditRead) {
                Reflect.set(item, 'AuditRead', s.AuditRead);
            }
            if (s.AuditWrite) {
                Reflect.set(item, 'AuditWrite', s.AuditWrite);
            }

            Reflect.set(item, 'BSeq', s.BSeq);
            Reflect.set(item, 'Customer', s.CSeq);
            Reflect.set(item, 'SubsysSeq', s.SubsysSeq);
            Reflect.set(item, 'USeq', s.USeq);
            data.push(item);
        }
        const setData = {};
        Reflect.set(setData, 'Audits', data);
        this.show = !this.show;
        let str: string;
        if (this.type === 'userSystem') {
            str = 'ent/dataauth/7407';
        } else if (this.type === 'system') {
            str = 'ent/dataauth/7404';
        }
        console.log(setData);
        this.service.serviceR(str, setData, (res: any) => {
            this.snackBar.open('操作成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-success'
            });
            this.updateData.emit();
        });
    }
}
