import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss'],
})

export class TemplateComponent {
    treeModalShow: boolean;
    radioValue: number;
    @Input() MaintenanceTemplates: any;
    @Input() Items: any;
    @Input() BuildingSeq: number;
    @Output() getBuildings = new EventEmitter<any>();
    constructor(
        private snackBar: MatSnackBar,
    ) {
        this.treeModalShow = false;
        this.radioValue = null;
    }

    tamplateModalBox() {
        this.treeModalShow = !this.treeModalShow;
    }

    treeCancel() {
        this.treeModalShow = false;
        this.radioValue = null;
    }

    radioChange(seq: number) {
        if (this.radioValue === seq) {
            return;
        }
        this.radioValue = seq;
    }

    // 模板新增
    templateSave() {
        if (this.radioValue === null) {
            this.snackBar.open('请选择模版后确认', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        this.treeModalShow = !this.treeModalShow;
        let n = 0;
        for (const m of this.MaintenanceTemplates) {
            if (m.MTSeq === this.radioValue) {
                if (n === 0) {
                    n = 1;
                }
                for (const item of m.Items) {
                    this.Items.push(item);
                }
            }
        }
        this.getBuildings.emit(this.Items[0].Building);
        this.radioValue = null;
    }

}
