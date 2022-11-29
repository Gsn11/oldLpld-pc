import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../service/service';
import { BuildingDialogComponent } from '../../component/dialog/building-dialog/building-dialog.component';
import { DevicemodelDialogComponent } from '../../component/dialog/devicemodel-dialog/devicemodel-dialog.component';
import { ManyFileComponent } from '../../component/fileUpload/manyFile/manyFile.component';
import { UserManyDialogComponent } from '../../component/dialog/userMany-dialog/userMany-dialog.component';
import buildData from '../../../../../environments/buildType';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditMaterielComponent implements OnInit {
	buildData: any;
	deviceSeq: ''; // 物料流水号
	crumbsList: any = [];
	// 设备型号
	SelectDeviceModel = null;
	DeviceModelName = '';
	// 建筑物
	buildItem = null;
	buildName = '';
	// 文件
	oldImg = '';
	imgsrcData = [];
	docListData = [];
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	// 消息推送
	msgName = '';
	msgPersonList = [];
	//
	deviceNo = ''; // 编号
	name = ''; // 名称
	remark: ''; // 规格（备注）
	unit: ''; // 单位
	threshold: ''; // 阈值

	constructor(
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
		this.buildData = buildData;
	}

	ngOnInit() {
		const materielItem = JSON.parse(sessionStorage.getItem('materielItem'));

		this.deviceSeq = materielItem.Seq;

		this.deviceNo = materielItem.DeviceNo;
		this.name = materielItem.DeviceName;
		this.remark = materielItem.Remark;
		this.unit = materielItem.Unit;
		this.threshold = materielItem.Thresholds;
		this.msgName = materielItem.Mobile;
		// 型号
		this.SelectDeviceModel = {
			DMSeq: materielItem.ModelSeq
		};
		this.DeviceModelName = materielItem.Model;
		// 建筑
		this.buildItem = {
			Building: materielItem.BuildingSeq,
			Floor: materielItem.Floor,
			Zone: materielItem.Zone,
			SpacePos: materielItem.SpacePos,
		};
		this.buildName = materielItem.Building;
		// 图片
		this.oldImg = materielItem.Avatar;
		if (materielItem.Avatar) {
			this.imgsrcData = [{ ImgUrl: materielItem.Avatar }];
		} else {
			this.imgsrcData = [];
		}

		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '编辑物料', open: false }
		];
	}

	// 分页修改时响应方法
	// change(event: any) {
	//     this.pageIndex = event.pageIndex + 1;
	//     this.pageSize = event.pageSize;
	//     this.getList();
	// }

	goBack() {
		history.go(-1);
	}


	// 消息推送人员
	openMsgDialog() {
		const dialogRef = this.dialog.open(UserManyDialogComponent, {
			width: '1080px',
			data: {
				State: 0,
				title: '收件人'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				result = result[0].selected;
				this.msgPersonList = result;
				if (this.msgPersonList.length === 0) {
					this.msgName = '';
				} else {
					this.msgName = '';
					this.msgPersonList.forEach((item, index) => {
						index === 0 ? this.msgName += item.Name : this.msgName += ('，' + item.Name);
					});
				}
			}
		});
	}

	// 选择建筑物
	openBuildDialog(): void {
		const dialogRef = this.dialog.open(BuildingDialogComponent, {
			width: '1080px',
			data: { type: null }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.buildItem = result;
				this.buildName = result.BuildingName;
			} else {
				this.buildItem = null;
				this.buildName = buildData.buildType === '联排联调' ? '点击选择水工建筑群' : '点击选择建筑群';
			}
		});
	}

	// 选择设备型号
	openDeviceModelDialog(): void {
		const dialogRef = this.dialog.open(DevicemodelDialogComponent, {
			width: '1080px',
			data: { type: 6 }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.SelectDeviceModel = result;
				this.DeviceModelName = result.Id;
			} else {
				this.SelectDeviceModel = null;
				this.DeviceModelName = '';
			}
		});
	}

	// 添加物料
	addMateriel() {

		if (!this.deviceNo) {
			this.snackBar.open('请输入设备编号', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		if (!this.name) {
			this.snackBar.open('请输入设备名称', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		if (!this.DeviceModelName) {
			this.snackBar.open('请选择型号', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		// if (!this.remark) {
		//     this.snackBar.open('请输入规格', '确认', {
		//         duration: 1600,
		//         verticalPosition: 'top',
		//         panelClass: 'snack-bar-color-danger'
		//     });
		//     return false;
		// }

		// if (!this.unit) {
		//     this.snackBar.open('请输入单位', '确认', {
		//         duration: 1600,
		//         verticalPosition: 'top',
		//         panelClass: 'snack-bar-color-danger'
		//     });
		//     return false;
		// }

		// if (!this.buildItem) {
		//     this.snackBar.open('请选择建筑物', '确认', {
		//         duration: 1600,
		//         verticalPosition: 'top',
		//         panelClass: 'snack-bar-color-danger'
		//     });
		//     return false;
		// }

		// if (!this.threshold) {
		//     this.snackBar.open('请输入报警阈值', '确认', {
		//         duration: 1600,
		//         verticalPosition: 'top',
		//         panelClass: 'snack-bar-color-danger'
		//     });
		//     return false;
		// }

		const data: any = {
			Dseq: this.deviceSeq,
			DeviceNo: this.deviceNo, // 编号
			DeviceName: this.name, //  名称
			Model: this.SelectDeviceModel.DMSeq, // 型号
			Remark: this.remark, // (备注)规格
			Unit: this.unit, // 单位
			//
			// Building: this.buildItem.Building, // 建筑物
			// Floor: this.buildItem.Floor, // 安装在哪一层
			// Zone: this.buildItem.Zone, // 安装的楼层区域位置
			// SpacePos: this.buildItem.SpacePos, // 安装区域中的空间位置：吊顶，壁橱等
			//
			Thresholds: this.threshold,
			Mobile: '',
			// Avatar: this.imgsrcData.length > 0 && (this.imgsrcData[0].ImgUrl !== this.oldImg) ? this.imgsrcData[0].ImgUrl : '',
			// OldAvatar: this.imgsrcData.length > 0 && (this.imgsrcData[0].ImgUrl === this.oldImg) ? this.oldImg : ''
		};

		if (this.buildItem && this.buildItem.Building) {
			data.Building = this.buildItem.Building;
			data.Floor = this.buildItem.Floor;
			data.Zone = this.buildItem.Zone;
			data.SpacePos = this.buildItem.SpacePos;
		}

		this.msgPersonList.forEach(item => {
			!data.Mobile ? data.Mobile += item.UserTel : data.Mobile += (',' + item.UserTel);
		});

		if (this.imgsrcData.length > 0 && (this.imgsrcData[0].ImgUrl !== this.oldImg)) {
			data.Avatar = this.imgsrcData[0].ImgUrl;
		}

		if (this.imgsrcData.length > 0 && (this.imgsrcData[0].ImgUrl === this.oldImg)) {
			data.OldAvatar = this.oldImg;
		}

		this.service.serviceR('ent/material/6203', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('修改成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				history.go(-1);
			}
		});
	}
}
