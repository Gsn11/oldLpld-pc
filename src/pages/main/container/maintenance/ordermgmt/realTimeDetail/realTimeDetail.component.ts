import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';



@Component({
	selector: 'app-realtimedetail',
	templateUrl: './realTimeDetail.component.html',
	styleUrls: ['./realTimeDetail.component.scss'],
})

export class RealTimeDetailComponent implements OnInit {
	buildData: any;
	checkType: any = '';
	buildingList = [];
	objectKeys = Object.keys;
	dataList = [];
	crumbsList = [
		{ name: '服务监管', open: false },
		{ name: '派单一览表', open: false },
		{ name: '实时巡检详情', open: false }
	];
	constructor(
		private service: Service,
		private router: Router,
	) {
		this.buildData = buildData;
	}

	ngOnInit() {
		this.getBuildingList();
		this.getDataList();
	}

	getDataList() {
		const data = { Building: this.checkType };
		this.service.serviceR('ent/maintenance/8017', data, (res: any) => {
			if (res.ResultCode === 0) {
				res.Result.MaintenanceOrders.forEach((item, index) => {
					item.list = {};
					for (const i in item.Items) {
						if (i) {
							if (item.Items[i].FeedbackType === 0) {
								if (item.Items[i].MoiValue === null) {
									item.Items[i].MoiValue = '';
								} else {
									if (Number(item.Items[i].MoiValue) === 1) {
										item.Items[i].MoiValue = '是';
									} else {
										item.Items[i].MoiValue = '否';
									}
								}
							}
							if (item.Items[i].DeviceNo === null) {
								if (item.Items[i].Space) {
									item.Items[i].DeviceNo = 'null';
									item.list[item.Items[i].Space.toString()] = [];
								}
							} else {
								item.list[item.Items[i].DeviceNo] = [];
							}
						}
					}
				});
				res.Result.MaintenanceOrders.forEach(item => {
					for (const i in item.Items) {
						if (i) {
							for (const x in item.list) {
								if (item.Items[i].DeviceNo === x && item.Items[i].DeviceNo !== 'null') {
									item.list[x].push(item.Items[i]);
								} else if (item.Items[i].Space === Number(x) && item.Items[i].DeviceNo === 'null') {
									item.list[x].push(item.Items[i]);
								}
							}
						}
					}
				});
				this.dataList = res.Result.MaintenanceOrders;
			}
		});
	}

	getBuildingList() {
		const data = { null: null };
		this.service.serviceR('ent/building/5001', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res);
				this.buildingList = res.Result.Buildings;
			}
		});
	}
}
