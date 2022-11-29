import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../service/service';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class InfoComponent implements OnInit {
	Seq: any;
	displayedColumns: any;
	dataCheckList: any;
	data: any;
	constructor(
		private activateInfo: ActivatedRoute,
		private router: Router,
		private service: Service
	) {
		activateInfo.queryParams.subscribe(queryParams => {
			this.data = queryParams;
			console.log(this.data);
			this.Seq = this.data.MOSeq;
			this.displayedColumns = ['BuildingName', 'DeviceNo', 'DeviceName', 'Item', 'FeedbackType'];

		});
	}
	ngOnInit() {
		this.getList();
	}
	getList() {
		const da = {
			MoSeq: this.Seq
		};
		console.log(da);
		this.service.serviceR('ent/maintenance/8015', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
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
				this.dataCheckList = res.Result.MaintenanceOrderItems;
			}
		});
	}
	downloadDeviceFile() {
		const body = {
			MoSeq: this.Seq
		};
		new DownloadFile(body, 'ent/maintenance/item/export').downloadfile();
	}
	goback() {
		this.router.navigate(['index/operationsReport']);
	}
}
