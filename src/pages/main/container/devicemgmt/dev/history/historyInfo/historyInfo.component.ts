import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';

@Component({
	selector: 'app-historyinfo',
	templateUrl: './historyinfo.component.html',
	styleUrls: ['./historyinfo.component.scss']
})

export class HistoryInfoComponent implements OnInit {
	userInfo: any;
	bemInfoData: any;
	crumbsList: object;
	setConfim: boolean;
	userPower: boolean;
	PriceList: any;
	isentver: any;
	MaintenanceOrderHis: any;
	MaintenanceActions: any;
	MaintenanceScheItems: any;
	constructor(
		private router: Router,
		private service: Service
	) {
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.isentver = this.userInfo.Isentver;
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.bemInfoData = JSON.parse(localStorage.getItem('bemHistoryItemData'));
		this.userPower = false;
		this.setConfim = false;
		let crumbsName: string;
		let link: string;
		console.log(this.bemInfoData);
		if (this.bemInfoData.MainType === 1) {
			crumbsName = '智能设备管理';
			link = 'smartdev';
		} else if (this.bemInfoData.MainType === 0) {
			crumbsName = '通用设备管理';
			link = 'commdev';
		}  else if (this.bemInfoData.MainType === 7) {
			crumbsName = '安全器材管理';
			link = 'secdev';
		}  else if (this.bemInfoData.MainType === 3) {
			crumbsName = '备品/备件';
			link = 'sparepartsmgmt';
		} else if (this.bemInfoData.MainType === 4) {
			crumbsName = '配件管理';
			link = 'devpartsmgmt';
		} else {
			crumbsName = '智联网关管理';
			link = 'gatewaydev';
		}
		const historyName = this.bemInfoData.deviceNames;
		this.crumbsList = [
			{ name: '设备管理', open: false },
			{ name: crumbsName, open: true, url: link },
			{ name: historyName, open: true, url: link + '/history' },
			{ name: '设备历史记录详情页', open: false }
		];
	}

	ngOnInit() {
		const data = {
			OrderSeq: this.bemInfoData.MOSeq,
		};
		// console.log(data);
		this.service.serviceR('ent/maintenance/8801', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.PriceList = res.Result.OrderPrices;
			}
		});
		const OrderHistroy = {
			MOSeq: this.bemInfoData.MOSeq
		};
		this.service.serviceR('ent/maintenance/history/8009', OrderHistroy, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceOrderHis = res.Result.MaintenanceOrderHis;
			}
		});
		this.service.serviceR('ent/maintenance/8901', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.MaintenanceActions = res.Result.MaintenanceActions;
			}
		});


		const ScheduleData = {
			MOSeq: this.bemInfoData.MOSeq,
		};
		this.service.serviceR('ent/maintenance/8015', ScheduleData, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(111);
				console.log(res);
				res.Result.MaintenanceOrderItems.forEach(list => {
					if (list.FeedbackType === 0) {
						if (list.MoiValue === null) {
							list.MoiValue = '';
						} else {
							if (Number(list.MoiValue) === 1) {
								list.MoiValue = '是';
							} else {
								list.MoiValue = '否';
							}
						}
					}
				});
				this.MaintenanceScheItems = res.Result.MaintenanceOrderItems;
			}
		});


		// const ScheduleData = {
		//   Schedule: this.bemInfoData.Schedule
		// };
		// this.service.serviceR('ent/maintenance/8401', ScheduleData, (res: any) => {
		//   if (res.ResultCode === 0) {
		//     console.log(111);
		//     console.log(res);
		//     res.Result.MaintenanceScheItems.forEach(list => {
		//       if (list.FeedbackType === 0) {
		//         if (list.MoiValue === null) {
		//           list.MoiValue = '';
		//         } else {
		//           if (Number(list.MoiValue) === 1) {
		//             list.MoiValue = '是';
		//           } else {
		//             list.MoiValue = '否';
		//           }
		//         }
		//       }
		//     });
		//     this.MaintenanceScheItems = res.Result.MaintenanceScheItems;
		//   }
		// });
	}

	goback() {
		let link: string;
		if (this.bemInfoData.MainType === 0) {
			link = 'commdev';
		} else if (this.bemInfoData.MainType === 1) {
			link = 'smartdev';
		} else if (this.bemInfoData.MainType === 3) {
			link = 'sparepartsmgmt';
		} else if (this.bemInfoData.MainType === 4) {
			link = 'devpartsmgmt';
		} else {
			link = 'gatewaydev';
		}
		link += '/history';
		localStorage.removeItem('bemHistoryItemData');
		this.router.navigate(['index/' + link]);
	}
}
