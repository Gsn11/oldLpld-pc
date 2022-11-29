import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Service } from '../../../../../../../service/service';
import { DeviceManyDialogComponent } from '../../../../../component/dialog/devicemany-dialog/devicemany-dialog.component';

@Component({
	selector: 'app-spacetree',
	templateUrl: './spacetree.component.html',
	styleUrls: ['./spacetree.component.scss'],
	animations: [
		trigger('firstSwitch', [
			state('open', style({
				margin: '5px 0 0 0',
				display: 'block'
			})),
			state('closed', style({
				margin: '0 0 0 0',
				display: 'none'
			})),
			transition('open => closed', [
				animate('0s')
			]),
			transition('closed => open', [
				animate('0.24s')
			])
		])
	]
})

export class SpacetreeComponent implements OnInit {
	deviceType: string;
	deviceSelect: any;
	deviceName: string;
	pageSizeOptions: number[];
	paginatorTotal: number;
	pageIndex: number;
	pageSize: number;
	spaceModalShow: boolean;
	Devices: any;
	allIsCheck: boolean;
	indeterminate: boolean;
	@Input() Builds: any;
	@Input() MaintenanceTemplates: any;
	SelectMaintenanceTemplates: any;
	@Input() Items: any;
	BuildingSeq: number;
	checkBuildingIndex: number;
	BuildSpacesList: any;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	@Output() getBuildings = new EventEmitter<any>();
	constructor(
		private service: Service,
		private dialog: MatDialog
	) {
		this.Devices = [];
		this.deviceType = null;
		this.deviceSelect = null;
		this.deviceName = '点击选择设备';
		this.allIsCheck = false;
		this.indeterminate = false;
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.checkBuildingIndex = null;
		this.SelectMaintenanceTemplates = new FormControl('');
	}

	ngOnInit() {
		for (const b of this.Builds) {
			Reflect.set(b, 'uChoose', false);
			Reflect.set(b, 'uSwitch', false);
			Reflect.set(b, 'uChildren', []);
		}
	}

	// 右边上方调用设备多选方法
	openDialog(): void {
		const dialogRef = this.dialog.open(DeviceManyDialogComponent, {
			width: '1080px',
			data: {
				type: this.deviceType,
				buildingSeq: this.BuildingSeq
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result.selected.length > 0) {
				this.deviceSelect = result.selected;
				if (result.selected.length === 1) {
					this.deviceName = result.selected[0].DeviceName;
				} else {
					this.deviceName = result.selected[0].DeviceName + '...';
				}
				this.BuildingSeq = result.selected[0].BuildingSeq;
				this.getBuildingSpace();
			} else {
				this.deviceSelect = null;
				this.deviceName = '请点击选择设备';
			}
		});
	}

	clearDeviceData() {
		this.deviceSelect = null;
		this.deviceName = '请点击选择设备';
		this.getBuildingSpace();
	}

	// 伸缩左边菜单项目并获取菜单下的子项目
	checkBuild(seq: number, index: number) {
		console.log(seq);
		this.BuildingSeq = seq;
		this.checkBuildingIndex = index;
		this.allIsCheck = false;
		this.indeterminate = false;
		const temp = !this.Builds[index].uSwitch;
		if (temp === false) {
			Reflect.set(this.Builds[index], 'uSwitch', temp);
			Reflect.set(this.Builds[index], 'uChoose', temp);
		} else if (temp === true) {
			for (const b of this.Builds) {
				Reflect.set(b, 'uChoose', false);
			}
			Reflect.set(this.Builds[index], 'uSwitch', temp);
			Reflect.set(this.Builds[index], 'uChoose', temp);
		}
		// 查询空间位置所含设列表
		const data = {
			Building: seq,
			State: 0,
		};
		this.pageIndex = 1;
		this.pageSize = 10;
		this.getBuildingSpace();
		this.service.serviceR('ent/buildspace/5302', data, (res: any) => {
			if (res.ResultCode === 0) {
				if (res.Result.BuildSpaces.length === 0) {
					return;
				}
				this.BuildSpacesList = res.Result.BuildSpaces;
				for (const b of this.BuildSpacesList) {
					Reflect.set(b, 'uChoose', false);
				}
				Reflect.set(this.Builds[this.checkBuildingIndex], 'uChildren', this.BuildSpacesList);
			}
		});
	}

	// 点击左边首项目获取相关设备方法
	// 这个方法和上面一个方法是点击时同时使用，并且这个方法会被其他方法调用
	getBuildingSpace() {
		this.allIsCheck = false;
		this.indeterminate = false;
		for (const b of this.Builds) {
			Reflect.set(b, 'uChoose', false);
			if (b.uChildren && b.uChildren.length !== 0) {
				for (const uc of b.uChildren) {
					Reflect.set(uc, 'uChoose', false);
				}
			}
		}
		const data = {
			Building: this.BuildingSeq,
			State: 0,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};
		if (this.deviceSelect) {
			if (this.deviceSelect.length > 0) {
				let t = '';
				for (const d of this.deviceSelect) {
					t += d.Seq + ',';
				}
				t = t.substr(0, t.length - 1);
				Reflect.set(data, 'DeviceSeq', t);
			} else {
				Reflect.set(data, 'DeviceSeq', this.deviceSelect[0].Seq);
			}
		}
		this.service.serviceR('ent/buildspace/monitor/5303', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.Devices = res.Result.Devices;
				for (const d of this.Devices) {
					Reflect.set(d, 'uCheck', false);
				}
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	spaceModalBox() {
		this.spaceModalShow = !this.spaceModalShow;
		this.deviceSelect = null;
		this.deviceName = '请点击选择设备';
		this.BuildingSeq = null;
	}

	spaceCancel() {
		this.spaceModalShow = false;
		for (const b of this.Builds) {
			Reflect.set(b, 'uChoose', false);
			Reflect.set(b, 'uSwitch', false);
		}
		this.Devices = [];
	}

	// 点击左边子项目获取相关设备方法
	switchBuildSpaceItem(seq: number, buildIndex: number, itemIndex: number) {
		this.allIsCheck = false;
		this.indeterminate = false;
		for (const b of this.Builds) {
			Reflect.set(b, 'uChoose', false);
			if (b.uChildren && b.uChildren.length !== 0) {
				for (const uc of b.uChildren) {
					Reflect.set(uc, 'uChoose', false);
				}
			}
		}
		Reflect.set(this.Builds[buildIndex].uChildren[itemIndex], 'uChoose', true);

		this.pageIndex = 1;
		this.pageSize = 10;
		const data = {
			BuildingSpace: seq,
			State: 0,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
		};
		if (this.deviceSelect) {
			if (this.deviceSelect.length > 0) {
				let t = '';
				for (const d of this.deviceSelect) {
					t += d.Seq + ',';
				}
				t = t.substr(0, t.length - 1);
				Reflect.set(data, 'DeviceSeq', t);
			} else {
				Reflect.set(data, 'DeviceSeq', this.deviceSelect[0].Seq);
			}
		}
		this.service.serviceR('ent/buildspace/monitor/5303', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.paginatorTotal = res.Result.Total;
				if (res.Result.Devices.length === 0) {
					this.Devices = null;
					return;
				}
				this.Devices = res.Result.Devices;
				for (const d of this.Devices) {
					Reflect.set(d, 'uCheck', false);
				}
			}
		});
	}

	checkAll(event: any) {
		for (const d of this.Devices) {
			d.uCheck = event.checked;
		}
	}

	checkItem() {
		const len = this.Devices.length;
		let sum = 0;
		for (const d of this.Devices) {
			if (d.uCheck === true) {
				sum += 1;
			} else {
				sum -= 1;
			}
		}
		if (sum === len) {
			this.indeterminate = false;
			this.allIsCheck = true;
		} else if (sum < len && sum > -Math.abs(len)) {
			this.allIsCheck = false;
			this.indeterminate = true;
		} else if (sum === -Math.abs(len)) {
			this.indeterminate = false;
			this.allIsCheck = false;
		}
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getBuildingSpace();
	}

	// 空间位置新增
	spaceChoose() {
		this.spaceModalShow = false;
		let n = 0;
		if (this.Devices) {
			for (const d of this.Devices) {
				if (d.uCheck === true) {
					const temp = {};
					Reflect.set(temp, 'BuildingName', d.Building);
					Reflect.set(temp, 'Floor', d.Floor);
					Reflect.set(temp, 'Zone', d.Zone);
					Reflect.set(temp, 'SpacePos', d.SpacePos);
					Reflect.set(temp, 'Building', d.BuildingSeq);
					if (n === 0) {
						n = 1;
					}
					Reflect.set(temp, 'DeviceName', d.DeviceName);
					Reflect.set(temp, 'Device', d.Seq);
					Reflect.set(temp, 'DeviceNo', d.DeviceNo);
					Reflect.set(temp, 'Space', d.BSpaceSeq);
					if (this.SelectMaintenanceTemplates.value) {
						this.SelectMaintenanceTemplates.value.map((item: any) => {
							const t = {
								...temp
							};
							Reflect.set(t, 'FeedbackType', item.FeedbackType);
							Reflect.set(t, 'Item', item.Item);
							this.Items.push(t);
						});
					} else {
						if (!d.Item) {
							Reflect.set(temp, 'Item', '维护');
						}
						if (!d.FeedbackType) {
							Reflect.set(temp, 'FeedbackType', '2');
						}
						this.Items.push(temp);
					}
				}
			}
			this.getBuildings.emit(this.Items[0].Building);
			this.Devices = [];
			for (const b of this.Builds) {
				if (b.uChildren && b.uChildren.length !== 0) {
					for (const uc of b.uChildren) {
						Reflect.set(uc, 'uChoose', false);
					}
				}
				Reflect.set(b, 'uSwitch', false);
				Reflect.set(b, 'uChoose', false);
			}
			this.paginatorTotal = 0;
		}
	}
}
