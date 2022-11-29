import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDialogComponent } from '../../../../../component/dialog/device-dialog/device-dialog.component';
import { BuildingDialogComponent } from '../../../../../component/dialog/building-dialog/building-dialog.component';
import buildData from '../../../../../../../../environments/buildType';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})

export class ItemComponent implements OnInit {
    deviceType: string;
    deviceSelect: any;
    deviceName: string;
    BuildingType: string;
    SelectItem: any;
    DefalutName: string;
    Type: string;
    @Input() itemShow: boolean;
    FeedbackType: any;
    SelectFeedbackType: any;
    Item: any;
    Index: number;
    @Input() Items: any;
    @Output() getBuildings = new EventEmitter<any>();
    constructor(
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
        this.deviceType = null;
        this.deviceSelect = null;
        this.deviceName = '点击选择设备';
        this.BuildingType = null;
        this.SelectItem = null;
        this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑物' : '点击选择建筑物';
        this.itemShow = false;
        this.FeedbackType = [
            { name: '布尔型', state: '0' },
            { name: '数值型', state: '1' },
            { name: '文本型', state: '2' },
        ];
        this.SelectFeedbackType = new FormControl('');
        this.Item = null;
        this.Index = null;
        this.Items = [];
    }

    ngOnInit() {

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeviceDialogComponent, {
            width: '1080px',
            data: { type: this.deviceType }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deviceSelect = result;
                this.deviceName = result.DeviceName + ' - ' + result.DeviceNo + ' - ' + result.Model;
            } else {
                this.deviceSelect = null;
                this.deviceName = '请点击选择设备';
            }
        });
    }

    openBuildDialog(): void {
        const dialogRef = this.dialog.open(BuildingDialogComponent, {
            width: '1080px',
            data: { type: this.BuildingType }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.SelectItem = result;
                this.DefalutName = '';
                this.DefalutName += result.BuildingName ? result.BuildingName : '';
                this.DefalutName += result.Floor ? ' - ' + result.Floor : '';
                this.DefalutName += result.Zone ? ' - ' + result.Zone : '';
                this.DefalutName += result.SpacePos ? ' - ' + result.SpacePos : '';
            } else {
                this.SelectItem = null;
                this.DefalutName = '请点击选择设备';
            }
        });
    }

    // ----
    itemModalBox(type: string = 'add', index?: number) {
        this.Type = type;
        this.itemShow = !this.itemShow;
        if (type === 'add') {
            this.SelectItem = null;
            this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑' : '点击选择建筑';
            this.SelectFeedbackType.setValue('');
            this.deviceName = '点击选择设备';
            this.Item = '';
        } else {
            this.Index = index;
            this.SelectItem = this.Items[index];
            this.DefalutName = '';
            this.DefalutName += this.Items[index].BuildingName ? this.Items[index].BuildingName : '';
            this.DefalutName += this.Items[index].Floor ? ' - ' + this.Items[index].Floor : '';
            this.DefalutName += this.Items[index].Zone ? ' - ' + this.Items[index].Zone : '';
            this.DefalutName += this.Items[index].SpacePos ? ' - ' + this.Items[index].SpacePos : '';
            if (this.Items[index].FeedbackType && this.Items[index].FeedbackType.toString()) {
                this.SelectFeedbackType.setValue(this.Items[index].FeedbackType.toString());
            } else {
                this.SelectFeedbackType.setValue('');
            }
            this.deviceSelect = this.Items[index];
            if (this.deviceSelect.DeviceNo) {
                this.deviceName = this.deviceSelect.DeviceName + ' - ' + this.deviceSelect.DeviceNo;
            } else {
                this.deviceName = '点击选择设备';
            }
            this.Item = this.Items[index].Item;
        }
    }

    itemCancel() {
        this.itemShow = false;
    }

    // 条目新增
    userSave() {
        if (!this.SelectItem) {
            this.snackBar.open(buildData.buildType === '联排联调' ? '请选择所在水工建筑' : '请选择所在建筑', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.deviceSelect) {
            this.snackBar.open('请选择设备', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
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
        const temp = {
            Device: this.deviceSelect.Seq,
            DeviceName: this.deviceSelect.DeviceName,
            DeviceNo: this.deviceSelect.DeviceNo,
            Item: this.Item,
            FeedbackType: this.SelectFeedbackType.value,
            Space: this.deviceSelect.value
        };
        Reflect.set(temp, 'CName', this.SelectItem.CName);
        Reflect.set(temp, 'BuildingName', this.SelectItem.BuildingName);
        Reflect.set(temp, 'Floor', this.SelectItem.Floor);
        Reflect.set(temp, 'Zone', this.SelectItem.Zone);
        Reflect.set(temp, 'SpacePos', this.SelectItem.SpacePos);
        Reflect.set(temp, 'Building', this.SelectItem.Building);
        if (this.Type === 'add') {
            this.Items.push(temp);
        } else {
            this.Items[this.Index] = temp;
        }
        this.getBuildings.emit(this.Items[0].BuildingSeq);
        this.itemShow = !this.itemShow;
    }
}
