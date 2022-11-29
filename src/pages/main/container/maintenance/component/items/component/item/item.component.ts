import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
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
	BuildingSeq: any;
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
	Isentver: boolean;
	constructor(
		public dialog: MatDialog,
		private snackBar: MatSnackBar,
	) {
		this.deviceType = null;
		this.deviceSelect = null;
		this.deviceName = '点击选择设备';
		this.BuildingType = null;
		this.SelectItem = null;
		this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		if (!this.Isentver) {
			this.DefalutName = '点击选择建筑物';
		} else {
			this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑' : '点击选择建筑';
		}
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
			data: { type: this.deviceType, buildingSeq: this.BuildingSeq }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deviceSelect = result;
				this.SelectItem = result;
				this.BuildingSeq = result.BuildingSeq;
				this.deviceName = result.DeviceName + ' - ' + result.DeviceNo + ' - ' + result.Model;
				this.DefalutName = '';
				this.DefalutName += result.Building ? result.Building : '';
				this.DefalutName += result.Floor ? ' - ' + result.Floor : '';
				this.DefalutName += result.Zone ? ' - ' + result.Zone : '';
				this.DefalutName += result.SpacePos ? ' - ' + result.SpacePos : '';
			} else {
				// this.BuildingSeq = '';
				this.deviceSelect = null;
				this.deviceName = '点击选择设备';
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
				this.BuildingSeq = result.Building;
				this.DefalutName += result.BuildingName ? result.BuildingName : '';
				this.DefalutName += result.Floor ? ' - ' + result.Floor : '';
				this.DefalutName += result.Zone ? ' - ' + result.Zone : '';
				this.DefalutName += result.SpacePos ? ' - ' + result.SpacePos : '';
			} else {
				this.SelectItem = null;
				if (!this.Isentver) {
					this.DefalutName = '点击选择建筑物';
				} else {
					this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑' : '点击选择建筑';
				}
				this.BuildingSeq = '';
			}
			this.deviceSelect = null;
			this.deviceName = '点击选择设备';
		});
	}

	// ----
	itemModalBox(type: string = 'add', index?: number) {
		this.Type = type;
		this.itemShow = !this.itemShow;
		if (type === 'add') {
			this.SelectItem = null;
			if (!this.Isentver) {
				this.DefalutName = '点击选择建筑物';
			} else {
				this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑' : '点击选择建筑';
			}
			this.SelectFeedbackType.setValue('');
			this.deviceName = '点击选择设备';
			this.Item = '';
		} else {
			this.Index = index;
			this.SelectItem = this.Items[index];
			this.BuildingSeq = this.SelectItem.Building;
			this.DefalutName = '';
			this.DefalutName += this.Items[index].BuildingName ? this.Items[index].BuildingName : '';
			this.DefalutName += this.Items[index].Floor ? ' - ' + this.Items[index].Floor : '';
			this.DefalutName += this.Items[index].Zone ? ' - ' + this.Items[index].Zone : '';
			this.DefalutName += this.Items[index].SpacePos ? ' - ' + this.Items[index].SpacePos : '';
			if (!this.DefalutName) {
				if (!this.Isentver) {
					this.DefalutName = '点击选择建筑物';
				} else {
					this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑' : '点击选择建筑';
				}
			}
			console.log('有的');
			if (this.Items[index].FeedbackType && this.Items[index].FeedbackType.toString()) {
				console.log('有的');
				this.SelectFeedbackType.setValue(this.Items[index].FeedbackType.toString());
			} else if (this.Items[index].FeedbackType === 0) {
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
		// console.log(this.SelectItem);
		if (!this.SelectItem) {
			if (!this.Isentver) {
				this.snackBar.open('请选择所在建筑设施', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			} else {
				this.snackBar.open(buildData.buildType === '联排联调' ? '请选择所在水工建筑' : '请选择所在建筑', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			}
			return;
		}
		if (!this.deviceSelect) {
			// this.snackBar.open('请选择设备', '确认', {
			//     duration: 1600,
			//     verticalPosition: 'top',
			//     panelClass: 'snack-bar-color-danger'
			// });
			// return;
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
		// console.log(this.deviceSelect);
		const temp = {
			DeviceName: this.deviceSelect === null ? '' : this.deviceSelect.DeviceName,
			DeviceNo: this.deviceSelect === null ? '' : this.deviceSelect.DeviceNo,
			Item: this.Item,
			FeedbackType: this.SelectFeedbackType.value,
			Space: this.SelectItem.Space || this.SelectItem.BSSeq || this.SelectItem.BSpaceSeq
		};
		// Space: this.SelectItem.BSSeq
		if (this.deviceSelect) {
			if (this.deviceSelect.Seq) {
				Reflect.set(temp, 'Device', this.deviceSelect.Seq);
			} else if (this.deviceSelect.Device) {
				Reflect.set(temp, 'Device', this.deviceSelect.Device);
			} else {
				Reflect.set(temp, 'Device', '');
			}
		} else {
			Reflect.set(temp, 'Device', '');
		}
		// console.log(this.deviceSelect);
		Reflect.set(temp, 'CName', this.SelectItem.CName);
		Reflect.set(temp, 'BuildingName', this.SelectItem.BuildingName || this.SelectItem.Building);
		Reflect.set(temp, 'Floor', this.SelectItem.Floor);
		Reflect.set(temp, 'Zone', this.SelectItem.Zone);
		Reflect.set(temp, 'SpacePos', this.SelectItem.SpacePos);
		Reflect.set(temp, 'Building', this.BuildingSeq);
		if (this.Type === 'add') {
			this.Items.push(temp);
		} else {
			this.Items[this.Index] = temp;
		}
		console.log(this.SelectItem);
		console.log(temp);
		this.getBuildings.emit(this.Items[0].Building);
		this.itemShow = !this.itemShow;
	}
}
