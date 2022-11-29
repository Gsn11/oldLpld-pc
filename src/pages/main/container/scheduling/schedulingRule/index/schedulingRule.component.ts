import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { SchedulingRuleModalComponent } from '../schedulingRuleModal/schedulingRuleModal.component';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'app-schedulingRule',
	templateUrl: './schedulingRule.component.html',
	styleUrls: ['./schedulingRule.component.scss']
})
// tslint:disable-next-line:class-name
export class schedulingRuleComponent implements OnInit {
	@ViewChild(SchedulingRuleModalComponent, null) SchedulingRuleComponent: SchedulingRuleModalComponent;
	dateCheck = '今日';
	RuleList: any;
	UserId: any;
	Schedules: any;
	displayedColumns: string[] = ['Name', 'TeamTime', 'Type','applyType', 'ValidEnd', 'ValidStart'];
	showConfimBox = false;
	selectId: any;
	stateCheck = '启用';
	state = '';
	constructor(
		private snackBar: MatSnackBar,
		private service: Service,
		private router: Router,
		private dialog: MatDialog
	) {

	}
	ngOnInit() {
		this.getList();
	}
	getList() {
		const da = {
			PageIndex: '1',
			PageSize: '10'
		};
		this.service.serviceR('workteam/14011', da, (res: any) => {
			if (res.ResultCode === 0) {
				// if (this.stateCheck === '启用') {
				// 	res.Result.List = res.Result.List.filter((item: any) => {
				// 		return Number(item.State) === 0;
				// 	});
				// } else if (this.stateCheck === '关闭') {
				// 	res.Result.List = res.Result.List.filter((item: any) => {
				// 		return Number(item.State) === 1;
				// 	});
				// }

				this.RuleList = res.Result.List;
			}
		});
	}
	lookDetail() {
		// this.router.navigate(['index/orderStaticReportDetail']);
	}
	showConfim(e) {
		const name1 = (e[0].Weekday0 === 1 ? '周日' : '');
		const name2 = (e[0].Weekday1 === 1 ? '周一' : '');
		const name3 = (e[0].Weekday2 === 1 ? '周二' : '');
		const name4 = (e[0].Weekday3 === 1 ? '周三' : '');
		const name5 = (e[0].Weekday4 === 1 ? '周四' : '');
		const name6 = (e[0].Weekday5 === 1 ? '周五' : '');
		const name7 = (e[0].Weekday6 === 1 ? '周六' : '');
		return name1 + name2 + name3 + name4 + name5 + name6 + name7;
	}
	gotoInfo() {

	}
	edit(e,type) {
		this.SchedulingRuleComponent.getDtail(e,type);
	}
	showdiog() {
		this.SchedulingRuleComponent.show = !this.SchedulingRuleComponent.show;
		this.SchedulingRuleComponent.select = 0;
		this.SchedulingRuleComponent.ngOnInit();
	}
	showdiogone() {
		this.SchedulingRuleComponent.show = !this.SchedulingRuleComponent.show;
		this.SchedulingRuleComponent.select = 1;
		this.SchedulingRuleComponent.ngOnInit();
	}

	// confimResult(e) {
	// 	this.showConfimBox = false;
	// 	if (e) {
	// 		const data = {
	// 			State: this.state,
	// 			Id: this.selectId,
	// 		};
	// 		this.service.serviceR('workteam/14004', data, (res: any) => {
	// 			this.getList();
	// 		});
	// 	}
	// }

	showConfimBoxFn(e) {
		this.selectId = e.Id;
		this.state = e.State == '1' ? '0' : '1';
		const data = {
			State: this.state,
			Id: this.selectId,
		};
		this.service.serviceR('workteam/14004', data, (res: any) => {
			this.getList();
		});
	}
}
