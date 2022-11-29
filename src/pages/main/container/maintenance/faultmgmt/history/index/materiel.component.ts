import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { FormGroup,FormControl } from '@angular/forms';
import 'echarts-gl';
import * as echarts from 'echarts';
@Component({
	selector: 'app-materiel',
	templateUrl: './materiel.component.html',
	styleUrls: ['./materiel.component.scss'],
	// animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class MaterielComponent implements OnInit {
	crumbsList: any;
  radioSelect = 1;
	radio = '';
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 0;
	alarmInfo = false;
	BeginTime: string = null; // 开始日期
	EndTime: string = null; // 结束日期
	deviceSeq = '';
	metric = '';
	displayedColumns = ['inOut', 'num', 'unitPrice', 'operate'];
	subset = ['itemId', 'PT', 'chart'];
	gradeList  = [];
	chartsList = [];
  SystemSelect: any;
	online: any;
	elementInfo:any = [];
	warningName = '';
	type: any;
	chartFlag = false;
	list: any = [];

	constructor(
		public route: ActivatedRoute,
		public dialog: MatDialog,
		private service: Service,
		private router: Router,
		private snackBar: MatSnackBar
	) {
		this.SystemSelect = new FormControl('');
		route.data.subscribe(res => {
			res.type ? this.type = res.type : this.type = '';
		});
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '运维中心', open: false },
			{ name: '故障管理', open: false },
			{ name: '报警历史', open: false }
		];
		this.BeginTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)}`;
		this.EndTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)}-${new Date().getDate()}`;
    this.grade();
		this.getList();
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	getList() {
		const data  = {
			StartTime: this.BeginTime+' 00:00:00',
			EndTime: this.EndTime+' 23:59:59',
			Limit: 1000,
			SubsysSeq: this.SystemSelect.value ? this.SystemSelect.value : null,
			DevSeq: null,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};
		console.log(data)
		this.service.serviceR('chart/devalerthis', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res)
				// for ( const i of res.Result.List) {
				// 	const names = []; const phones = []; const ids = [];
				// 	for ( const j of i.Users) {
				// 		names.push(j.UName);
				// 		phones.push(j.Tel);
				// 	}
				// 	i.names = names.join();
				// 	i.phones = phones.join();
				//  }
				this.list = res.Result.AlertHis;
				// this.paginatorTotal = res.Result.Total;
			}
		});
	}

	// 子系统
	grade() {
		const data = {
			State: 0,
		};
		this.service.serviceR('ent/params/subsys/monitor/10911', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.SubSystems)
				this.gradeList = res.Result.SubSystems;
			}
		});
	}

	//查看详情
	lookInfo(v){
		this.alarmInfo = true;
		this.deviceSeq = this.list[v].Device.deviceSeq;
		this.elementInfo = this.list[v].Points;
	}

	// 查看图表
	lookCharts(v){
		this.chartFlag = true;
		this.alarmInfo = true;
		this.metric = v[0].metric;
		this.chartsList = v;
		const xData = [];
		const dataInfo = {
			type: 'line',
			areaStyle: {},
			data: [],
			color:'#144955'
		}
		for(const i of v){
			dataInfo.data.push(i.value);
			xData.push(i.timeStr)
		}
		this.chartsInfo(dataInfo,xData)
	}

	// 搜索图表
	saveInfo(){
		const data  = {
			StartTime: this.BeginTime+' 00:00:00',
			EndTime: this.EndTime+' 23:59:59',
			Limit: 1000,
			DevSeq: this.deviceSeq,
			Metric: this.metric
		};
		console.log(data)
		this.service.serviceR('chart/devalerthisval', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res)
				const xData = [];
				const dataInfo = {
					type: 'line',
					areaStyle: {},
					data: [],
					color:'#144955'
				}
				for(const i of res.Result.AlertHis){
					dataInfo.data.push(i.value);
					xData.push(i.timeStr)
				}
				this.chartsInfo(dataInfo,xData)
			}
		});
	}

	getBeginTime(data: string) {
		this.BeginTime = data;
	}

	getEndTime(data: string) {
		this.EndTime = data;
	}

	chartsInfo(dataInfo,xData){

	this.online = {
		// legend: {
		// 	data: ['实习人数', '实习出勤数','测试']
		// },
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: xData,
			axisLabel: {
				textStyle: {
					color: '#000', //坐标的字体颜色
				},
			},
		}],
		yAxis: [{
			type: 'value',
			splitLine: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#000', //坐标的字体颜色
				},
			},
		}],
		series:dataInfo
		};
	}
}
