import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { SplitDate } from '../../../../common/utils/js/translateDate/SplitDate';
// 此模块依赖加包@angular/marteril-moment-adapter 和 moment
// display修改日期数据格式
export const MY_MOMENT_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: 'DD MMM YYYY', // moment format
	},
	display: {
		dateInput: 'YYYY MMM DD', // moment format
		monthYearLabel: 'YYYY MMM',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'YYYY MMMM',
	},
};

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	providers: [
		// The locale would typically be provided on the root module of your application. We do it at
		// the component level here, due to limitations of our example generation script.
		{ provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },

		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent {
	@Input() major: number;
	@Input() minor: number;
	changeLog: string[] = [];
	date: any;
	selectDate: any;
	@Input()
	set setCreateDate(setCreateDate: string) {
		// console.log(this.selectDate);
		const date = new Date();
		if (setCreateDate) {
			// console.log(123);
			this.selectDate = setCreateDate;
			if (new Date(this.selectDate.substr(0, 10)).getFullYear() < 1949) {
				this.selectDate = new SplitDate(date).translate();
			}
		} else {
			this.selectDate = null;
		}
		// this.selectDate = setCreateDate || new SplitDate(date).translate();
		// console.log(this.selectDate);
	}

	get setCreateDate(): string { return this.selectDate; }
	@Input() title: string;
	@Output() getTime = new EventEmitter<string>();
	constructor(private adapter: DateAdapter<any>) {
		this.selectDate = '';
	}

	addEvent(event: MatDatepickerInputEvent<Date>) {
		// console.log(event.value);
		if (!event.value || event.value === null) {
			this.getTime.emit(null);
			return;
		}
		this.date = event.value;
		this.selectDate = new SplitDate(this.date._d).translate();
		this.getTime.emit(this.selectDate);
	}
}
