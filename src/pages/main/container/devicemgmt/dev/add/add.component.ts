import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { BuildingDialogComponent } from '../../../component/dialog/building-dialog/building-dialog.component';
import { DevicemodelDialogComponent } from '../../../component/dialog/devicemodel-dialog/devicemodel-dialog.component';
import { CountDate } from '../../../../../common/utils/js/translateDate/CountDate';
import { SplitDate } from '../../../../../common/utils/js/translateDate/SplitDate';
import buildData from '../../../../../../environments/buildType';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	crumbsList: object;
	imgsrcData: object[] = [];
	docListData: object[] = [];
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
	stateList: object;
	stateSelect: any;
	DeviceExtno: string;
	SelectItem: any;
	BuildingType: string;
	DefalutName: string;
	DeviceModelName: string;
	DeviceType: string;
	MainType: number;
	LastMaintainDate: string;
	MaintainPeriod: string | number;
	keepDate: string;
	Isentver: boolean;
	buildData: any;
	assetNumber: any;
	assetName: any;
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
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = '设备管理';
			crumbsName = '通用设备管理';
			this.MainType = 0;
		} else if (this.DeviceType === 'secdev') {
			curmbsName1 = '设备管理';
			crumbsName = '安全器材管理';
			this.MainType = 7;
		} else if (this.DeviceType === 'gatewaydev') {
			curmbsName1 = 'IOT管理';
			crumbsName = '智联网关管理';
			this.MainType = 2;
		} else {
			curmbsName1 = '设备管理';
			crumbsName = '配件管理';
			this.MainType = 2;
		}
		this.SelectSubSys = new FormControl('');
		this.SelectAlertLevel = new FormControl('');
		this.crumbsList = [
			{ name: curmbsName1, open: false, url: '' },
			{ name: crumbsName, open: true, url: this.DeviceType },
			{ name: '添加', open: false, url: '' }
		];
		this.DeviceNo = '';
		this.DeviceName = '';
		this.Price = null;
		this.BuyDate = null;
		this.ManuDate = null;
		this.InstallDate = null;
		this.WarrantyExpire = null;
		this.Floor = '';
		this.Zone = '';
		this.SpacePos = '';
		this.ServiceLife = null;
		this.stateList = [
			{ value: '库存', state: 0 },
			{ value: '使用中', state: 1 },
			{ value: '报废', state: 2 },
			{ value: '停用', state: 4 },
			{ value: '大修', state: 5 }
		];
		this.stateSelect = new FormControl({
			value: 1,
			disabled: false
		});
		this.DeviceExtno = null;
		this.SelectItem = null;
		this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		if (!this.Isentver) {
			this.DefalutName = '点击选择建筑物';
		} else {
			this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑群' : '点击选择建筑群';
		}
		this.BuildingType = null;
		this.SelectDeviceModel = null;
		this.DeviceModelName = '请点击选择设备型号';
		this.LastMaintainDate = null;
		this.MaintainPeriod = null;
		this.keepDate = null;
		this.buildData = buildData;
	}

	ngOnInit() {
		const data = {
			State: 0
		};
		this.service.serviceR('ent/params/subsys/monitor/10901', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.SubSys = res.Result.SubSystems;
			}
		});
		const deviceData = {
			State: 0,
			MainType: this.MainType
		};
		this.service.serviceR('ent/params/alertlevel/11601', deviceData, (res: any) => {
			if (res.ResultCode === 0) {
				this.AlertLevel = res.Result.DevAlertLevels;
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
				this.DefalutName = result.BuildingName;
			} else {
				this.SelectItem = null;
				this.DefalutName = buildData.buildType === '联排联调' ? '点击选择水工建筑群' : '点击选择建筑群';
			}
		});
	}

	openDeviceModelDialog(): void {
		const dialogRef = this.dialog.open(DevicemodelDialogComponent, {
			width: '1080px',
			data: { type: (this.MainType === 1 || this.MainType === 0) ? '0,1' : this.MainType }
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
	goback() {
		this.router.navigate(['index/' + this.DeviceType]);
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
			if (!this.Isentver) {
				this.snackBar.open('请选择所在建筑设施', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			} else {
				this.snackBar.open('请选择所在地点', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			}
			return;
		}
		if (this.manyFile.docList) {
			this.manyFile.docList.forEach(item => {
				Reflect.set(item, 'ImgUrl', Reflect.get(item, 'DocUrl'));
				Reflect.set(item, 'ImgDesc', Reflect.get(item, 'DocDesc'));
			});
		}
		const data: IAddList = {
			AlertLevel: this.SelectAlertLevel.value ? this.SelectAlertLevel.value : null,  // 警报等级
			BSpaceSeq: this.SelectItem.BSSeq,
			Building: this.SelectItem.Building,
			BuyDate: this.BuyDate, // 购买时间
			DeviceName: this.DeviceName,  //  设备名称
			DeviceNo: this.DeviceNo, // 设备编号
			Floor: this.SelectItem.Floor,
			InstallDate: this.InstallDate, //  安装时间
			ManuDate: this.ManuDate, // 出厂时间
			Model: this.SelectDeviceModel.DMSeq,  // 设备流水号DMSeq
			Pics: [...this.manyFile.setImgsrcData, ...this.manyFile.docList],
			Price: this.Price,
			ServiceLife: this.ServiceLife,
			SpacePos: this.SelectItem.SpacePos,
			Stat: this.stateSelect.value,  // 状态
			SubSys: this.SelectSubSys.value,  //  所属子系统
			WarrantyExpire: this.WarrantyExpire,  // 设备寿命
			Zone: this.SelectItem.Zone,
			DeviceExtno: this.DeviceExtno,
			LastMaintainDate: this.LastMaintainDate,
			NextMaintainDate: this.keepDate,
			MaintainPeriod: this.MaintainPeriod,
			FactoryNo: this.factoryNum
		};

		if (this.assetName) {
			data.AssetsName = this.assetName;
		}

		if (this.assetNumber) {
			data.AssetsNo = this.assetNumber;
		}

		this.service.serviceR('ent/device/6002', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('添加成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.router.navigate(['index/' + this.DeviceType]);
			}
		});
	}
}
