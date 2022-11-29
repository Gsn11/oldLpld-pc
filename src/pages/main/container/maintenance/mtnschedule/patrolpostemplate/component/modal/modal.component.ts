import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../../service/service';
import { BuildingDialogComponent } from '../../../../../component/dialog/building-dialog/building-dialog.component';


@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
    customer: number;
    show: boolean;
    Parent: number;
    Item: string;
    FeedbackType: any;
    SelectFeedbackType: any;
    @Input() Items: any;
    Type: string;
    Index: number;
    BuildingType: any;
    SelectItem: any;
    DefalutName: string;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.show = false;
        this.Item = null;
        this.FeedbackType = [
            { name: '布尔型', state: '0' },
            { name: '数值型', state: '1' },
            { name: '文本型', state: '2' },
        ];
        this.SelectFeedbackType = new FormControl('');
        this.Index = null;
        this.BuildingType = null;
        this.SelectItem = null;
        this.DefalutName = '请点击选择设备';
    }

    openBuildDialog() {
        const dialogRef = this.dialog.open(BuildingDialogComponent, {
            width: '1080px',
            data: { type: this.BuildingType }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
                this.SelectItem = result;
                this.DefalutName = '';
                this.DefalutName += result.BuildingName ? result.BuildingName : '';
                this.DefalutName += result.Floor ? ' - ' + result.Floor : '';
                this.DefalutName += result.Zone ? ' - ' + result.Zone : '';
                this.DefalutName += result.SpacePos ? ' - ' + result.SpacePos : '';
            } else {
                this.SelectItem = null;
                this.DefalutName = '请点击选择设施位置';
            }
        });
    }

    switchModalBox(type: string = 'add', index?: number) {
        this.Type = type;
        this.show = !this.show;
        if (type === 'add') {
            this.SelectItem = null;
            this.DefalutName = '请点击选择设施位置';
            this.SelectFeedbackType.setValue('');
            this.Item = null;
        } else {
            this.Index = index;
            this.SelectItem = this.Items[index];
            this.DefalutName = '';
            this.DefalutName += this.Items[index].BuildingName ? this.Items[index].BuildingName : '';
            this.DefalutName += this.Items[index].Floor ? ' - ' + this.Items[index].Floor : '';
            this.DefalutName += this.Items[index].Zone ? ' - ' + this.Items[index].Zone : '';
            this.DefalutName += this.Items[index].SpacePos ? ' - ' + this.Items[index].SpacePos : '';
            this.SelectFeedbackType.setValue(this.Items[index].FeedbackType.toString());
            console.log(this.Items);
            this.Item = this.Items[index].Item;
        }
    }

    goCancel() {
        this.show = !this.show;
    }

    userSave() {
        // if (!this.SelectItem) {
        //     this.snackBar.open('请选择设施位置', '确认', {
        //         duration: 1600,
        //         verticalPosition: 'top',
        //         panelClass: 'snack-bar-color-danger'
        //     });
        //     return;
        // }
        if (this.Item === '' || this.Item === null) {
            this.snackBar.open('请输入条目', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.SelectFeedbackType.value) {
            this.snackBar.open('请选择反馈类型', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        let temp;
        if (this.SelectItem) {
            temp = {
                ...this.SelectItem,
                Item: this.Item,
                FeedbackType: this.SelectFeedbackType.value,
                Space: this.SelectItem.BSSeq ? this.SelectItem.BSSeq : this.SelectItem.Space,
            };
        } else {
            temp = {
                Item: this.Item,
                FeedbackType: this.SelectFeedbackType.value,
            };
    }
        console.log(temp);
        if (this.Type === 'add') {
            this.Items.push(temp);
        } else {
            this.Items[this.Index] = temp;
        }
        this.show = !this.show;
    }
}
