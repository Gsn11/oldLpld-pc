import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { Service } from '../../../../../service/service';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';

// 此模块依赖加包@angular/marteril-moment-adapter 和 moment
// display修改日期数据格式
export const MY_MOMENT_DATE_FORMATS: MatDateFormats = {
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
  selector: 'app-repairbrowse',
  templateUrl: './repairBrowse.component.html',
  styleUrls: ['./repairBrowse.component.scss'],
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

export class RepairBrowseComponent implements OnInit {
  selectDate = '2020-06';
  crumbsList: object;
  checkType = 0;
  monthDay = [];
  // 建筑物列表
  buildingList: [];
  checkBuild = '';
  buildingName = [];
  // 总共多少周
  wxWeekTotal = [];
  // 选择的第几周
  wxWeekIndex = 0;
  // 每月从周几开始
  wxWeekDay = null;
  // 每月有多少天
  wxGetMonthDayTotal = null;
  // 周列表数据
  wxGetDayList = [];
  // 周数据列表旧
  wxGetDayListOld = [];
  // 巡检和保养任务列表
  xjList = [];
  constructor(
    private service: Service,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.crumbsList = [
      { name: '服务监管', open: false },
      { name: '派单一览表', open: false }
    ];

    this.selectDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)}`;

    for (let i = 0; i < 30; i++) {
      this.monthDay.push(i);
    }

    // 获取数据
    this.getPlanList();
    this.getBuildingList();
  }

  setwxWeekTotal() {
    const monthStart = this.selectDate + '-01 00:00:00';
    if (new Date(monthStart).getDay() === 0) {
      this.wxWeekDay = 7;
    } else {
      this.wxWeekDay = new Date(monthStart).getDay();
    }
    this.wxGetMonthDayTotal = new Date(Number(this.selectDate.split('-')[0]), Number(this.selectDate.split('-')[1]), 0).getDate(); // 月份有几天
    const wxWeekTotal = Math.ceil((this.wxGetMonthDayTotal + this.wxWeekDay - 1) / 7);
    this.wxWeekTotal = [];
    for (let i = 0; i < wxWeekTotal; i++) {
      this.wxWeekTotal.push({
        name: `第${i + 1}周`,
        index: i
      });
    }
    const monthAllwxWeekDay = [];
    for (let i = 0; i < this.wxWeekDay - 1; i++) {
      monthAllwxWeekDay.push(null);
    }
    for (let i = 0; i < this.wxGetMonthDayTotal; i++) {
      monthAllwxWeekDay.push(i + 1);
    }
    this.wxGetDayList = [];
    const dayNum = ['一', '二', '三', '四', '五', '六', '日'];
    for (let i = this.wxWeekIndex * 7; i < (this.wxWeekIndex + 1) * 7; i++) {
      if (monthAllwxWeekDay[i]) {
        this.wxGetDayList.push({
          week: '星期' + dayNum[7 - ((this.wxWeekIndex + 1) * 7 - i)],
          day: i - this.wxWeekDay + 2 + '日',
          date: this.selectDate + '-' + (i - this.wxWeekDay + 2 < 10 ? '0' + (i - this.wxWeekDay + 2) : i - this.wxWeekDay + 2),
          dataList: []
        });
      } else {
        this.wxGetDayList.push({
          week: '',
          date: '',
          dataList: []
        });
      }
    }
    this.wxGetDayListOld.forEach(list => {
      this.wxGetDayList.forEach(list2 => {
        if (list.OrderTime.split(' ')[0] === list2.date) {
          list2.dataList.push(list);
        }
      });
    });
  }
  
  // 获取建筑物
  getBuildingList() {
		const data = { null: null };
		this.service.serviceR('ent/building/5001', data, (res: any) => {
			if (res.ResultCode === 0) {
        console.log(res.Result)
				this.buildingList = res.Result.Buildings;
			}
		});
	}

  goRealTimeDetail() {
    this.router.navigate(['index/realTimeDetail']);
  }

  goDetail(type, item) {
    if (type === 'wx') {
      const data = {
        ServiceType: '0',
        MOSeq: item.Seq,
      };
      this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
        if (res.ResultCode === 0) {
          localStorage.setItem('bemInfoData', JSON.stringify(res.Result.MaintenanceOrders[0]));
          this.router.navigate(['index/orderfix/info']);
        }
      });
    } else if (type === 'xj') {
      if (item.Seq) {
        const data = {
          ServiceType: '0,4',
          MOSeq: item.Seq,
        };
        this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
            if (res.ResultCode === 0) {
                localStorage.setItem('bemInfoData', JSON.stringify(res.Result.MaintenanceOrders[0]));
                this.router.navigate(['index/orderschedulechk/info']);
            }
        });
      }
    } else if (type === 'by') {
        if (item.Seq) {
          const data = {
            ServiceType: '0,4',
            MOSeq: item.Seq,
          };
          this.service.serviceR('ent/maintenance/order/8011', data, (res: any) => {
              if (res.ResultCode === 0) {
                  localStorage.setItem('bemInfoData', JSON.stringify(res.Result.MaintenanceOrders[0]));
                  this.router.navigate(['index/orderkeep/info']);
              }
          });
        }
    } else {
      const data = {
        MSSeq: item.MSSeq,
        ServiceType: '0'
      };
      this.service.serviceR('ent/maintenance/8311', data, (res: any) => {
        if (res.ResultCode === 0) {
          localStorage.setItem('bemInfoData', JSON.stringify(res.Result.MaintenanceSchedules[0]));
          this.router.navigate(['index/schedulepatrol/info']);
        }
      });
    }
  }

  getQueryOrder(MSSeq, index, listData) {
    const data = {
      DateTime: this.selectDate,
      MsSeq: MSSeq,
    };
    this.service.serviceR('ent/maintenance/8016', data, (res: any) => {
      if (res.ResultCode === 0) {
        if (Number(this.checkType) === 2) {
          console.log(res.Result.List);
          res.Result.List.forEach(list => {
            const pushData = list;
            for (const i in listData) {
              if (i && list[i] === undefined) {
                pushData[i] = listData[i];
              }
            }
            this.wxGetDayListOld.push(pushData);
          });
        } else {
          this.xjList[index].dataList.forEach((list, listIndex) => {
            res.Result.List.forEach(list2 => {
              if (list.date === list2.OrderTime.split(' ')[0]) {
                this.xjList[index].dataList[listIndex] = { ...list, ...list2 };
              }
            });
          });
        }
        this.setwxWeekTotal();
      }
    });
  }

  getPlanList() {
    const data = {
      DateTime: this.selectDate,
      Type: this.checkType,
      BSeq: this.checkBuild,
      State: '0,1,3'
    };
    this.service.serviceR('ent/maintenance/8301', data, (res: any) => {
      if (res.ResultCode === 0) {
        // 获取月有几周
        this.setwxWeekTotal();
        this.wxGetDayListOld = [];
        // this.buildingName = res.Result
        console.log(res)
        res.Result.MaintenanceSchedules.forEach(list => {
          list.dataList = [];
          const dayNum = ['日', '一', '二', '三', '四', '五', '六'];
          for (let i = 0; i < new Date(Number(this.selectDate.split('-')[0]), Number(this.selectDate.split('-')[1]), 0).getDate(); i++) {
            list.dataList.push({
              date: this.selectDate + '-' + (i + 1 < 10 ? '0' + (i + 1) : i + 1),
              weekDay: dayNum[new Date(this.selectDate + '-' + (i + 1 < 10 ? '0' + (i + 1) : i + 1)).getDay()]
            });
          }
        });

        this.xjList = res.Result.MaintenanceSchedules;
        res.Result.MaintenanceSchedules.forEach((list, index) => {
          this.getQueryOrder(list.MSSeq, index, list);
        });
      }
    });
  }

  chosenMonthHandler(date: any, datepicker: MatDatepicker<any>) {
    this.selectDate = `${date.year()}-${date.month() + 1 < 10 ? '0' + (date.month() + 1) : (date.month() + 1)}`;
    datepicker.close();
  }
  downloadDeviceFile() {
    const body = {
      DateTime: this.selectDate,
      Type: this.checkType,
      State: '0,1,3',
      FileName: '派单一览表'
    };
    console.log(body);
    // if (this.TeamValue.value !== '') {
    //   Reflect.set(body, 'TeamSeq', this.TeamValue.value);
    // }
    new DownloadFile(body, 'ent/maintenance/8016/export').downloadfile();
}
}
