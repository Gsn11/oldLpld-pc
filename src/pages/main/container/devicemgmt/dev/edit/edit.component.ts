import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IEditList } from './iEdit.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { BuildingDialogComponent } from '../../../component/dialog/building-dialog/building-dialog.component';
import { DevicemodelDialogComponent } from '../../../component/dialog/devicemodel-dialog/devicemodel-dialog.component';
import { CountDate } from '../../../../../common/utils/js/translateDate/CountDate';
import { SplitDate } from '../../../../../common/utils/js/translateDate/SplitDate';
import buildData from '../../../../../../environments/buildType';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
	// code = '';
	userInfo: any;
	bemInfoData: any;
	crumbsList: object;
	imgsrcData: object[] = [];
	docListData: object[] = [];
	oldImgsrcData: object[] = [];
	stateList: object;
	stateSelect: any;
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	DeviceNo: string;
	DeviceName: string;
	SubSys: any;  // 子系统
	SelectSubSys: any;
	SelectDeviceModel: any;
	Brands: any;
	Stat: any;
	SelectStat: any;
	AlertLevel: any;  //  报警系统等级
	SelectAlertLevel: any;
	Price: number;
	BuyDate: string;
	ManuDate: string;
	InstallDate: string;
	WarrantyExpire: string;
	Floor: string;
	Zone: string;
	SpacePos: string;
	ServiceLife: number;
	DeviceExtno: string;
	SelectItem: any;
	BuildingType: string;
	DefalutName: string;
	DeviceModelName: string;
	DeviceType: string;
	MainType: number;
	keepDate: string;
	LastMaintainDate: string;
	MaintainPeriod: string | number;
	GotoHistory: string;
	GotoHistoryState: string;
	buildData: any;
	assetNumber = '';
	assetName = '';
	factoryNum: any; // 出厂编号
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: Service,
		public dialog: MatDialog,
		private snackBar: MatSnackBar,
	) {
		route.data
			.subscribe(
				(res: any) => {
					this.DeviceType = res.type;
				}
			);
		let curmbsName1: string;
		let crumbsName: string;
		if (this.DeviceType === 'smartdev') {
			curmbsName1 = '设备管理';
			crumbsName = '智能设备管理';
			this.MainType = 1;
			this.GotoHistory = 'smartdev/history';
			this.GotoHistoryState = 'smartdev/historystate';
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = '设备管理';
			crumbsName = '通用设备管理';
			this.MainType = 0;
			this.GotoHistory = 'commdev/history';
			this.GotoHistoryState = 'commdev/historystate';
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = '设备管理';
			crumbsName = '安全器材管理';
			this.MainType = 0;
			this.GotoHistory = 'secdev/history';
			this.GotoHistoryState = 'secdev/historystate';
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = 'IOT管理';
			crumbsName = '智联网关管理';
			this.MainType = 2;
			this.GotoHistory = 'gatewaydev/history';
			this.GotoHistoryState = 'gatewaydev/historystate';
		} else if (this.DeviceType === 'sparepartsmgmt') {
			curmbsName1 = '设备管理';
			crumbsName = '备品/备件';
			this.MainType = 3;
			this.GotoHistory = 'sparepartsmgmt/history';
			this.GotoHistoryState = 'sparepartsmgmt/historystate';
		} else if (this.DeviceType === 'devpartsmgmt') {
			curmbsName1 = '设备管理';
			crumbsName = '配件管理';
			this.MainType = 4;
			this.GotoHistory = 'devpartsmgmt/history';
			this.GotoHistoryState = 'devpartsmgmt/historystate';
		}
		this.stateList = [
			{ value: '库存', state: 0 },
			{ value: '使用中', state: 1 },
			{ value: '报废', state: 2 },
			{ value: '停用', state: 4 },
			{ value: '大修', state: 5},
		];
		this.stateSelect = new FormControl('');
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
		console.log(this.bemInfoData);
		this.crumbsList = [
			{ name: curmbsName1, open: false, url: '' },
			{ name: crumbsName, open: true, url: this.DeviceType },
			{ name: '修改', open: false, url: '' }
		];
		this.SelectSubSys = new FormControl('');
		this.SelectAlertLevel = new FormControl('');
		this.DeviceNo = this.bemInfoData.DeviceNo ? this.bemInfoData.DeviceNo : '';
		// this.code = this.bemInfoData.Code ? this.bemInfoData.Code : '';
		this.DeviceNo = this.bemInfoData.DeviceNo ? this.bemInfoData.DeviceNo : '';
		this.assetNumber = this.bemInfoData.AssetsNo ? this.bemInfoData.AssetsNo : '';
		this.assetName = this.bemInfoData.AssetsName ? this.bemInfoData.AssetsName : '';
		this.Price = this.bemInfoData.Price ? this.bemInfoData.Price : null;
		this.BuyDate = this.bemInfoData.BuyDate ? this.bemInfoData.BuyDate : null;
		this.ManuDate = this.bemInfoData.ManuDate ? this.bemInfoData.ManuDate : null;
		this.LastMaintainDate = this.bemInfoData.LastMaintainDate ? this.bemInfoData.LastMaintainDate : '';
		this.keepDate = this.bemInfoData.NextMaintainDate ? this.bemInfoData.NextMaintainDate : null;
		this.MaintainPeriod = this.bemInfoData.MaintainPeriod ? this.bemInfoData.MaintainPeriod : null;
		this.InstallDate = this.bemInfoData.InstallDate ? this.bemInfoData.InstallDate : null;
		this.WarrantyExpire = this.bemInfoData.WarrantyExpire ? this.bemInfoData.WarrantyExpire : null;
		this.Floor = this.bemInfoData.Floor ? this.bemInfoData.Floor : null;
		this.Zone = this.bemInfoData.Zone ? this.bemInfoData.Zone : null;
		this.SpacePos = this.bemInfoData.SpacePos ? this.bemInfoData.SpacePos : null;
		this.ServiceLife = this.bemInfoData.ServiceLife ? this.bemInfoData.ServiceLife : null;
		this.DeviceExtno = this.bemInfoData.DeviceExtno ? this.bemInfoData.DeviceExtno : null;
		this.factoryNum = this.bemInfoData.FactoryNo ? this.bemInfoData.FactoryNo  : null;
		this.SelectItem = {
			BuildingName: this.bemInfoData.Building,
			Floor: this.bemInfoData.Floor,
			Zone: this.bemInfoData.Zone,
			SpacePos: this.bemInfoData.SpacePos,
			BSpaceSeq: this.bemInfoData.BSpaceSeq,
			Building: this.bemInfoData.BuildingSeq
		};
		const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		if (!Isentver) {
			this.DefalutName = '点击选择建筑物';
		} else {
			this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑群' : '点击选择建筑群';
		}
		this.BuildingType = null;
		this.SelectDeviceModel = {
			Id: this.bemInfoData.Model,
			FName: this.bemInfoData.Facturer,
			BRName: this.bemInfoData.Brand
		};
		this.DeviceModelName = this.bemInfoData.Model ? this.bemInfoData.Model : '请点击选择设备型号';
		this.buildData = buildData;
	}

	ngOnInit() {
		if (this.bemInfoData.Building) {
			this.DefalutName = this.SelectItem.BuildingName;
		}
		if (typeof this.bemInfoData.Stat === 'number') {
			this.stateSelect.setValue(this.bemInfoData.Stat);
		}
		this.searchImgList();
		const data = {
			State: 0
		};
		this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.SubSys = res.Result.SubSystems;
				this.SelectSubSys.setValue(this.bemInfoData.SubSysCode);
			}
		});
		this.service.serviceR('ent/params/alertlevel/11601', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res)
				this.AlertLevel = res.Result.DevAlertLevels;
				this.SelectAlertLevel.setValue(this.bemInfoData.AlertLevel);
			}
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(BuildingDialogComponent, {
			width: '1080px',
			data: { type: this.BuildingType }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.SelectItem = result;
				// tslint:disable-next-line:max-line-length
				// if (result.SpacePos === null) {
				//   result.SpacePos = '';
				// }
				this.DefalutName = result.BuildingName;
			} else {
				this.SelectItem = null;
				const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
				if (!Isentver) {
					this.DefalutName = '点击选择建筑物';
				} else {
					this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑群' : '点击选择建筑群';
				}
			}
		});
	}

	openDeviceModelDialog(): void {
		const dialogRef = this.dialog.open(DevicemodelDialogComponent, {
			width: '1080px',
			data: { type: this.MainType }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.SelectDeviceModel = result;
				this.DeviceModelName = result.Id;
			} else {
				this.SelectDeviceModel = null;
				this.DeviceModelName = '请点击选择设备型号';
			}
		});
	}

	searchImgList() {
		const data = {
			DSeq: this.bemInfoData.Seq,
			FromCache: false
		};
		this.service.serviceR('ent/device/6005', data, (res: any) => {
			if (res.ResultCode === 0) {
				const key = 'DeviceImages';
				// this.imgsrcData = res.Result[key];
				this.oldImgsrcData = Array.from(res.Result[key]);
				this.imgsrcData = [];
				res.Result[key].forEach(item => {
					if (item.ImgExt.toLowerCase() === 'png' || item.ImgExt.toLowerCase() === 'jpg' || item.ImgExt.toLowerCase() === 'gif') {
						this.imgsrcData.push(item);
					} else {
						Reflect.set(item, 'DocDesc', Reflect.get(item, 'ImgDesc'));
						Reflect.set(item, 'DocUrl', Reflect.get(item, 'ImgUrl'));
						this.docListData.push(item);
					}
				});
			}
		});
	}

	goback() {
		this.router.navigate(['index/' + this.DeviceType]);
	}

	gotoHistory() {
		Reflect.set(this.bemInfoData, 'editGotoHistory', true);
		localStorage.setItem('bemInfoData', JSON.stringify(this.bemInfoData));
		this.router.navigate(['index/' + this.GotoHistory]);
	}

	gotoHistoryState() {
		Reflect.set(this.bemInfoData, 'MainType', this.MainType);
		localStorage.setItem('bemHistoryStateData', JSON.stringify(this.bemInfoData));
		this.router.navigate(['index/' + this.GotoHistoryState]);
	}

	getBuyDate(data: string) {
		this.BuyDate = data;
	}

	getManuDate(data: string) {
		this.ManuDate = data;
	}

	getLastMaintainDate(data: string) {
		this.LastMaintainDate = data;
		this.keepDateChange(this.ServiceLife);
	}

	getInstallDate(data: string) {
		this.InstallDate = data;
	}

	getWarrantyExpire(data: string) {
		this.WarrantyExpire = data;
	}

	MaintainPeriodChange(event: any) {
		this.keepDateChange(event.target.value);
	}

	keepDateChange(value: number) {
		if (value > 0) {
			const newdate = new CountDate(new Date(this.LastMaintainDate).getTime(), value).differTime();
			this.keepDate = new SplitDate(new Date(newdate)).translate();
		} else {
			this.keepDate = null;
		}
		console.log(this.keepDate);
	}

	userSave() {
		if (!this.SelectDeviceModel) {
			this.snackBar.open('请选择设备型号', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (!this.SelectItem) {
			this.snackBar.open('请选择所在建筑设施', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		// this.snackBar.open('正在生成，请稍等', '确认', {
		//   duration: 1600,
		//   verticalPosition: 'top',
		//   panelClass: 'snack-bar-color-info'
		// });
		if (this.manyFile.docList) {
			this.manyFile.docList.forEach(item => {
				Reflect.set(item, 'ImgUrl', Reflect.get(item, 'DocUrl'));
				Reflect.set(item, 'ImgDesc', Reflect.get(item, 'DocDesc'));
				// Reflect.deleteProperty(item, 'DocUrl');
				// Reflect.deleteProperty(item, 'DocDesc');
				Reflect.set(item, 'DSeq', this.bemInfoData.Seq);
			});
		}
		const data: IEditList = {
			DSeq: this.bemInfoData.Seq,
			AlertLevel: this.SelectAlertLevel.value ? this.SelectAlertLevel.value : null,  // 警报等级
			BSpaceSeq: this.SelectItem.BSSeq,
			Building: this.SelectItem.Building,
			BuyDate: this.BuyDate, // 购买时间
			DeviceName: this.DeviceName,  //  设备名称
			DeviceNo: this.DeviceNo, // 设备编号
			Floor: this.SelectItem.Floor || '',
			InstallDate: this.InstallDate, //  安装时间
			ManuDate: this.ManuDate, // 出厂时间
			Model: this.SelectDeviceModel.DMSeq,  // 设备流水号DMSeq
			Pics: [...this.manyFile.setImgsrcData, ...this.manyFile.docList],
			OldPics: this.oldImgsrcData,
			Price: this.Price,
			ServiceLife: this.ServiceLife,
			SpacePos: this.SelectItem.SpacePos || '',
			Stat: this.stateSelect.value,  // 状态
			SubSys: this.SelectSubSys.value,  //  所属子系统
			WarrantyExpire: this.WarrantyExpire,  // 设备寿命
			Zone: this.SelectItem.Zone || '',
			DeviceExtno: this.DeviceExtno,
			LastMaintainDate: this.LastMaintainDate,
			NextMaintainDate: this.keepDate,
			MaintainPeriod: this.MaintainPeriod,
			FactoryNo: this.factoryNum
		};
		console.log(data);
		// return false;
		this.service.serviceR('ent/device/6003', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('修改成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.router.navigate(['index/' + this.DeviceType]);
			}
		});
	}
}
