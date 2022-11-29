import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Service } from '../../../../../service/service';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import { MatDatepicker } from '@angular/material/datepicker';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
const MY_MOMENT_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: 'YYYY-MM', // moment format
	},
	display: {
		dateInput: 'YYYY-MM', // moment format
		monthYearLabel: 'YYYY-MM',
		dateA11yLabel: 'YYYY-MM',
		monthYearA11yLabel: 'YYYY-MM',
	},
};


@Component({
	selector: 'app-orderstaticreport',
	templateUrl: './orderStaticReport.component.html',
	styleUrls: ['./orderStaticReport.component.scss'],
	providers: [
		// The locale would typically be provided on the root module of your application. We do it at
		// the component level here, due to limitations of our example generation script.
		{ provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_MOMENT_DATE_FORMATS },
	]
})
export class OrderStaticReportComponent implements OnInit {
	dateCheck = '今日';
	date: any;
	dataCheckList: any;
	crumbsList = [
		{ name: '服务监管', open: false },
		{ name: '派单统计报表', open: false }
	];
	constructor(
		private service: Service,
		private router: Router,
		private activateInfo: ActivatedRoute
	) {
	}
	ngOnInit() {
		const day2 = new Date();
		day2.setTime(day2.getTime());
		// tslint:disable-next-line:max-line-length
		const s2 = day2.getFullYear() + '-' + ((day2.getMonth() + 1) < 10 ? '0' + (day2.getMonth() + 1) : (day2.getMonth() + 1));
		this.date = s2;
		this.getList(s2);
	}
	getList(s2) {
		const da = { Date: s2 };
		console.log(da);
		this.service.serviceR('ent/workbench/count/service', da, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.dataCheckList = res.Result.List;
			}
		});
	}
	getBeginTime(date: any, datepicker: MatDatepicker<any>) {
		this.date = `${date.year()}-${date.month() + 1 < 10 ? '0' + (date.month() + 1) : (date.month() + 1)}`;
		datepicker.close();
		this.getList(this.date);
	}
	downloadDeviceFile() {
		const body = {
			Date: this.date,
			Title: this.date + '运维质量统计报表',
			FileName: '派单统计报表'
		};
		console.log(body);
		new DownloadFile(body, 'ent/workbench/count/service/export').downloadfile();
	}
	gotoInfo(e, name) {
		console.log(e);
		this.router.navigate(['index/orderStaticReport/info/'], { queryParams: { TeamSeq: e, TeamName: name } });
	}
	goChart(type) {
		if (type === 'all') {
			this.router.navigate(['index/orderStaticReport/chartAll']);
		}
		if (type === 'type') {
			this.router.navigate(['index/orderStaticReport/chartType']);
		}
		if (type === 'status') {
			this.router.navigate(['index/orderStaticReport/chartStatus']);
		}
		if (type === 'person') {
			this.router.navigate(['index/orderStaticReport/chartPerson']);
		}
	}
}
