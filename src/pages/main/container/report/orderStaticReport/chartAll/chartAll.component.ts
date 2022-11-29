import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { loadavg } from 'os';
declare let laydate;


@Component({
  selector: 'app-chartall',
  templateUrl: './chartAll.component.html',
  styleUrls: ['./chartAll.component.scss']
})
// tslint:disable-next-line:class-name
export class ChartAllComponent implements OnInit {
  date: any;
  chartType = 'bar';
  statisticsData = [];
  pieData = [];
  chartDataBar: any;
  chartDataLine: any;
  crumbsList = [
    { name: '服务监管', open: false },
    { name: '派单统计报表', open: true, url: 'orderStaticReport' },
    { name: '派单总图', open: false }
  ];
  // departmentList = [];
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

    setTimeout(() => {
      laydate.render({
        elem: '#date',
        type: 'month',
        done: (value) => {
          this.date = value;
        }
      });
    }, 0);

    this.getDepartmentList();
  }

  getDepartmentList() {
    const data = {Date: this.date};
    this.service.serviceR('ent/workbench/count/service', data , (res: any) => {
      if (res.ResultCode === 0) {
        // this.departmentList = res.Result.List;
        this.statisticsData = [];
        this.pieData = [];
        res.Result.List.forEach((item, index) => {
          if (index !== 0) {
            this.getDepartmentData(item.Seq, res.Result.List.length - 1, item.TeamName);
          }
        });
      }
    });
  }

  getDepartmentData(seq, listLen, teamName) {
    const data = {
      Date: this.date,
      TeamSeq: seq,
      type: 1
    };
    this.service.serviceR('ent/order/report', data , (res: any) => {
        if (res.ResultCode === 0) {
          if (this.statisticsData.length === 0) {
            res.Result.List.forEach((item, index) => {
              if (index !== 0) {
                this.statisticsData.push({
                  wx: 0,
                  xj: 0,
                  by: 0
                });
              }
            });
          }

          teamName ? res.Result.List[0].TeamName = teamName : res.Result.List[0].TeamName = '';
          this.pieData.push(res.Result.List[0]);

          res.Result.List.forEach((item, index) => {
            if (index !== 0) {
              this.statisticsData[index - 1].wx += item.RepairTotal;
              this.statisticsData[index - 1].xj += item.InspectTotal;
              this.statisticsData[index - 1].by += item.MaintainTotal;
            }
          });

          if (listLen === this.pieData.length) {
            this.getChartDataBar();
            this.getChartDataLine();
            this.getChartDataPie();
          }
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

  getChartDataPie() {
    const pieData = [];
    this.pieData.forEach(item => {
      pieData.push({
        teamName: item.TeamName,
        tooltip: {
            trigger: 'item',
            formatter: res => {
              if (res.name) {
                return `${res.seriesName} <br/>${res.name}: ${res.data.value} (${res.data.proportion})`;
              }
            }
        },
        color: ['#84CBC8', '#7ECEF4', '#FACD89'],
        series: [
            {
                name: item.TeamName,
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    // tslint:disable-next-line:radix
                    {value: parseInt(item.FinishPer), name: '完成率', proportion: item.FinishPer},
                    {
                      // tslint:disable-next-line:radix
                      value: 100 - parseInt(item.FinishPer),
                      hoverAnimation: false,
                      itemStyle: {
                        normal: {
                          color: '#f1f1f1'
                        },
                        emphasis: {
                          color: '#f1f1f1'
                        }
                      }
                    }
                ]
            },
            {
                name: item.TeamName,
                type: 'pie',
                radius: ['45%', '55%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    // tslint:disable-next-line:radix
                    {value: parseInt(item.InTimePer), name: '及时率', proportion: item.InTimePer},
                    {
                      // tslint:disable-next-line:radix
                      value: 100 - parseInt(item.InTimePer),
                      hoverAnimation: false,
                      itemStyle: {
                        normal: {
                          color: '#f1f1f1'
                        },
                        emphasis: {
                          color: '#f1f1f1'
                        }
                      }
                    }
                ]
            },
            {
                name: item.TeamName,
                type: 'pie',
                radius: ['30%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: item.Score, name: '服务分', proportion: item.Score + '%'},
                    {
                      value: 100 - item.Score, name: '',
                      hoverAnimation: false,
                      itemStyle: {
                        normal: {
                          color: '#f1f1f1'
                        },
                        emphasis: {
                          color: '#f1f1f1'
                        }
                      }
                    }
                ]
            }
        ]
      });
    });

    this.pieData = pieData;
  }

  getChartDataLine() {
    const series = [{
        name: '巡检',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: []
      }, {
        name: '维修',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: []
      }, {
        name: '保养',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: []
    }];

    const dateList = this.statisticsData.map((item, index) => {
        return this.date + '-' + (index + 1 < 10 ? '0' + (index + 1) : index + 1);
    });

    series[0].data = this.statisticsData.map((item, index) => {
      return item.xj;
    });

    series[1].data = this.statisticsData.map((item, index) => {
      return item.wx;
    });

    series[2].data = this.statisticsData.map((item, index) => {
      return item.by;
    });

    this.chartDataLine = {
        color: ['#ABE4FF', '#FACD89', '#98E698'],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }],
        legend: {
          data: ['巡检', '维修', '保养']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: [{
            splitLine: {show: false}
        }],
        series
    };
  }

  getChartDataBar() {
    const leftText = [];

    const series = [
      {
          name: '巡检',
          type: 'bar',
          stack: '总量',
          label: {
              color: '#000',
              show: true,
              position: 'insideRight'
          },
          color: '#ABE4FF',
          data: []
      },
      {
          name: '维修',
          type: 'bar',
          stack: '总量',
          label: {
              color: '#000',
              show: true,
              position: 'insideRight'
          },
          color: '#FACD89',
          data: []
      },
      {
          name: '保养',
          type: 'bar',
          stack: '总量',
          label: {
              color: '#000',
              show: true,
              position: 'insideRight'
          },
          color: '#98E698',
          data: []
      }
    ];

    this.statisticsData.forEach((item, index) => {
      leftText.push(index + 1 + '日');
      item.xj ? series[0].data.push(item.xj) : series[0].data.push('');
      item.wx ? series[1].data.push(item.wx) : series[1].data.push('');
      item.by ? series[2].data.push(item.by) : series[2].data.push('');
      // series[0].data.push(item.xj);
      // series[1].data.push(item.wx);
      // series[2].data.push(item.by);
    });

    this.chartDataBar = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['巡检', '维修', '保养']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: leftText
        },
        series
    };
  }
}
