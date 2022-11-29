import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
declare let laydate;


@Component({
  selector: 'app-charttype',
  templateUrl: './chartType.component.html',
  styleUrls: ['./chartType.component.scss']
})
// tslint:disable-next-line:class-name
export class ChartTypeComponent implements OnInit {
  dateType = '1';
  statisticsType = '1';
  date: any;
  chartType = 'bar';
  pieData = [];
  chartDataBar: any;
  chartDataLine: any;
  barLen = 0;
  crumbsList = [
    { name: '服务监管', open: false },
    { name: '派单统计报表', open: true, url: 'orderStaticReport' },
    { name: '类型图', open: false }
  ];
  constructor(
    private snackBar: MatSnackBar,
    private activateInfo: ActivatedRoute,
    private service: Service,
    private router: Router
  ) {
  }
  ngOnInit() {
    const date = new Date();
    this.date = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.date += ('-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()));
    this.checkDateType(false);

    this.getDepartmentList();
  }

  checkDateType(check) {
    check ? this.date = '' : this.date = this.date;

    setTimeout(() => {
      laydate.render({
        elem: '#date',
        type: 'date',
        done: (value) => {
          this.date = value;
        }
      });
      laydate.render({
        elem: '#month',
        type: 'month',
        done: (value) => {
          this.date = value;
        }
      });
      laydate.render({
        elem: '#year',
        type: 'year',
        done: (value) => {
          this.date = value;
        }
      });
    }, 0);
  }

  getDepartmentList() {
    const data = {Date: this.date};
    this.service.serviceR('ent/workbench/count/service', data , (res: any) => {
      if (res.ResultCode === 0) {
        this.barLen = res.Result.List.length;
        this.getChartDataBar(res.Result.List);
        this.getChartDataLine(res.Result.List);
        this.getChartDataPie(res.Result.List);
      }
    });
  }

  seach() {
    if (!this.date) {
      this.snackBar.open('请选择日期', '', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }
    this.getDepartmentList();
  }

  getChartDataPie(data) {
    const pieData = [];
    data.forEach((item, index) => {
      let max = 0;
      if (index === 0) {
        item.InspectTotal > max ? max = item.InspectTotal : max = max;
        item.RepairTotal > max ? max = item.RepairTotal : max = max;
        item.MaintainTotal > max ? max = item.MaintainTotal : max = max;
      }

      pieData.push({
        title: {
            text: item.TeamName,
            left: 'center',
            top: 20,
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: item.InspectTotal, name: '巡检'},
                    {value: item.RepairTotal, name: '维修'},
                    {value: item.MaintainTotal, name: '保养'}
                ].sort((a, b) => a.value - b.value),
                roseType: 'radius',
                label: {
                    color: '#666'
                },
                labelLine: {
                    lineStyle: {
                        color: '#666'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                color: ['#ABE4FF', '#FACD89', '#98E698']
            }
        ]
      });
    });

    this.pieData = pieData;
  }

  getChartDataLine(data) {
    const xAxisData = [];
    const series = [
      {
        name: '巡检',
        type: 'line',
        data: [],
        smooth: true
      },
      {
          name: '维修',
          type: 'line',
          data: [],
          smooth: true
      },
      {
          name: '保养',
          type: 'line',
          data: [],
          smooth: true
      },
      {
          name: '合计',
          type: 'line',
          data: [],
          smooth: true
      }
    ];

    data.forEach(item => {
      // [item.TeamName, item.InspectTotal, item.MaintainTotal, item.RepairTotal];
      xAxisData.push(item.TeamName);
      series[0].data.push(item.InspectTotal);
      series[1].data.push(item.MaintainTotal);
      series[2].data.push(item.RepairTotal);
      series[3].data.push(item.InspectTotal + item.MaintainTotal + item.RepairTotal);
    });

    this.chartDataLine = {
      title: {
          text: ''
      },
      color: ['#ABE4FF', '#FACD89', '#98E698', '#FF0000'],
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['巡检', '维修', '保养', '合计'],
          left: '3%'
      },
      grid: {
          left: '3%',
          right: '3%'
      },
      toolbox: {
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
      },
      yAxis: {
          type: 'value'
      },
      series
    };
  }

  getChartDataBar(data) {
    const source = [
      ['', '巡检', '维修', '保养']
    ];

    data.forEach(item => {
      source.push([item.TeamName, item.InspectTotal, item.RepairTotal, item.MaintainTotal]);
    });

    this.chartDataBar = {
      legend: {left: '3%'},
      tooltip: {},
      grid: {
        left: '3%',
        right: '3%',
      },
      color: ['#ABE4FF', '#FACD89', '#98E698'],
      dataset: {
          source
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    };
  }
}
