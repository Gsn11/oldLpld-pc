import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
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
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
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
// tslint:disable-next-line:class-name
export class devExamineReportComponent implements OnInit {
	// pageSizeOptions = [5, 10, 20];
	// paginatorTotal = 0;
	// pageIndex = 1;
	// pageSize = 10;
	date: any;
	displayedColumns = ['subSystem', 'category', 'assessmentHours', 'goodHours'];

	list = [];

	constructor(
		private service: Service,
		private router: Router
	) {
	}
	ngOnInit() {
		const day2 = new Date();
		day2.setTime(day2.getTime());
		// tslint:disable-next-line:max-line-length
		const s2 = day2.getFullYear() + '-' + ((day2.getMonth() + 1) < 10 ? '0' + (day2.getMonth() + 1) : (day2.getMonth() + 1));
		this.date = s2;

		this.getList();
	}
	// 分页修改时响应方法
	// change(event: any) {
	// 	this.pageIndex = event.pageIndex + 1;
	// 	this.pageSize = event.pageSize;
	// 	this.getList();
	// }

	getList() {
		this.service.serviceR('ent/report/31002', {Date: this.date}, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.List;
				console.log(this.list);
			}
		});
	}

	downloadDeviceFile() {
		const body = {
			Date: this.date,
			FileName: '设备考核明细'
		};
		new DownloadFile(body, 'ent/report/31002/export').downloadfile();
	}

	getGetDate(date: any, datepicker: MatDatepicker<any>) {
		this.date = `${date.year()}-${date.month() + 1 < 10 ? '0' + (date.month() + 1) : (date.month() + 1)}`;
		datepicker.close();
	}
}
