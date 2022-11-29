import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../service/service';

@Component({
	selector: 'app-workbench',
	templateUrl: './workbench.component.html',
	styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {
	pieInspection: any; // 巡检饼图数据
	pieDeviceAll: any; // 设备总数饼图数据
	pieDeviceOvertime: any; // 设备超时饼图数据
	operationAndMaintenanceCheck = 1;
	workDataCheck = 1;
	operationAndMaintenanceDateCheck = '0,4';
	checkList = [{ name: '今日', value: 1 }, { name: '本周', value: 2 }, { name: '本月', value: 3 }];
	todyTime: any;
	deviceStateData: any = {};
	AIOTData: any = {};
	todoData: any = {};
	todoType: any = 1;
	devOpsPlanData: any = {};
	workDataList = [];
	devOpsScheduleData = [];
	messageList = [];
	devOpsQualityList = [];
	constructor(
		private service: Service,
		private router: Router
	) {
	}

	ngOnInit() {
		this.getTime();
		// 设备状态
		this.getDeviceState();
		// aiot巡检
		this.getAIOTData();
		// 待办
		this.getTodo();
		// 运维计划
		this.devOpsPlan();
		// 运维质量
		this.devOpsQuality();
		// 工单数据
		this.getWorkData();
		// 运维日程
		this.getDevOpsSchedule();
		// 通知公告
		this.getMessage();
	}

	getMessage() {
		this.service.serviceR('ent/workbench/message', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.messageList = res.Result.MsgList;
			}
		});
	}

	getDevOpsSchedule() {
		const data = {
			Type: this.operationAndMaintenanceDateCheck
		};
		this.service.serviceR('ent/workbench/today/schedule', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.devOpsScheduleData = res.Result.List;
			}
		});
	}

	getWorkData() {
		const data = {
			Type: this.workDataCheck
		};
		this.service.serviceR('ent/workbench/count/order', data, (res: any) => {
			if (res.ResultCode === 0) {
				if (data.Type === 1) {
					res.Result.List[2].value2 = 2;
					res.Result.List[3].value2 = 5;
					res.Result.List[4].value2 = 8;
				}

				if (data.Type === 2) {
					res.Result.List[3].value2 = 7;
					res.Result.List[4].value2 = 20;
				}

				this.workDataList = res.Result.List;
			}
		});
	}

	devOpsQuality() {
		const data = {
			Type: this.operationAndMaintenanceCheck
		};
		this.service.serviceR('ent/workbench/count/service', data, (res: any) => {
			if (res.ResultCode === 0) {
				if (data.Type === 1) {
					res.Result.List[1].InTimePer = '98%';
					res.Result.List[3].InTimePer = '96%';
				}
				if (data.Type === 2) {
					res.Result.List[1].InTimePer = '97%';
					res.Result.List[3].InTimePer = '98%';
				}
				if (data.Type === 3) {
					res.Result.List[1].InTimePer = '99%';
					res.Result.List[3].InTimePer = '96%';
				}

				this.devOpsQualityList = res.Result.List;
			}
		});
	}

	devOpsPlan() {
		this.service.serviceR('ent/workbench/week/schedule', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.devOpsPlanData = {
					xj: res.Result.TotalList[1].Total,
					wx: res.Result.TotalList[0].Total,
					by: res.Result.TotalList[2].Total
				};
			}
		});
	}

	getTodo() {
		this.service.serviceR('ent/workbench/work', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.todoData = {
					total: res.Result.Total,
					dshXJ: res.Result.TotalList[0][1].Total || 0,
					dshWX: res.Result.TotalList[0][0].Total || 0,
					dshBY: res.Result.TotalList[0][2].Total || 0,
					dpjXJ: res.Result.TotalList[1][1].Total || 0,
					dpjWX: res.Result.TotalList[1][0].Total || 0,
					dpjBY: res.Result.TotalList[1][2].Total || 0,
				};
			}
		});
	}

	getAIOTData() {
		this.service.serviceR('ent/aiot/count/scheme', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.AIOTData = res.Result;
				this.pieInspection = {
					series: [
						{
							name: '',
							type: 'pie',
							radius: ['75%', '100%'],
							avoidLabelOverlap: false,
							hoverAnimation: false,
							legendHoverLink: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: false,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [
								{ value: res.Result.Total === 0 ? 1 : res.Result.WorkingTotal, name: '' },
								{ value: res.Result.Total - res.Result.WorkingTotal, name: '' },
							],
							color: ['#83D6FE', '#707070']
						}
					]
				};
			}
		});
	}

	getDeviceState() {
		this.service.serviceR('ent/workbench/device', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.deviceStateData = res.Result;
				this.pieDeviceAll = {
					series: [
						{
							name: '',
							type: 'pie',
							radius: ['75%', '100%'],
							avoidLabelOverlap: false,
							hoverAnimation: false,
							legendHoverLink: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: false,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [
								{ value: res.Result.TotalDevices === 0 ? 1 : res.Result.OnlineDevices, name: '' },
								{ value: res.Result.TotalDevices - res.Result.OnlineDevices, name: '' },
							],
							color: ['#84CCC9', '#707070']
						}
					]
				};

				this.pieDeviceOvertime = {
					series: [
						{
							name: '',
							type: 'pie',
							radius: ['75%', '100%'],
							avoidLabelOverlap: false,
							hoverAnimation: false,
							legendHoverLink: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: false,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [
								{ value: res.Result.TotalDevices === 0 ? 1 : res.Result.OverDevices, name: '' },
								{ value: res.Result.TotalDevices - res.Result.OverDevices, name: '' },
							],
							color: ['#F29B76', '#707070']
						}
					]
				};
			}
		});
	}

	getTime() {
		const date = new Date();
		const Month = date.getMonth() + 1;
		const Day = date.getDate();
		const Y = date.getFullYear() + '-';
		const M = Month < 10 ? '0' + Month + '-' : Month + '-';
		const D = Day + 1 < 10 ? '0' + Day : Day;
		this.todyTime = M + D;
		const houers = date.getHours();
		const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
		const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
		return (houers < 10 ? '0' + houers : houers) + ':' + minutes + ':' + seconds;
	}

	goPage(type: string, item: any) {
		switch (type) {
			case 'db-dsh-xj':
				this.router.navigate(['index/orderschedulechk', { tabType: 1 }]);
				break;
			case 'db-dsh-wx':
				this.router.navigate(['index/orderfix', { tabType: 1 }]);
				break;
			case 'db-dsh-by':
				this.router.navigate(['index/orderkeep', { tabType: 1 }]);
				break;
			case 'yy-xj':
				this.router.navigate(['index/schedulepatrol']);
				break;
			case 'yy-wx':
				this.router.navigate(['index/schedulefix']);
				break;
			case 'yy-by':
				this.router.navigate(['index/schedulekeep']);
				break;
			case 'AIOT-xj':
				this.router.navigate(['index/inspection']);
				break;
			case 'sbzt-zs':
				this.router.navigate(['index/diagdevrt']);
				break;
			case 'sbzt-cs':
				this.router.navigate(['index/devicealarm']);
				break;
			case 'gdsj':
				if (item === 'xj') {
					this.router.navigate(['index/orderschedulechk']);
				}
				if (item === 'by') {
					this.router.navigate(['index/orderkeep']);
				}
				if (item === 'wx') {
					this.router.navigate(['index/orderfix']);
				}
				break;
			case 'ywrc':
				let url = null;
				let scheduleType = null;
				if (this.operationAndMaintenanceDateCheck === '0,4') {// 巡检
					url = 'index/orderschedulechk/info';
					scheduleType = '0';
				}
				if (this.operationAndMaintenanceDateCheck === '1') {// 保养
					url = 'index/orderkeep/info';
					scheduleType = '1';
				}
				if (this.operationAndMaintenanceDateCheck === '2,3') {// 维修
					url = 'index/orderfix/info';
					scheduleType = '2,3';
				}
				const data = {
					ServiceType: '0',
					ScheduleType: scheduleType,
					MOSeq: item.MoSeq,
				};
				this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
					if (res.ResultCode === 0) {
						localStorage.setItem('bemInfoData', JSON.stringify(res.Result.MaintenanceOrders[0]));
						this.router.navigate([url]);
					}
				});
				break;
			case 'gg':
				this.router.navigate(['index/msgmgmt']);
				break;
		}
	}
}
