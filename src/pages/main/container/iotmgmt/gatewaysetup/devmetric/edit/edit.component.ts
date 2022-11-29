import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IBacnet, IMODBUS, IOPC, IOBIX, IBem } from './iEdit.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { DeviceDialogComponent } from '../../../../component/dialog/device-dialog/device-dialog.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
	userInfo: any;
	bemInfoData: any;
	crumbsList: object;
	deviceInfo: any;
	SelectDevices: any;
	SelectDevicesNo: any;
	SelectBoxDevFullName: any;
	Metrics: any;
	SelectMetrics: any;
	IsAlert: any;
	SelectIsAlert: any;
	BacnetObjects: any;
	SelectBacnetObjects: any;
	BacnetDevId: any;
	SelectBacnetDevId: any;
	DMBDesc: string;
	Formula: string;
	UploadFormula: string;
	AlertFormula: string;
	// 0
	BacnetDeviceId: string; // BACNET协议中的device id
	BacnetObjectId: string; // BACNET协议中的测量点object id
	// 1
	SlaveId: number;
	Register: any;
	SelectRegister: any;
	ValType: any;
	SelectValType: any;
	StartAddr: number;
	BigEndian: any;
	SelectBigEndian: any;
	// 2, 3
	OPCItem: string;
	ProtocolVer: any;
	SelectProtocolVer: any;
	Ip: string;
	Port: number;
	ClsId: string;
	Quantity: number;
	// 4
	UrlItem: string;
	// 5
	Item: string;
	// --
	deviceName: string;
	deviceNoName: string;
	boxDevFullName: string;
	pageType: string;

	SelectDevicesOld: any;
	SelectDevicesNoOld: any;
	SelectBoxDevFullNameOld: any;
	SelectMetricsOld: any;
	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private service: Service,
		private route: ActivatedRoute
	) {
		route.data
			.subscribe(
				(res: any) => {
					this.pageType = res.type;
				}
			);
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
		this.crumbsList = [
			{ name: 'IOT管理', open: false, },
			{ name: '智联网关', open: false, },
			{ name: '监测点管理', open: true, url: 'devmetric' },
			{ name: this.pageType === 'edit' ? '修改' : '添加', open: false, }
		];
		this.deviceInfo = JSON.parse(localStorage.getItem('bemDevice'));
		this.SelectDevices = new FormControl('');
		this.SelectDevicesNo = new FormControl('');
		this.SelectBoxDevFullName = new FormControl('');
		this.SelectMetrics = new FormControl('');
		this.SelectIsAlert = new FormControl('');
		this.IsAlert = [
			{ name: '数据点', id: '0' },
			{ name: '报警点', id: '1' }
		];
		this.SelectBacnetObjects = new FormControl({
			value: 'device',
			disabled: true
		});
		this.SelectBacnetDevId = new FormControl({
			value: 'analog-input',
			disabled: false
		});
		this.ProtocolVer = [0, 1];
		this.SelectProtocolVer = new FormControl('');
		this.Register = [0, 1, 2, 3];
		this.SelectRegister = new FormControl('');
		this.ValType = [
			{ name: '整形类型', id: '0' },
			{ name: '浮点类型', id: '1' },
		];
		this.SelectValType = new FormControl('');
		this.BigEndian = [0, 1];
		this.SelectBigEndian = new FormControl('');
		this.DMBDesc = null;
		this.Formula = null;
		this.UploadFormula = null;
		this.AlertFormula = null;
		this.BacnetDeviceId = null;
		this.BacnetObjectId = null;
		this.SlaveId = null;
		this.StartAddr = null;
		this.Quantity = null;
		this.OPCItem = null;
		this.Ip = null;
		this.Port = null;
		this.ClsId = null;
		this.UrlItem = null;
		this.Item = null;
		this.deviceName = '请点击选择对接的智能设备';
		this.deviceNoName = '请点击选择设备';
		this.boxDevFullName = '请选择归属箱/柜箱';
	}

	ngOnInit() {
		if (this.pageType === 'edit') {
			this.deviceName = this.bemInfoData.SmartDevName + ' - ' + this.bemInfoData.SmartDevNo;
			this.SelectDevices = {
				DeviceNo: this.bemInfoData.SmartDevNo
			};
			this.SelectDevicesOld = {
				DeviceNo: this.bemInfoData.SmartDevNo
			};
			this.deviceNoName = this.bemInfoData.DevName + ' - ' + this.bemInfoData.DeviceNo;
			this.SelectDevicesNo = {
				DeviceNo: this.bemInfoData.DeviceNo
			};
			this.SelectDevicesNoOld = {
				DeviceNo: this.bemInfoData.DeviceNo
			};
			if (this.bemInfoData.BoxDevName || this.bemInfoData.BoxDevNo) {
				this.boxDevFullName = (this.bemInfoData.BoxDevName ? this.bemInfoData.BoxDevName : '') + ' - ' +
					(this.bemInfoData.BoxDevNo ? this.bemInfoData.BoxDevNo : '');
			} else {
				this.boxDevFullName = '请选择归属箱/柜箱';
			}
			this.SelectBoxDevFullName = {
				DeviceNo: this.bemInfoData.BoxDevNo
			};
			this.SelectBoxDevFullNameOld = {
				DeviceNo: this.bemInfoData.BoxDevNo
			};
			this.SelectMetrics = new FormControl({
				value: this.bemInfoData.Id,
				disabled: false
			});
			this.SelectMetricsOld = new FormControl({
				value: this.bemInfoData.Id,
				disabled: false
			});
			this.SelectIsAlert = new FormControl({
				value: this.bemInfoData.IsAlert.toString(),
				disabled: false
			});
			if (this.bemInfoData.BacnetDevId) {
				this.BacnetDeviceId = this.bemInfoData.BacnetDevId.split(' ')[1];
			}
			if (this.bemInfoData.BacnetObjectId) {
				this.SelectBacnetObjects = new FormControl({
					value: this.bemInfoData.BacnetDevId.split(' ')[0],
					disabled: true
				});
			}
			if (this.bemInfoData.BacnetObjectId) {
				this.SelectBacnetDevId = new FormControl({
					value: this.bemInfoData.BacnetObjectId.split(' ')[0],
					disabled: false
				});
				this.BacnetObjectId = this.bemInfoData.BacnetObjectId.split(' ')[1];
			}
			this.SelectProtocolVer = new FormControl({
				value: this.bemInfoData.ProtocolVer,
				disabled: false
			});
			if (this.bemInfoData.Register) {
				this.SelectRegister = new FormControl({
					value: this.bemInfoData.Register,
					disabled: false
				});
			}
			if (this.bemInfoData.ValType) {
				this.SelectValType = new FormControl({
					value: this.bemInfoData.ValType.toString(),
					disabled: false
				});
			}
			this.SelectBigEndian = new FormControl({
				value: this.bemInfoData.BigEndian,
				disabled: false
			});
			this.DMBDesc = this.bemInfoData.DMOBDesc;
			this.Formula = this.bemInfoData.Formula;
			this.UploadFormula = this.bemInfoData.UploadFormula;
			this.AlertFormula = this.bemInfoData.AlertFormula;
			this.SlaveId = this.bemInfoData.SlaveId;
			this.StartAddr = this.bemInfoData.StartAddr;
			this.Quantity = this.bemInfoData.Quantity;
			this.OPCItem = this.bemInfoData.Item;
			this.Ip = this.bemInfoData.Ip;
			this.Port = this.bemInfoData.Port;
			this.ClsId = this.bemInfoData.ClsId;
			this.UrlItem = this.bemInfoData.Item;
			this.Item = this.bemInfoData.Item;
		}
		const data = {
			State: 0
		};
		this.service.serviceR('ent/params/metrics/11001', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.Metrics = res.Result.Metrics;
			}
		});
		this.service.serviceR('ent/params/bacnetobject/11101', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.BacnetObjects = Array.from(res.Result.BacnetObjects);
				this.BacnetDevId = Array.from(res.Result.BacnetObjects);
			}
		});
	}

	openDialog(deviceType: string, isType?: string): void {
		const dialogRef = this.dialog.open(DeviceDialogComponent, {
			width: '1080px',
			data: { type: deviceType }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (deviceType === '1') {
					this.SelectDevices = result;
					this.deviceName = result.DeviceName + ' - ' + result.DeviceNo;
				} else if (deviceType === '0,1' && isType !== '3') {
					this.SelectDevicesNo = result;
					this.deviceNoName = result.DeviceName + ' - ' + result.DeviceNo;
				} else if (deviceType === '0,1' && isType === '3') {
					this.SelectBoxDevFullName = result;
					this.boxDevFullName = result.DeviceName + ' - ' + result.DeviceNo;
				}
			} else {
				if (deviceType === '1') {
					this.SelectDevices = null;
					this.deviceName = '请点击选择对接的智能设备';
				} else if (deviceType === '0,1' && isType !== '3') {
					this.SelectDevicesNo = null;
					this.deviceNoName = '请点击选择设备';
				} else if (deviceType === '0,1' && isType === '3') {
					this.SelectBoxDevFullName = null;
					this.boxDevFullName = '请选择归属箱/柜箱';
				}
			}
		});
	}

	goback() {
		this.router.navigate(['index/devmetric']);
	}

	userSave() {
		if (!this.SelectDevices) {
			this.message('请选择JACE/DDC/PLC/Modbus路由', 'snack-bar-color-danger');
			return;
		}
		if (!this.SelectDevicesNo) {
			this.message('请选择设备编号', 'snack-bar-color-danger');
			return;
		}
		if (!this.SelectMetrics.value) {
			this.message('请选择测量变量', 'snack-bar-color-danger');
			return;
		}
		let addLink: string;
		let data: any;
		if (this.deviceInfo.Protocol.toString() === '0') {
			if (this.BacnetDeviceId === '' || this.BacnetDeviceId === null) {
				this.message('请输入BACNET协议中的device id', 'snack-bar-color-danger');
				return;
			}
			if (!this.SelectBacnetDevId.value) {
				this.message('请选择协议中的测量点', 'snack-bar-color-danger');
				return;
			}
			if (this.BacnetObjectId === '' || this.BacnetObjectId === null) {
				this.message('请输入BACNET协议中的测量点object id', 'snack-bar-color-danger');
				return;
			}
			data = {
				BacnetDevId: this.SelectBacnetObjects.value + ' ' + this.BacnetDeviceId,
				BacnetObjectId: this.SelectBacnetDevId.value + ' ' + this.BacnetObjectId
			};
			if (this.pageType === 'edit') {
				addLink = 'ent/iot/metricsbacnet/11503';
			} else {
				addLink = 'ent/iot/metricsbacnet/11502';
			}
		} else if (this.deviceInfo.Protocol.toString() === '1') {
			if (this.SlaveId === null) {
				this.message('请输入从站id', 'snack-bar-color-danger');
				return;
			}
			if (!this.SelectRegister.value) {
				this.message('请选择寄存器类型', 'snack-bar-color-danger');
				return;
			}
			if (this.StartAddr === null) {
				this.message('请输入起始地址', 'snack-bar-color-danger');
				return;
			}
			if (this.Quantity === null) {
				this.message('请输入字数量（word quantity）', 'snack-bar-color-danger');
				return;
			}
			data = {
				SlaveId: this.SlaveId,
				Register: this.SelectRegister.value,
				ValType: this.SelectValType.value,
				StartAddr: this.StartAddr,
				Quantity: this.Quantity,
				IsBigEndian: this.SelectBigEndian.value,
			};
			if (this.pageType === 'edit') {
				addLink = 'ent/iot/metricsmodbus/11603';
			} else {
				addLink = 'ent/iot/metricsmodbus/11602';
			}
		} else if (this.deviceInfo.Protocol.toString() === '2' || this.deviceInfo.Protocol.toString() === '3') {
			if (!this.SelectProtocolVer.value) {
				this.message('请选择OPC协议版本', 'snack-bar-color-danger');
				return;
			}
			if (this.OPCItem === '' || this.OPCItem === null) {
				this.message('请输入条目（item）', 'snack-bar-color-danger');
				return;
			}
			data = {
				Port: this.Port,
				Item: this.OPCItem,
				ProtocolVer: this.SelectProtocolVer.value,
				Ip: this.Ip,
				ClsId: this.ClsId
			};
			if (this.pageType === 'edit') {
				addLink = 'ent/iot/metricsopc/11703';
			} else {
				addLink = 'ent/iot/metricsopc/11702';
			}
		} else if (this.deviceInfo.Protocol.toString() === '4') {
			if (this.UrlItem === '' || this.UrlItem === null) {
				this.message('请输入点路径url', 'snack-bar-color-danger');
				return;
			}
			data = {
				Item: this.UrlItem
			};
			if (this.pageType === 'edit') {
				addLink = 'ent/iot/metricsobix/11403';
			} else {
				addLink = 'ent/iot/metricsobix/11402';
			}
		} else if (this.deviceInfo.Protocol.toString() === '5') {
			if (this.Item === '' || this.Item === null) {
				this.message('请输入点路径ord', 'snack-bar-color-danger');
				return;
			}
			data = {
				Item: this.Item
			};
			if (this.pageType === 'edit') {
				addLink = 'ent/iot/metricsbem/11903';
			} else {
				addLink = 'ent/iot/metricsbem/11902';
			}
		}
		this.message('正在生成，请稍等', 'snack-bar-color-info');
		let defaultData: IBacnet | IOPC | IMODBUS | IOBIX | IBem;
		if (this.pageType === 'edit') {
			defaultData = {
				Seq: this.bemInfoData.Seq,
				AlertFormula: this.AlertFormula,  // 报警公式
				// NewBoxDevNo: this.SelectBoxDevFullName.DeviceNo ? this.SelectBoxDevFullName.DeviceNo : null,  // 归属箱/柜编号
				DMBDesc: this.DMBDesc,  // 测量说明
				// NewDeviceNo: this.SelectDevicesNo.DeviceNo,  // 设备编号
				Formula: this.Formula, // 计算公式
				// NewGateway: this.deviceInfo.DeviceNo, // 智联网关 deviceInfo.DeviceNo
				// NewId: this.SelectMetrics.value, // 测量变量
				IsAlert: this.SelectIsAlert.value, // 数据点/报警点
				// NewSmartDevNo: this.SelectDevices.DeviceNo, // JACE/DDC/PLC/Modbus路由
				UploadFormula: this.UploadFormula, // 上传公式
				...data
			};

			if (this.SelectDevicesOld.DeviceNo !== this.SelectDevices.DeviceNo) {
				defaultData.NewSmartDevNo = this.SelectDevices.DeviceNo;
			}

			if (this.SelectDevicesNoOld.DeviceNo !== this.SelectDevicesNo.DeviceNo) {
				defaultData.NewDeviceNo = this.SelectDevices.DeviceNo;
			}

			if (this.SelectBoxDevFullNameOld.DeviceNo !== this.SelectBoxDevFullName.DeviceNo) {
				defaultData.NewBoxDevNo = this.SelectBoxDevFullName.DeviceNo;
			}

			if (this.SelectMetricsOld.value !== this.SelectMetrics.value) {
				defaultData.NewId = this.SelectMetrics.value;
			}

		} else {
			defaultData = {
				AlertFormula: this.AlertFormula,  // 报警公式
				BoxDevNo: this.SelectBoxDevFullName.DeviceNo ? this.SelectBoxDevFullName.DeviceNo : null,  // 归属箱/柜编号
				DMBDesc: this.DMBDesc,  // 测量说明
				DeviceNo: this.SelectDevicesNo.DeviceNo,  // 设备编号
				Formula: this.Formula, // 计算公式
				Gateway: this.deviceInfo.DeviceNo, // 智联网关 deviceInfo.DeviceNo
				Id: this.SelectMetrics.value, // 测量变量
				IsAlert: this.SelectIsAlert.value, // 数据点/报警点
				SmartDevNo: this.SelectDevices.DeviceNo, // JACE/DDC/PLC/Modbus路由
				UploadFormula: this.UploadFormula, // 上传公式
				...data
			};
		}
		// console.log(defaultData);
		this.service.serviceR(addLink, defaultData, (res: any) => {
			if (res.ResultCode === 0) {
				this.message(this.pageType === 'edit' ? '修改成功' : '添加成功', 'snack-bar-color-info');
				this.router.navigate(['index/devmetric']);
			}
		});
	}

	message(str: string, info: string) {
		this.snackBar.open(str, '确认', {
			duration: 1600,
			verticalPosition: 'top',
			panelClass: info
		});
	}
}
