import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [Service]
})
export class DashboardComponent implements OnInit {
  pieTopLeft: any;
  pieTopMiddle: any;
  pieTopRight: any;
  barMiddleLeft: any;
  lineMiddleRight: any;
  barBottom: any;
  constructor(
    private router: Router,
    private service: Service
  ) { }
  ngOnInit() {
    const basicData = {
      State: 0
    };
    this.service.serviceR('ent/count/online', basicData, (res: any) => {
      if (res.ResultCode === 0) {
        const r = res.Result;
        this.pieCharts1(r.OnlineAlerts, r.OnlineDevices);
      }
    });
    this.service.serviceR('ent/count/order', basicData, (res: any) => {
      if (res.ResultCode === 0) {
        const r = res.Result;
        this.pieCharts2(r.TotalOrders, r.TotalServiceOrders, r.TotalFinishedOrders);

        const lineDate = [];
        const lineDataIn = [];
        const lineDataOut = [];
        let n = 0;
        for (const item of r.OrderByYearMonthByServiceTypeList) {
          n++;
          if (n % 2 === 0) {
            lineDate.push(item.DateTime);
          }
          if (item.ServiceType === '内部派单') {
            lineDataIn.push(item.Count);
          } else {
            lineDataOut.push(item.Count);
          }
        }
        if (lineDataIn.length !== lineDataOut.length) {
          if (lineDataIn.length < lineDataOut.length) {
            lineDataIn.push(0);
          } else {
            lineDataOut.push(0);
          }
        }
        this.lineMiddleCharts2(lineDate, lineDataIn, lineDataOut);

        const od = [];
        for (const item of r.OrderByYearMonthByMsTypeList) {
          od.push({
            product: item.DateTime,
            [item.MsType]: item.Total
          });
        }
        this.barBottomBar(od);
      }
    });
    this.service.serviceR('ent/cockpit/count/basic', basicData, (res: any) => {
      if (res.ResultCode === 0) {
        const r = res.Result;
        const d = [];
        const dn = [];
        for (const item of r.AlertBySubsysList) {
          if (item.count !== 0) {
            dn.push(item.SName);
            d.push({
              value: item.count,
              name: item.SName,
              label: {
                fontSize: 24
              }
            });
          }
        }
        // if (d.length === 0) {
        //   dn.push('BA系统');
        //   d.push({
        //     value: 0,
        //     name: 'BA系统',
        //     label: {
        //       fontSize: 24
        //     }
        //   });
        // }
        this.pieCharts3(r.TotalAlerts, dn, d);
      }
    });
    this.service.serviceR('ent/cockpit/count/order', basicData, (res: any) => {
      if (res.ResultCode === 0) {
        const r = res.Result;
        const dn = [];
        const d1 = [];
        const d2 = [];
        for (const item of r.OrderBySubsysList) {
          dn.push(item.SName);
          d1.push(item.total);
          d2.push(item.finish);
        }
        this.barMiddleCharts1(dn, d1, d2);
      }
    });
  }

  pieCharts1(...data: any) {
    this.pieTopLeft = {
      color: ['#00B1FF', '#FFF065'],
      title: {
        show: true,
        text: '设备总数',
        subtext: (data[0] + data[1]).toString(),
        subtextStyle: {

        },
        x: 'center',
        y: '43%',
        textStyle: {
          fontSize: '15',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: ['在线', '故障'],
      },
      series: [
        {
          name: '-',
          type: 'pie',
          radius: ['55%', '75%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: data[1],
              name: '在线',
              label: {
                fontSize: 24
              }
            },
            {
              value: data[0],
              name: '故障',
              label: {
                fontSize: 24
              }
            },
          ],
        }
      ]
    };
  }
  pieCharts2(...data: any) {
    this.pieTopMiddle = {
      color: ['#00B1FF', '#FFF065'],
      title: {
        show: true,
        text: '派单数',
        subtext: data[0],
        subtextStyle: {

        },
        x: 'center',
        y: '43%',
        textStyle: {
          fontSize: '15',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: ['服务中', '完成'],
      },
      series: [
        {
          name: '-',
          type: 'pie',
          radius: ['55%', '75%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: data[1],
              name: '服务中',
              label: {
                fontSize: 24
              }
            },
            {
              value: data[2],
              name: '完成',
              label: {
                fontSize: 24
              }
            },
          ],
        }
      ]
    };
  }
  pieCharts3(...data: any) {
    this.pieTopRight = {
      color: ['#00B1FF', '#FFF065', '#FC7293'],
      title: {
        show: true,
        text: '报警数',
        subtext: data[0].toString(),
        x: 'center',
        y: '43%',
        textStyle: {
          fontSize: '15',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: data[1],
      },
      series: [
        {
          name: '-',
          type: 'pie',
          radius: ['55%', '75%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data[2],
        }
      ]
    };
  }
  barMiddleCharts1(...data: any) {
    this.barMiddleLeft = {
      color: ['rgba(0,0,0,0.2)', '#FFF065'],
      title: {
        show: true,
        text: '派单统计',
        x: '0',
        y: '0',
        textStyle: {
          fontSize: '15',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['派单', '完成'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data[0],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [{ type: 'inside' }],
      series: [
        { // For shadow
          name: '派单',
          type: 'bar',
          barGap: '-100%',
          barCategoryGap: '60%',
          data: data[1],
          animation: false
        },
        {
          name: '完成',
          type: 'bar',
          data: data[2]
        }
      ]
    };
  }
  lineMiddleCharts2(...data: any) {
    this.lineMiddleRight = {
      color: ['#9DE0B5', '#FFF065'],
      title: {
        text: '派单趋势'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['内部派单', '外部派单']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data[0]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '内部派单',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: data[1]
        },
        {
          name: '外部派单',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: data[2]
        },
      ]
    };
  }
  barBottomBar(...data: any) {
    this.barBottom = {
      color: ['#00B1FF', '#FFF065', '#FC7293'],
      title: {
        text: '派单统计'
      },
      legend: {},
      tooltip: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      dataset: {
        dimensions: ['product', '维修', '巡检', '保养'],
        source: data[0]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          type: 'bar',
          barCategoryGap: '40%',
        },
        {
          type: 'bar',
          barCategoryGap: '40%',
        },
        {
          type: 'bar',
          barCategoryGap: '40%',
        },
      ]
    };
  }

  gotoHome() {
    this.router.navigate(['index/home']);
  }
}
