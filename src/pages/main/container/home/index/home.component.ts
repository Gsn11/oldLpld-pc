import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Service} from '../../../../service/service';
import 'echarts-gl';
import * as echarts from 'echarts';

// declare var echarts: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Service]
})
export class HomeComponent implements OnInit {
  city: any;
  pieTopLeft: any;
  pieTopMiddle: any;
  pieTopRight: any;
  barMiddleLeft: any;
  pieTopMiddle1: any;
  pieTopMiddle2: any;
  allchart: any;
  onechart: any;
  online: any;
  pirit: any;
  pirit1: any;
  errorline: any;
  lineMiddleRight: any;
  barBottom: any;
  barBottomline: any;
  geo3DData: any;
  params: any;
  colorIndex: any = 1;
  timeIndex: any = 1;
  deviceTotalData: any = {};
  sunburst: any = {};
  alarmTotalData: any = {
    AlertListByType: []
  };
  orderStateData: any = {};
  taggingList: any = [];
  siteTab = 2;
  sunburstOption = {
    radius: [[0, 100], [100, 200], [200, 220]],
    countVal: 300,
    color: ['#f29c9f', '#fff799', '#7ecef4', '#49e5c6'],
    tmpLevelArr: []
  };
  devalertsList = [];

  constructor(
    private router: Router,
    private service: Service
  ) {
  }

  ngOnInit() {
    const basicData = {
      State: 0
    };
    // const data = ['4/4', '4/5', '4/6', '4/7', '4/8', '4/9', '4/10'];
    // const data1 = [20, 30, 100, 50, 60, 70, 50];
    // const data2 = [20, 30, 40, 50, 60, 70, 40];
    // this.barBott(data, data1, data2);
    this.timebetwin(1);
    // this.timeb(1);
    this.service.serviceR('ent/count/online', basicData, (res: any) => {
      if (res.ResultCode === 0) {
        const r = res.Result;
        this.pieCharts1(r.OnlineAlerts, r.OnlineDevices);
        this.all_chart();
        // this.classification();
      }
    });
    // this.service.serviceR('ent/count/order', basicData, (res: any) => {
    //   if (res.ResultCode === 0) {
    //     const r = res.Result;
    //     // this.pieCharts2(r.TotalOrders, r.TotalServiceOrders, r.TotalFinishedOrders);
    //     // this.pieCharts3(r.TotalOrders, r.TotalServiceOrders, r.TotalFinishedOrders);
    //     // this.pieCharts4(r.TotalOrders, r.TotalServiceOrders, r.TotalFinishedOrders);
    //     const lineDate = [];
    //     const lineDataIn = [];
    //     const lineDataOut = [];
    //     let n = 0;
    //     for (const item of r.OrderByYearMonthByServiceTypeList) {
    //       n++;
    //       if (n % 2 === 0) {
    //         lineDate.push(item.DateTime);
    //       }
    //       if (item.ServiceType === '????????????') {
    //         lineDataIn.push(item.Count);
    //       } else {
    //         lineDataOut.push(item.Count);
    //       }
    //     }
    //     if (lineDataIn.length !== lineDataOut.length) {
    //       if (lineDataIn.length < lineDataOut.length) {
    //         lineDataIn.push(0);
    //       } else {
    //         lineDataOut.push(0);
    //       }
    //     }
    //     // this.lineMiddleCharts2(lineDate, lineDataIn, lineDataOut);

    //     const od = [];
    //     for (const item of r.OrderByYearMonthByMsTypeList) {
    //       od.push({
    //         product: item.DateTime,
    //         [item.MsType]: item.Total
    //       });
    //     }
    //     this.barBottomBar(od);
    //   }
    // });
    // this.service.serviceR('ent/cockpit/count/basic', basicData, (res: any) => {
    //   if (res.ResultCode === 0) {
    //     const r = res.Result;
    //     const d = [];
    //     const dn = [];
    //     for (const item of r.AlertBySubsysList) {
    //       if (item.count !== 0) {
    //         dn.push(item.SName);
    //         d.push({
    //           value: item.count,
    //           name: item.SName,
    //           label: {
    //             fontSize: 24
    //           }
    //         });
    //       }
    //     }
    //   }
    // });
    // this.service.serviceR('ent/cockpit/count/order', basicData, (res: any) => {
    //   if (res.ResultCode === 0) {
    //     const r = res.Result;
    //     const dn = [];
    //     const d1 = [];
    //     const d2 = [];
    //     for (const item of r.OrderBySubsysList) {
    //       dn.push(item.SName);
    //       d1.push(item.total);
    //       d2.push(item.finish);
    //     }
    //   }
    // });

    // ??????????????????
    this.getTotalDevices();
    // ??????????????????
    this.getTotalAlarm();
    // ??????????????????
    this.getOrderState();
    // ???????????????
    this.getSeverScore();
    // ????????????????????????
    this.getOrderStatis(1);
    // ????????????????????????
    this.getOrderStatisLine(1);
    // ??????????????????
    this.getMapData(this.getBuildDevalerts.bind(this));
    // ??????????????????
    // this.getBuildDevalerts();
  }

  openVr() {
    this.router.navigate(['index/thirdPartyUrl'], {queryParams: {src: 'http://www.bemcn.com.cn:10001/'}});
  }

  getBuildDevalerts() {
    this.service.serviceR('ent/statis/build/devalerts', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        console.log('Buildings=====>', res.Result.Buildings);
        this.devalertsList = res.Result.Buildings;
        this.intSunbrsCharts();
      }
    });
  }


  onChartSunburstClick(params) {
    const l1 = this.taggingList.filter(item => item.List.length > 0 && item.BuildingGroupName !== '??????');
    const option = {series: []};
    let opts = [];
    const l1Data = [];
    const l2Data = [];
    const l3Data = [];
    let l1Opt = {};
    let l2Opt = {};
    let l3Opt = {};
    switch (params.seriesName) {
      case 'goBack':
        this.sunburstOption.tmpLevelArr.pop();
        opts = this.sunburstOption.tmpLevelArr[this.sunburstOption.tmpLevelArr.length - 1];
        break;
      case 'level1-1':
        l1.forEach(item => {
          item.List.forEach(c => {
            if (item.BuildingGroupName === params.data.name) {
              l2Data.push({
                name: c.BName,
                BSeq: c.BSeq,
                value: this.sunburstOption.countVal / c.List.length,
                isChildren: item.List.length > 1 ? true : false
              });
              for (let i = 0; i < 3; i++) {
                let name = '';
                if (i === 0) {
                  name = '??????: 0';
                } else if (i === 1) {
                  name = '??????: 0';
                } else if (i === 2) {
                  name = '??????: 0';
                }
                l3Data.push({
                  name,
                  BSeq: c.BSeq,
                  value: this.sunburstOption.countVal / (c.List.length * 3),
                  itemStyle: {
                    color: this.sunburstOption.color[i]
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    bleedMargin: 1
                  },
                  labelLine: {
                    show: true
                  },
                });
              }
            }
          });
        });
        l1Opt = this.setSunbrsOption({
          data: [{value: this.sunburstOption.countVal, name: '??????'}],
          name: 'goBack',
          radius: this.sunburstOption.radius[0],
          label: {
            position: 'inner',
            fontSize: 18
          }
        });
        l2Opt = this.setSunbrsOption({
          data: l2Data,
          name: 'level2',
          radius: this.sunburstOption.radius[1],
          label: {
            position: 'inner',
            rotate: 'radial',
            color: '#81E6FF',
            fontSize: 16
          }
        });
        l3Data.forEach(item => {
          this.devalertsList.forEach(c => {
            if (c.BSeq === item.BSeq) {
              if (c.Devices.length > 0) {
                let errCount = 0;
                c.Devices.forEach(v => {
                  if (v.levelName.includes(item.name.substring(0, 2))) {
                    errCount++;
                  }
                });
                item.name = `${item.name.substring(0, 2)}: ${errCount}`;
              }
            }
          });
        });
        l3Opt = this.setSunbrsOption({
          data: l3Data,
          name: 'level2-2',
          radius: this.sunburstOption.radius[2],
          itemStyle: {
            color: this.sunburstOption.color[0],
            borderColor: '#115a99',
            borderWidth: 2
          },
          label: {
            show: false,
          }
        });
        this.sunburstOption.tmpLevelArr.push([l1Opt, l2Opt, l3Opt]);
        opts.push(l1Opt, l2Opt, l3Opt);
        break;
      case 'level2':
        console.log(params.data);
        if (!params.data.isChildren) {
          return;
        }
        l1Opt = this.setSunbrsOption({
          data: [{value: this.sunburstOption.countVal, name: '??????'}],
          name: 'goBack',
          radius: this.sunburstOption.radius[0],
          label: {
            position: 'inner',
            fontSize: 18
          }
        });
        l2Opt = this.setSunbrsOption({
          data: [{value: this.sunburstOption.countVal, name: params.data.name}],
          name: 'level3-1',
          radius: this.sunburstOption.radius[1],
          label: {
            position: 'inner',
            rotate: 'radial',
            color: '#81E6FF',
            fontSize: 16
          }
        });
        this.devalertsList.forEach(c => {
          if (c.BSeq === params.data.BSeq) {
            for (let i = 0; i < 3; i++) {
              let name = '';
              if (i === 0) {
                name = '??????: 0';
              } else if (i === 1) {
                name = '??????: 0';
              } else if (i === 2) {
                name = '??????: 0';
              }
              l3Data.push({
                name,
                BSeq: c.BSeq,
                value: this.sunburstOption.countVal / 3,
                itemStyle: {
                  color: this.sunburstOption.color[i]
                },
                label: {
                  show: true,
                  fontSize: 16,
                  bleedMargin: 1
                },
                labelLine: {
                  show: true
                },
              });
            }
          }
        });
        l3Data.forEach(item => {
          this.devalertsList.forEach(c => {
            if (c.BSeq === item.BSeq) {
              if (c.Devices.length > 0) {
                let errCount = 0;
                c.Devices.forEach(v => {
                  if (v.levelName.includes(item.name.substring(0, 2))) {
                    errCount++;
                  }
                });
                item.name = `${item.name.substring(0, 2)}: ${errCount}`;
              }
            }
          });
        });
        l3Opt = this.setSunbrsOption({
          data: l3Data,
          name: 'level3-2',
          radius: this.sunburstOption.radius[2],
          itemStyle: {
            color: this.sunburstOption.color[0],
            borderColor: '#115a99',
            borderWidth: 2
          },
          label: {
            show: false,
          }
        });
        this.sunburstOption.tmpLevelArr.push([l1Opt, l2Opt, l3Opt]);
        opts.push(l1Opt, l2Opt, l3Opt);
        break;
    }
    if (!!!opts.length) {
      return;
    }
    option.series = opts;
    this.sunburst = option;
  }

  intSunbrsCharts() {
    const option = {series: []};
    const l1 = this.taggingList.filter(item => item.List.length > 0 && item.BuildingGroupName !== '??????');
    const l1Data = [];
    const l2Data = [];
    const l3Data = [];
    let l1Opt = {};
    let l2Opt = {};
    let l3Opt = {};
    l1.forEach(item => {
      l1Data.push({name: item.BuildingGroupName, value: this.sunburstOption.countVal / l1.length});
      item.List.forEach(c => {
        l2Data.push({
          name: c.BName, BSeq:
          c.BSeq,
          value: this.sunburstOption.countVal / item.List.length,
          isChildren: true
        });
        l3Data.push({
          name: c.BName,
          BSeq: c.BSeq,
          value: this.sunburstOption.countVal / item.List.length
        });
      });
    });
    this.devalertsList.forEach(item => {
      l3Data.forEach(c => {
        if (c.BSeq === item.BSeq) {
          c.Devices = item.Devices;
          if (item.Devices.length > 0) {
            c.itemStyle = {
              color: this.sunburstOption.color[0]
            };
          }
        }
      });
    });
    l1Opt = this.setSunbrsOption({data: l1Data, name: 'level1-1', radius: this.sunburstOption.radius[0]});
    l2Opt = this.setSunbrsOption({
      data: l2Data,
      name: 'level2',
      radius: this.sunburstOption.radius[1],
      label: {
        position: 'inner',
        rotate: 'radial',
        color: '#81E6FF',
        fontSize: 16
      }
    });
    l3Opt = this.setSunbrsOption({
      data: l3Data,
      name: 'level1-3',
      radius: this.sunburstOption.radius[2],
      itemStyle: {
        color: this.sunburstOption.color[3],
        borderColor: '#115a99',
        borderWidth: 2
      },
      label: {
        show: false,
      }
    });

    this.sunburstOption.tmpLevelArr.push([l1Opt, l2Opt, l3Opt]);
    option.series.push(l1Opt, l2Opt, l3Opt);
    this.sunburst = option;
    // console.log('l1===>', l1);
    // console.log('l1Opt===>', l1Opt);
    // console.log('l2Opt===>', l2Opt);
    // console.log('l3Opt===>', l3Opt);
    // console.log('opt==>', option);
  }

  setSunbrsOption(d) {
    const option = {
      name: 'level',
      type: 'pie',
      radius: [],
      hoverAnimation: false,
      label: {
        position: 'inner',
        fontSize: 16,
        color: '#81E6FF'
      },
      itemStyle: {
        color: 'transparent',
        borderColor: '#115a99',
        borderWidth: 2
      },
      labelLine: {
        show: false
      },
      data: []
    };
    return {...option, ...d};
  }

  getSunburstData(data) {
    console.log('sbres===>', data);
    // ????????????
    const sunburstData1 = [
      {
        'name': '??????',
        'itemStyle': {
          'color': 'transparent'
        },
        'children': [
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '86???',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
        ]
      },


      {
        'name': '??????',
        'itemStyle': {
          'color': 'transparent'
        },
        'children': [
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          }
        ]
      },


      {
        'name': '??????',
        'itemStyle': {
          'color': 'transparent'
        },
        'children': [
          {
            'name': '??????',
            'children': [
              {
                'name': '??????2',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          }
        ]
      }
    ];


    // ????????????
    const sunburstData2 = [
      {
        'name': '????????????',
        'itemStyle': {
          'color': 'transparent'
        },
        'children': [
          {
            'name': '????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '???????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '??????????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '?????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
          {
            'name': '????????????',
            'children': [
              {
                'name': '??????0',
                label: {
                  color: '#8f82bc'
                },
                'itemStyle': {
                  'color': '#8f82bc'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#3af6f8'
                },
                'itemStyle': {
                  'color': '#3af6f8'
                },
                'value': 8
              },
              {
                'name': '??????0',
                label: {
                  color: '#19bbff'
                },
                'itemStyle': {
                  'color': '#19bbff'
                },
                'value': 8
              }
            ],
            'itemStyle': {
              'color': 'transparent'
            }
          },
        ]
      }
    ];


    const sunburstData = [];
    data.forEach(list => {
      const pushData = {
        'name': list.BuildingGroupName,
        'itemStyle': {
          'color': 'transparent'
        }
      };
      if (list.List && list.List.length > 0) {
        const pushArr = [];
        list.List.forEach(list2 => {
          const pushData2 = {
            'name': list2.BName,
            'itemStyle': {
              'color': 'transparent'
            }
          };
          pushArr.push(pushData2);

          if (list2.List) {
            const pushArr2 = [];
            list2.List.forEach(list3 => {
              let name = '';
              let color = '';

              if (list3.Name === '??????') {
                name = '??????' + list3.Total;
                color = '#19bbff';
              }

              if (list3.Name === '??????') {
                name = '??????' + list3.Total;
                color = '#8f82bc';
              }

              if (list3.Name === '??????') {
                name = '??????' + list3.Total;
                color = '#3af6f8';
              }

              const pushData3 = {
                'name': name,
                'itemStyle': {
                  'color': color
                },
                'value': 8
              };
              pushArr2.push(pushData3);
            });
            Reflect.set(pushData2, 'children', pushArr2);
          }
        });
        Reflect.set(pushData, 'children', pushArr);
      }
      sunburstData.push(pushData);
    });

    const option = {
      backgroundColor: 'rgba(0,0,0,0)',
      color: ['#031d3c'],
      series: [{
        radius: ['0', '365'],
        type: 'sunburst',
        center: ['50%', '50%'],
        data: sunburstData,
        sort: (a, b) => {
          if (a.depth === 1) {
            return b.getValue() - a.getValue();
          } else {
            return a.dataIndex - b.dataIndex;
          }
        },
        label: {
          rotate: 'radial',
          color: '#81E6FF'
        },
        // emphasis: {
        //   label: {
        //     radial: '0',
        //     formatter: res => {
        //       if (!res.data.children) {
        //         return res.data.conTxt;
        //       }
        //     }
        //   }
        // },
        itemStyle: {
          borderColor: '#115a99',
          borderWidth: 1
        },
        // ????????????
        levels: [{}, {
          r0: 0,
          r: 115,
          label: {
            fontSize: 20,
            rotate: 0
          },
          itemStyle: {
            'color': 'transparent'
          }
        }, {
          r0: 115,
          r: 200,
          label: {
            fontSize: 18,
          },
          itemStyle: {
            'color': 'transparent'
          }
        }, {
          r0: 200,
          r: 220,
          label: {
            fontSize: 18,
            minAngle: 40,
            position: 'outside',
          },
          // itemStyle: {
          //   color: 'red'
          // }
        }]
        // ????????????
        // levels: [{
        // }, {
        //     r0: 0,
        //     r: 55,
        //     label: {
        //         rotate: 0,
        //         fontSize: 16
        //     },
        //     itemStyle: {
        //       'color': 'transparent'
        //     }
        // }, {
        //     r0: 55,
        //     r: 160,
        //     label: {
        //         fontSize: 16
        //     },
        //     itemStyle: {
        //       'color': 'transparent'
        //     }
        // }, {
        //     r0: 160,
        //     r: 200,
        //     label: {
        //         minAngle: 30,
        //         position: 'outside',
        //         fontSize: 16
        //     },
        //     // itemStyle: {
        //     //   'color': 'red'
        //     // }
        // }]
      }]
    };
    this.sunburst = option;
  }

  getTotalDevices() {
    this.service.serviceR('ent/cockpit/device', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        // res.Result = {TotalDevices: 23, OnlineDevices: 23, AlarmDevice: 0};
        this.deviceTotalData = res.Result;
        // ???????????????
        this.on_line(res.Result);
        // ???????????????
        this.error_line(res.Result);
      }
    });
  }

  getTotalAlarm() {
    this.service.serviceR('ent/cockpit/alarm', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        this.alarmTotalData = res.Result;
        this.one_chart(res.Result);
      }
    });
  }

  getOrderState() {
    this.service.serviceR('ent/cockpit/order', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        this.orderStateData = res.Result;
        this.spirit(res.Result);
        this.spirit1(res.Result);
      }
    });
  }

  getSeverScore() {
    this.service.serviceR('ent/cockpit/score', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        this.barBottomBar(res.Result);
      }
    });
  }

  getOrderStatis(type) {
    this.service.serviceR('ent/cockpit/orderStatis', {Days: type || 1}, (res: any) => {
      if (res.ResultCode === 0) {
        res.Result.OrderList.forEach(list => {
          if (list.Name === '??????') {
            this.pieCharts2(list);
          } else if (list.Name === '??????') {
            this.pieCharts3(list);
          } else {
            this.pieCharts4(list);
          }
        });
      }
    });
  }

  getOrderStatisLine(type) {
    this.service.serviceR('ent/cockpit/device/char', {TimeType: type || 1}, (res: any) => {
      if (res.ResultCode === 0) {
        this.barBott(res.Result);
      }
    });
  }

  getMapData(cb) {
    this.service.serviceR('ent/cockpit/building/order', {null: null}, (res: any) => {
      if (res.ResultCode === 0) {
        res.Result.List.forEach(list => {
          list.showData = false;
        });
        // ??????????????????
        // this.getSunburstData(res.Result.List);
        this.taggingList = res.Result.List;
        cb && cb(res.Result.List);
      }
    });
  }

// ????????????
  on_line(data: any) {
    this.online = {
      title: {
        show: true,
        text: data.OnlineDevices,
        subtext: '??????',
        subtextStyle: {
          fontSize: 16,
          color: '#A6FFA6'
        },
        x: 'center',
        y: '35%',
        textStyle: {
          fontSize: '20',
          color: '#FFFFFF'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: res => {
          if (data.dataIndex === 0) {
            return '??????<br/>??????(' + res.data.value + ')';
          }
        }
      },
      series: [
        {
          name: '????????????',
          type: 'pie',
          startAngle: 90,                        // ??????????????????????????????
          center: ['50%', '50%'],                 // ?????????????????????????????????
          radius: ['65%', '75%'],                 // ??????????????????
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '120'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '??????',
            value: data.OnlineDevices,
            label: {
              normal: {
                fontSize: 18,
                color: '#fff',
                fontWeight: 'bolder'
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    // !! ???????????????????????????????????? !!
                    {offset: 0, color: '#A9FFFB'},
                    {offset: 1, color: '#32B16C'}
                  ]
                },
              }
            }
          }, {
            name: '??????',
            value: data.TotalDevices - data.OnlineDevices,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        },
      ]
    };
  }

// ????????????
  error_line(data: any) {
    this.errorline = {
      title: {
        show: true,
        text: data.RepairDevices,
        subtext: '??????',
        subtextStyle: {
          fontSize: 16,
          color: '#F6B37F'
        },
        x: 'center',
        y: '35%',
        textStyle: {
          fontSize: '20',
          color: '#FFFFFF'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: res => {
          if (data.dataIndex === 0) {
            return '??????<br/>??????(' + res.data.value + ')';
          }
        }
      },
      series: [
        {
          name: '??????',
          type: 'pie',
          startAngle: 90,                        // ??????????????????????????????
          center: ['50%', '50%'],                 // ?????????????????????????????????
          radius: ['65%', '75%'],                 // ??????????????????
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '??????',
            value: data.RepairDevices,
            label: {
              normal: {
                fontSize: 18,
                color: '#fff',
                fontWeight: 'bolder'
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    // !! ???????????????????????????????????? !!
                    {offset: 0, color: '#FFD7AC'},
                    {offset: 1, color: '#FF5927'}
                  ]
                },
              }
            }
          }, {
            name: '??????',
            value: data.TotalDevices - data.RepairDevices,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        },
      ]
    };
  }

  all_chart(...data: any) {
    this.allchart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '-40%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {show: false},
      },
      yAxis: {
        type: 'category',
        data: ['??????', '??????'],
        splitLine: {show: false},
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        offset: 10,
        nameTextStyle: {
          fontSize: 15
        }
      },
      series: [
        {
          name: '??????',
          type: 'bar',
          data: [8, 800],
          barWidth: 14,
          barGap: 10,
          smooth: true,
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [5, -2],
              textStyle: {
                color: '#F68300',
                fontSize: 13
              }
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 8,
              color(params) {
                const colorList = [
                  ['#FF5927', '#FFD7AC'],
                  ['#2196F3', '#8AEAFF']
                ];
                const index = colorList[params.dataIndex];
                // if (params.dataIndex >= colorList.length) {
                //     index = params.dataIndex - colorList.length;
                // }
                return new echarts.graphic.LinearGradient(1, 0, 0, 0,
                  [{
                    offset: 0,
                    color: index[0]
                  },
                    {
                      offset: 1,
                      color: index[1]
                    }
                  ]);
              }
            },
          },


        }
      ]
    };
  }

// ?????????????????????
  spirit(data: any) {
    this.pirit = {
      tooltip: {},
      xAxis: {
        max: data.InTimePer,
        splitLine: {show: false},
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        data: [],
        inverse: true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
          margin: 10,
          color: '#999',
          fontSize: 16
        }
      },
      grid: {
        top: 'center',
        height: 200,
        left: 0,
        right: 0
      },
      series: [{
        // current data
        type: 'pictorialBar',
        symbol: 'image://../../../../../assets/home/13.jpg',
        symbolRepeat: 'fixed',
        symbolMargin: '10%',
        symbolClip: true,
        symbolSize: [1, 30],
        symbolBoundingData: 50,
        data: [data.UnVerifyTotal],
        z: 10
      }]
    };
  }

// ????????????
  spirit1(data: any) {
    this.pirit1 = {
      tooltip: {},
      xAxis: {
        max: data.InTimePer,
        splitLine: {show: false},
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        data: [],
        inverse: true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
          margin: 10,
          color: '#999',
          fontSize: 16
        }
      },
      grid: {
        top: 'center',
        height: 200,
        left: 0,
        right: 0
      },
      series: [{
        // current data
        type: 'pictorialBar',
        symbol: 'image://../../../../../assets/home/12.jpg',
        symbolRepeat: 'fixed',
        symbolMargin: '10%',
        symbolClip: true,
        symbolSize: [1, 30],
        symbolBoundingData: 50,
        data: [data.ExceptionTotal],
        markLine: {
          symbol: 'none',
          label: {
            formatter: 'max: {c}',
            position: 'start'
          },
          lineStyle: {
            color: 'green',
            type: 'dotted',
            opacity: 0.2,
            width: 0
          },
          data: [{
            type: 'max'
          }]
        },
        z: 10
      }]
    };
  }

// ????????????
  one_chart(data: any) {

    this.onechart = {
      tooltip: {
        // formatter: '{c}'
      },
      xAxis: {
        max: data.FinishTotal,
        splitLine: {show: false},
        offset: 0,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 0
        }
      },
      yAxis: {
        data: [],
        inverse: true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
          margin: 10,
          color: '#999',
          fontSize: 16
        }
      },
      grid: {
        top: 'center',
        height: 200,
        left: 0,
        right: 0
      },
      series: [{
        // current data
        type: 'pictorialBar',
        symbol: 'image://../../../../../assets/home/14.jpg',
        symbolRepeat: 'fixed',
        symbolMargin: '10%',
        symbolClip: true,
        symbolSize: [1, 20],
        symbolBoundingData: 1,
        data: [data.FinishTotal * (1 / data.AlertTotal)],
        markLine: {
          symbol: 'none',
          label: {
            formatter: 'max: {c}',
            position: 'start'
          },
          lineStyle: {
            color: 'green',
            type: 'dotted',
            opacity: 0.2,
            width: 0
          },
          data: [{
            type: 'max'
          }]
        },
        z: 10
      }]
    };
  }

// ???????????????
  pieCharts1(...data: any) {
    const percent = 65;
    // ?????????
    // tslint:disable-next-line:variable-name
    let color_percent0 = '';
    // tslint:disable-next-line:variable-name
    let color_percent100 = '';
    const dotArray = [];


    calculateDot(percent);
    // 80%??????4?????????


    // tslint:disable-next-line:no-shadowed-variable
    function calculateDot(data: number) {
      if (data <= 20) {
        dotArray.push(80);
        color_percent0 = 'rgba(12,255,0,1)';
        color_percent100 = 'rgba(12,255,0,.3)';
      } else if (data > 20 && data <= 40) {
        dotArray.push(...[80, 80]);
        color_percent0 = 'rgba(12,255,0,1)';
        color_percent100 = 'rgba(12,255,0,.3)';
      } else if (data > 40 && data <= 60) {
        dotArray.push(...[80, 80, 80]);
        color_percent0 = 'rgba(255,123,0,1)';
        color_percent100 = 'rgba(255,123,0,.3)';
      } else if (data > 60 && data <= 80) {
        dotArray.push(...[80, 80, 80, 80]);
        color_percent0 = 'rgba(255,0,36,1)';
        color_percent100 = 'rgba(255,0,36,.3)';
      } else if (data > 80 && data <= 100) {
        dotArray.push(...[80, 80, 80, 80, 80]);
        color_percent0 = 'rgba(255,0,36,1)';
        color_percent100 = 'rgba(255,0,36,.3)';
      }

    }

    this.pieTopLeft = {
      // backgroundColor: '#fff',
      title: {
        x: '48%',
        y: '50%',
        textAlign: 'center',
        top: '75%',
        // ???????????????
        text: '?????????',
        textStyle: {
          fontWeight: 'normal',
          color: '#434343',
          fontSize: 12
        },
        subtextStyle: {
          // ???????????????????????????
          fontWeight: 'bold',
          fontSize: 12,
          color: '#3ea1ff'
        },
      },
      xAxis: {
        show: false,
        // ????????????x???
        // min: function (value) {
        //   // ??????x????????????????????????
        //   return value.min - 7;
        // },
        // max: function (value) {
        //   return value.max + 7;
        // },
        splitLine: {
          lineStyle: {
            show: true,
            type: 'dashed'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 40,
          textStyle: {
            fontSize: 12,
            color: '#000'
          },
        },
        data: ['1', '2', '3', '4', '5']
      },
      yAxis: {
        show: false,
        name: '??????',
        max: 200,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        color: [{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0.4,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#8AEAFF'
            // 0% ????????????
          }, {
            offset: 1,
            color: '#3B88C9'
            // 100% ????????????
          }],
          globalCoord: false // ????????? false
        }, 'none'],
        hoverAnimation: false,
        // ???????????? hover ????????????????????????????????????
        legendHoverLink: false,
        // ?????????????????? hover ?????????????????????
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 75,
          name: '1'
        }, {
          value: 25,
          name: '2'
        }]
      }, {
        name: ' ',
        type: 'pie',
        radius: ['48%', '47%'],
        avoidLabelOverlap: false,
        // ????????????????????????????????????
        startAngle: 225,
        hoverAnimation: false,
        legendHoverLink: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 75,
          name: '1'
        }, {
          value: 25,
          name: '2'
        }]
      }, {
        name: '',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        startAngle: 315,
        color: '#F4F4F4',
        hoverAnimation: false,
        legendHoverLink: false,
        clockwise: false,
        itemStyle: {
          normal: {
            borderColor: 'transparent',
            borderWidth: '20'
          },
          emphasis: {
            borderColor: 'transparent',
            borderWidth: '20'
          }
        },
        z: 10,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: (100 - percent) * 270 / 360,
          label: {
            normal: {
              formatter: '65',
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: 'normal',
                color: '#2196F3'
              }
            }
          },
          name: ''
        }, {
          value: 1,
          name: ''
        }, {
          value: 100 - (100 - percent) * 270 / 360,
          name: ''
        }]
      },
        // ?????????100 - (100 - percent) * 270 / 360
        // formatter: percent + '%'
        // ?????????5?????????
        // {
        //   name: '',
        //   symbolOffset: ['20', '0'],
        //   // ??????????????????????????????????????????????????? symbol ????????????????????????????????????????????????????????????????????????
        //   type: 'scatter',
        //   data: [80, 80, 80, 80, 80]
        // },
        // ?????????????????????????????????
        // {
        //   name: '',
        //   type: 'scatter',
        //   symbolOffset: ['20', '0'],
        //   // ?????????????????????
        //   color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
        //     offset: 0,
        //     color: color_percent0
        //   }, {
        //     offset: 1,
        //     color: color_percent100
        //   }]),
        //   data: dotArray
        // },
        // {
        //   // ????????????
        //   name: '',
        //   type: 'line',
        //   color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
        //     offset: 0,
        //     color: color_percent0
        //   }, {
        //     offset: 1,
        //     color: color_percent100
        //   }]),
        //   symbol: "none",
        //   data: [85, 85, 85, 85, 85, 85]
        // },
        // {
        //   // ????????????
        //   name: '',
        //   type: 'line',
        //   symbol: 'none',
        //   // ????????????????????????
        //   color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
        //     offset: 0,
        //     color: color_percent0
        //   }, {
        //     offset: 1,
        //     color: color_percent100
        //   }]),
        //   data: [75, 75, 75, 75, 75, 75]
        // }
      ]
    };
  }

// ?????????????????????1
  pieCharts2(data: any) {
    this.pieTopMiddle = {
      title: {
        show: true,
        text: data.Total,
        subtext: '??????',
        subtextStyle: {
          fontSize: 16,
          color: '#81E6FF'
        },
        x: 'center',
        y: '40%',
        textStyle: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: 100,
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: list => {
          if (list.dataIndex === 0) {
            return `${list.data.name}(${list.percent}%)`;
          }
        }
      },
      series: [
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90,                        // ??????????????????????????????
          center: ['50%', '50%'],                 // ?????????????????????????????????
          radius: ['30%', '40%'],                 // ??????????????????
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              name: '?????????' + data.UncheckTotal,
              value: data.UncheckTotal,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    colorStops: [
                      // !! ???????????????????????????????????? !!
                      {offset: 0, color: '#FFD7AC'},
                      {offset: 1, color: '#FF5927'}
                    ]
                  },
                }
              }
            }, {
              name: '???????????????',
              value: data.UncheckTotal === 0 ? 1 : data.Total - data.UncheckTotal,
              label: {
                normal: {
                  show: false,
                  fontSize: 0
                }
              },
              itemStyle: {
                normal: {
                  color: '#02364F'
                },
                emphasis: {
                  color: '#02364F'
                }
              },
              hoverAnimation: false
            }]
        },
        {
          name: '??????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '??????' + data.FinishTotal,
            value: data.FinishTotal,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    {offset: 0, color: '#2FD6FA'},
                    {offset: 1, color: '#2196F3'}
                  ]
                },
              }
            }
          }, {
            name: '????????????',
            value: data.FinishTotal === 0 ? 1 : data.Total - data.FinishTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        },
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '?????????' + data.HandleTotal,
            value: data.HandleTotal,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    {offset: 0, color: '#A9FFFB'},
                    {offset: 1, color: '#32B16C'}
                  ]
                },
              }
            }
          }, {
            name: '???????????????',
            value: data.HandleTotal === 0 ? 1 : data.Total - data.HandleTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        }]
    };
  }

// ?????????????????????2
  pieCharts3(data: any) {
    this.pieTopMiddle1 = {
      title: {
        show: true,
        text: data.Total,
        subtext: '??????',
        subtextStyle: {
          fontSize: 16,
          color: '#81E6FF'
        },
        x: 'center',
        y: '40%',
        textStyle: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: 100
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: list => {
          if (list.dataIndex === 0) {
            return `${list.data.name}(${list.percent}%)`;
          }
        }
      },
      series: [
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90,                        // ??????????????????????????????
          center: ['50%', '50%'],                 // ?????????????????????????????????
          radius: ['30%', '40%'],                 // ??????????????????
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              name: '?????????' + data.UncheckTotal,
              value: data.UncheckTotal,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    colorStops: [
                      {offset: 0, color: '#FFD7AC'},
                      {offset: 1, color: '#FF5927'}
                    ]
                  },
                }
              }
            }, {
              name: '???????????????',
              value: data.UncheckTotal === 0 ? 1 : data.Total - data.UncheckTotal,
              label: {
                normal: {
                  show: false,
                  fontSize: 0
                }
              },
              itemStyle: {
                normal: {
                  color: '#02364F'
                },
                emphasis: {
                  color: '#02364F'
                }
              },
              hoverAnimation: false
            }]
        },
        {
          name: '??????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '??????' + data.FinishTotal,
            value: data.FinishTotal,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    {offset: 0, color: '#2FD6FA'},
                    {offset: 1, color: '#2196F3'}
                  ]
                },
              }
            }
          }, {
            name: '????????????',
            value: data.FinishTotal === 0 ? 1 : data.Total - data.FinishTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        },
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '?????????' + data.HandleTotal,
            value: data.HandleTotal,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  colorStops: [
                    // !! ??????????????????????????? !!
                    {offset: 0, color: '#A9FFFB'},
                    {offset: 1, color: '#32B16C'}
                  ]
                },
              }
            }
          }, {
            name: '???????????????',
            value: data.HandleTotal === 0 ? 1 : data.Total - data.HandleTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        }]
    };
  }

// ?????????????????????3
  pieCharts4(data: any) {
    this.pieTopMiddle2 = {
      title: {
        show: true,
        text: data.Total,
        subtext: '??????',
        subtextStyle: {
          fontSize: 16,
          color: '#81E6FF'
        },
        x: 'center',
        y: '40%',
        textStyle: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: 100
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: list => {
          if (data.dataIndex === 0) {
            return `${list.data.name} <br/>${list.data.name}(${list.percent}%)`;
          }
        }
      },
      series: [
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90,                        // ??????????????????????????????
          center: ['50%', '50%'],                 // ?????????????????????????????????
          radius: ['30%', '40%'],                 // ??????????????????
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              name: '?????????',
              value: data.UncheckTotal,
              // label: {
              //   normal: {
              //     fontSize: 18,
              //     color: '#fff',
              //     fontWeight: 'bolder'
              //   }
              // },
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    colorStops: [
                      // !! ???????????????????????????????????? !!
                      {offset: 0, color: '#FFD7AC'},
                      {offset: 1, color: '#FF5927'}
                    ]
                  },
                }
              }
            }, {
              name: '???????????????',
              value: data.UncheckTotal === 0 ? 1 : data.Total - data.UncheckTotal,
              label: {
                normal: {
                  show: false,
                  fontSize: 0
                }
              },
              itemStyle: {
                normal: {
                  color: '#02364F'
                },
                emphasis: {
                  color: '#02364F'
                }
              },
              hoverAnimation: false
            }]
        },
        {
          name: '??????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '??????',
            value: data.FinishTotal,
            // label: {
            //     normal: {
            //         fontSize: 18,
            //         color: '#fff',
            //         fontWeight: 'bolder'
            //     }
            // },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  // x: pointStart[0],
                  // y: pointStart[1],
                  // x2: pointEnd2[0],       //  ???????????????????????????????????????????????????????????????
                  // y2: pointEnd2[1],
                  colorStops: [
                    // !! ??????????????????????????? !!
                    {offset: 0, color: '#2FD6FA'},
                    {offset: 1, color: '#2196F3'}
                  ]
                },
              }
            }
          }, {
            name: '????????????',
            value: data.FinishTotal === 0 ? 1 : data.Total - data.FinishTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        },
        {
          name: '?????????',
          type: 'pie',
          startAngle: 90, // ??????????????????????????????
          center: ['50%', '50%'],
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: ''
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            name: '?????????',
            value: data.HandleTotal,
            // label: {
            //     normal: {
            //         fontSize: 18,
            //         color: '#fff',
            //         fontWeight: 'bolder'
            //     }
            // },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  // x: pointStart[0],
                  // y: pointStart[1],
                  // x2: pointEnd2[0],       //  ???????????????????????????????????????????????????????????????
                  // y2: pointEnd2[1],
                  colorStops: [
                    // !! ??????????????????????????? !!
                    {offset: 0, color: '#A9FFFB'},
                    {offset: 1, color: '#32B16C'}
                  ]
                },
              }
            }
          }, {
            name: '???????????????',
            value: data.HandleTotal === 0 ? 1 : data.Total - data.HandleTotal,
            label: {
              normal: {
                show: false,
                fontSize: 0
              }
            },
            itemStyle: {
              normal: {
                color: '#02364F'
              },
              emphasis: {
                color: '#02364F'
              }
            },
            hoverAnimation: false
          }]
        }]
    };
  }

// ??????????????????/??????
  barBottomBar(data: any) {
    const dataName = [];
    const scoreVal = [];
    const scoreValAll = [];
    data.List.forEach(list => {
      dataName.push(list.TeamName.substr(0, 4));
      scoreVal.push(list.InTimePer);
      scoreValAll.push(100);
    });

    this.barBottom = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // ??????????????????????????????????????????
          type: 'shadow'        // ??????????????????????????????'line' | 'shadow'
        }
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
          data: dataName,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          splitLine: {show: false},
          axisLine: {
            show: false,
            lineStyle: {},
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#98A0A8',
              fontSize: '12'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            show: false,
            interval: 'auto',
            formatter: '{value} %'
          },
          show: true,
          splitLine: {show: false},
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
        {
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            //  ??????????????????
            lineStyle: {
              // ????????????????????????
              color: ['#EEEEEE']
            }
          },
          axisLine: {
            show: false,
            lineStyle: {},
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#98A0A8',
              fontSize: '12'
            }
          }
        }
      ],
      series: [
        {
          name: '?????????',
          type: 'bar',
          barWidth: '40',
          data: scoreVal,
          barGap: '-100%',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#8f82bc',
                  fontSize: 14
                },
              },
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(25, 60, 107, 0.8)'
              }, {
                offset: 1,
                color: 'rgba(25, 60, 107, 0.7)'
              }]),
            }
          },
        },
        {
          name: '??????',
          type: 'bar',
          barWidth: '40',
          data: scoreValAll,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(25, 60, 107, 0.6)'
              }, {
                offset: 1,
                color: 'rgba(25, 60, 107, 0.6)'
              }]),
            }
          },
        },
      ]
    };
  }

// 3d??????
// classification(...data: any) {
//   const buildingsGeoJSON = require('../../../../../assets/home/fuzhou.json');

//   echarts.registerMap('??????', buildingsGeoJSON);

//   const regions = buildingsGeoJSON.features.map(feature => {
//     return {
//       name: '??????',
//       value: Math.max(Math.sqrt(feature.properties.height), 0.1),
//       height: Math.max(Math.sqrt(feature.properties.height), 0.1),
//     };
//   });

//   const scatterData = [
//     {
//       'value': [
//         119.320717,
//         26.075756,
//         100
//       ]
//     },
//   ];

//   this.geo3DData = {
//     geo3D: {
//       map: '??????',
//       shading: 'realistic',
//       label: {                // ?????????????????????
//         show: true,                 // (????????????????????????)?????????????????? [ default: false ]
//         textStyle: {                // ?????????????????????
//           color: '#fff',                  // ?????????????????????????????????
//           fontSize: 12,                    // ????????????
//           opacity: 1,                     // ???????????????
//           backgroundColor: 'rgba(0,23,11,0)'      // ???????????????
//         },
//       },
//       postEffect: {
//         enable: true,
//         bloom: {
//           enable: false
//         },
//         SSAO: {
//           enable: true,
//           quality: 'medium',
//           radius: 10,
//           intensity: 1.2
//         },
//         depthOfField: {
//           enable: false,
//           focalRange: 5,
//           fstop: 1,
//           blurRadius: 6
//         }
//       },
//       groundPlane: {
//         show: true,
//         color: 'rgba(0,0,0,0)'
//       },
//       light: {
//         main: {
//           intensity: 6,
//           shadow: true,
//           shadowQuality: 'high',
//           alpha: 30
//         },
//         ambient: {
//           intensity: 0
//         },
//         ambientCubemap: {
//           exposure: 2,
//           diffuseIntensity: 1,
//           specularIntensity: 1
//         }
//       },
//       viewControl: {
//         minBeta: -360,
//         maxBeta: 360
//       },

//       itemStyle: {
//         color: '#004991',
//         borderWidth: 1
//       },
//       silent: true,

//       instancing: true,

//       boxWidth: 60,
//       boxHeight: 2.5,
//       regionHeight: 1,
//       top: -320,
//       bottom: -110,

//       data: regions
//     },
//     series: {
//       type: 'scatter3D',
//       coordinateSystem: 'geo3D',
//       data: scatterData,
//       symbol: `path://M20.008,32c10.298,0,19,4.351,19,9.5s-8.701,9.5-19,9.5c-10.299,0-19-4.351-19-9.5S9.709,32,20.008,32
//       M20.008,31c-11.046,0-20,4.701-20,10.5s8.954,10.5,20,10.5c11.046,0,20-4.701,20-10.5S31.055,31,20.008,31L20.008,31z
//       M16.012,19.014h7.992l-3.996,7.978L16.012,19.014z M20.002,40.996L22,37.007h-3.996L20.002,40.996z M20.005,34.993l2.997-5.983
//      h-5.994L20.005,34.993z M27.996,8c0,4.418-3.582,8-8,8c-4.418,0-8-3.582-8-8s3.582-8,8-8C24.414,0,27.996,3.582,27.996,8z M22.996,8
//      c0-1.657-1.344-3-3-3c-1.657,0-3,1.343-3,3s1.343,3,3,3C21.652,11,22.996,9.657,22.996,8z`,
//       symbolSize: [40, 52],
//       itemStyle: {
//         color: '#00FFC6',
//         borderColor: '#fff'
//       }
//     },
//   };

// }
// ????????????
  barBott(data: any) {
    data.DateList.forEach((list, index) => {
      data.DateList[index] = list.split('-')[1] + '/' + list.split('-')[2];
    });

    this.barBottomline = {
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      // legend: {
      //     data: ['????????????']
      // },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        itemHeight: 12,
        itemWidth: 12,
        data: [
          {
            name: '??????',
            icon: 'rect',
          },
          {
            name: '??????',
            icon: 'rect',
          }
        ],
        top: 7,
        right: 20,
        textStyle: {
          fontSize: 16,
          color: '#B3C2D2',
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // rotate: 40,
            show: true,
            textStyle: {
              color: '#98A0A8',
              fontSize: '12'
            }
          },
          data: data.DateList
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#98A0A8',
              fontSize: '12'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
        }
      ],
      series: [
        {
          name: '??????',
          type: 'line',
          stack: '??????',
          smooth: true,
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#5AFE81'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(90, 254, 129, 0.4)'
                },
                  {
                    offset: 1,
                    color: 'rgba(90, 254, 129, 0)'
                  },
                ]
              )
            }
          },
          data: data.AlarmList
        },
        {
          name: '??????',
          type: 'line',
          stack: '??????',
          smooth: true,
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#2FD6FA'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(47, 214, 250, 0.4)'
                },
                  {
                    offset: 1,
                    color: 'rgba(47, 214, 250, 0)'
                  },
                ]
              )
            }
          },
          data: data.OnlineList
        },
      ]
    };
  }

  timebetwin(e) {
    this.colorIndex = e;
    this.getOrderStatisLine(e);
    // if (e === 1) {
    //   const data = ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7'];
    //   const data1 = [2, 4, 5, 5, 7, 6, 4];
    //   const data2 = [4, 5, 6, 6, 8, 8, 5];
    //   this.barBott(data, data1, data2);
    // } else if (e === 2) {
    //   const data = ['4/4', '4/6', '4/8', '4/10', '4/12', '4/14', '4/16', '4/18', '4/20', '4/22', '4/24', '4/26', '4/28', '4/30'];
    //   const data1 = [20, 30, 100, 50, 60, 70, 50, 20, 30, 100, 50, 60, 70, 50, 90];
    //   const data2 = [20, 30, 40, 50, 60, 70, 40, 20, 30, 40, 50, 60, 70, 40, 80];
    //   this.barBott(data, data1, data2);
    // } else if (e === 3) {
    //   const data = ['4/4', '4/14', '4/24', '5/4', '5/14', '5/24', '6/4', '6/14', '6/24'];
    //   const data1 = [50, 60, 70, 50, 20, 30, 100, 50, 60];
    //   const data2 = [60, 70, 40, 20, 30, 40, 50, 60, 70];
    //   this.barBott(data, data1, data2);
    // }
  }

  timeb(e) {
    this.getOrderStatis(e);
    this.timeIndex = e;
    // if (e === 1) {
    //   const data = 21;
    //   const data1 = 21;
    //   const data2 = 21;
    //   this.pieCharts2(data, data1, data2);
    //   this.pieCharts3(data, data1, data2);
    //   this.pieCharts4(data, data1, data2);
    // } else if (e === 2) {
    //   const data = 100;
    //   const data1 = 21;
    //   const data2 = 74;
    //   this.pieCharts2(data, data1, data2);
    //   this.pieCharts3(data, data1, data2);
    //   this.pieCharts4(data, data1, data2);
    // }
  }

  gotoHome() {
    this.router.navigate(['index/home']);
  }

  goPage(type) {
    if (type === 'dev') {
      this.router.navigate(['index/smartdev']);
    } else if (type === 'monitor') {
      this.router.navigate(['index/diagdevrt']);
    } else if (type === 'repair') {
      this.router.navigate(['index/orderschedulechk']);
    } else if (type === 'warn') {
      this.router.navigate(['index/diagalert']);
    } else if (type === 'wx') {
      this.router.navigate(['index/schedulepatrol']);
    } else if (type === 'by') {
      this.router.navigate(['index/schedulekeep']);
    } else if (type === 'xj') {
      this.router.navigate(['index/orderschedulechk']);
    }
  }
}
