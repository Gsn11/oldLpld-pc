import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
declare let laydate;


@Component({
  selector: 'app-chartstatus',
  templateUrl: './chartStatus.component.html',
  styleUrls: ['./chartStatus.component.scss']
})
// tslint:disable-next-line:class-name
export class ChartStatusComponent implements OnInit {
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
    { name: '状态图', open: false }
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
        item.FinishTotal > max ? max = item.FinishTotal : max = max;
        item.HandleTotal > max ? max = item.HandleTotal : max = max;
        item.UncheckTotal > max ? max = item.UncheckTotal : max = max;
        item.ExceptionTotal > max ? max = item.ExceptionTotal : max = max;
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
                    {value: item.FinishTotal, name: '已完成'},
                    {value: item.HandleTotal, name: '处理中'},
                    {value: item.UncheckTotal, name: '待确认'},
                    {value: item.ExceptionTotal, name: '异常'}
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
                color: ['#13B5B1', '#409EFF', '#8C97CB', '#F56C6C']
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
        name: '已完成',
        type: 'line',
        data: [],
        smooth: true
      },
      {
          name: '处理中',
          type: 'line',
          data: [],
          smooth: true
      },
      {
          name: '待确认',
          type: 'line',
          data: [],
          smooth: true
      },
      {
          name: '异常',
          type: 'line',
          data: [],
          smooth: true
      }
    ];

    data.forEach(item => {
      // [item.TeamName, item.InspectTotal, item.MaintainTotal, item.RepairTotal];
      xAxisData.push(item.TeamName);
      series[0].data.push(item.FinishTotal);
      series[1].data.push(item.HandleTotal);
      series[2].data.push(item.UncheckTotal);
      series[3].data.push(item.ExceptionTotal);
    });

    this.chartDataLine = {
      title: {
          text: ''
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['已完成', '处理中', '待确认', '异常'],
          left: '3%'
      },
      color: ['#13B5B1', '#409EFF', '#8C97CB', '#F56C6C'],
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
      ['', '已完成', '处理中', '待确认', '异常']
    ];

    data.forEach(item => {
      source.push([item.TeamName, item.FinishTotal, item.HandleTotal, item.UncheckTotal, item.ExceptionTotal]);
    });

    this.chartDataBar = {
      legend: {left: '3%'},
      tooltip: {},
      grid: {
        left: '3%',
        right: '3%',
      },
      color: ['#13B5B1', '#409EFF', '#8C97CB', '#F56C6C'],
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
          {type: 'bar'},
          {type: 'bar'}
      ]
    };
  }
}
