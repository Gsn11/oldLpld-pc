import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
declare let laydate;


@Component({
  selector: 'app-chartperson',
  templateUrl: './chartPerson.component.html',
  styleUrls: ['./chartPerson.component.scss']
})
// tslint:disable-next-line:class-name
export class ChartPersonComponent implements OnInit {
  dateType = '1';
  departmentType = '';
  date: any;
  chartType = 'bar';
  departmentList = [];
  statisticsData = [];
  pieData = [];
  departmentName = '';
  chartDataBar: any;
  chartDataLine: any;
  barLen = 0;
  crumbsList = [
    { name: '服务监管', open: false },
    { name: '派单统计报表', open: true, url: 'orderStaticReport' },
    { name: '人员统计图', open: false }
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

  setDepartmentName() {
    this.departmentList.forEach(item => {
      if (this.departmentType === item.Seq) {
        this.departmentName = item.TeamName;
      }
    });
  }

  getDepartmentList() {
    const data = {Date: this.date};
    this.service.serviceR('ent/workbench/count/service', data , (res: any) => {
      if (res.ResultCode === 0) {
        this.departmentList = res.Result.List;
      }
    });
  }

  seach() {
    if (!this.departmentType) {
      this.snackBar.open('请选择部门', '', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }
    if (!this.date) {
      this.snackBar.open('请选择日期', '', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }
    const data = {
      TeamSeq: this.departmentType,
      Type: 1
    };
    this.service.serviceR('ent/cususer/team/4101', data , (res: any) => {
      if (res.ResultCode === 0) {
        this.setDepartmentName();
        this.statisticsData = [];
        res.Result.Users.forEach(item => {
          this.getPersonData(item.Seq, res.Result.Users.length, item.Name);
        });
      }
    });
  }

  getPersonData(val, length, name) {
    const data = {
      Date: this.date,
      Useq: val
    };
    this.service.serviceR('ent/order/report', data , (res: any) => {
      if (res.ResultCode === 0) {
        this.statisticsData.push({
          TeamName: name,
          ...res.Result.List[0]
        });
        if (length === this.statisticsData.length) {
          this.getChartDataPie();
          this.getChartDataLine();
          this.getChartDataBar();
        }
      }
    });
  }

  getChartDataPie() {
    const pieData = [];
    this.statisticsData.forEach((item, index) => {
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
        visualMap: {
            show: false,
            min: -1,
            max: max + 1,
            inRange: {
            }
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

  getChartDataLine() {
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

    this.statisticsData.forEach(item => {
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
      color: ['#13B5B1', '#409EFF', '#8C97CB', '#F56C6C'],
      tooltip: {
          trigger: 'axis'
      },
      legend: {
        data: ['已完成', '处理中', '待确认', '异常'],
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

  getChartDataBar() {
    const source = [
      ['', '已完成', '处理中', '待确认', '异常']
    ];

    this.statisticsData.forEach(item => {
      source.push([item.TeamName, item.FinishTotal, item.HandleTotal, item.UncheckTotal, item.ExceptionTotal]);
    });

    this.chartDataBar = {
      legend: {left: '3%'},
      tooltip: {},
      grid: {
        left: '3%',
        right: '3%',
      },
      dataset: {
          source
      },
      color: ['#13B5B1', '#409EFF', '#8C97CB', '#F56C6C'],
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
