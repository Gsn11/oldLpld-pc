import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CalendarComponent } from '../../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';
import { PriceComponent } from '../../../component/price/price.component';
import { MatSnackBar } from '@angular/material';
import { IAddList } from './iAdd.interface';
import { Service } from '../../../../../../service/service';
import buildData from '../../../../../../../environments/buildType';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  bemInfoData: any;
  userInfo: any;
  crumbsList: object;
  imgsrc: string;
  DeviceType: string;
  imgsrcData: object[] = [];
  @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  ScheduleSetup: any;
  Users: any;
  SelectUsers: any;
  MSName: string; // 计划名称
  MSDesc: string; // 计划描述
  OrderTimeOut: number;
  WorkExpire: number;
  ArriveExpire: number;
  ServiceType: any;
  SelectServiceType: any;
  Builds: any;
  Workers: any;
  SelectWorkers: any;
  ServiceProviders: any;
  SelectServiceProviders: any;
  @ViewChild(PriceComponent, null) priceComponent: PriceComponent;
  DeviceList: any;
  Items: any;
  SelectItems: any;
  ServiceFee: number; // 上门费
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private service: Service
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.imgsrc = '';
    this.SelectUsers = new FormControl('');
    const Isentver = this.userInfo.Isentver;
    if (!Isentver) {
      this.ServiceType = [
        { name: buildData.serviceProvider, state: '0' },
        { name: '固定服务商', state: '1' },
        { name: '服务大市场', state: '2' },
      ];
      this.SelectServiceType = new FormControl({
        value: '0',
        disabled: false
      });
    } else {
      this.ServiceType = [
        { name: buildData.serviceProvider, state: '0' },
      ];
      this.SelectServiceType = new FormControl({
        value: '0',
        disabled: true
      });
    }
    route.data
			.subscribe(
				(res: any) => {
					this.DeviceType = res.type;
				}
			);
      if (this.DeviceType === 'alertsms') {
        this.crumbsList = [
            { name: '报警管理', open: false },
            { name: '实时报警', open: false }
        ];
		    } else {
			    this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '故障管理', open: false },
            { name: '预防性诊断', open: false }
			   ];
		    }
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '故障管理', open: false },
      { name: '辅助诊断', open: true, url: 'diagassit' },
      { name: '派单', open: false, url: '' }
    ];
    this.SelectWorkers = new FormControl('');
    this.SelectServiceProviders = new FormControl('');
    this.MSName = this.bemInfoData.devName + '故障';
    this.MSDesc = this.bemInfoData.msg;
    this.OrderTimeOut = null;
    this.WorkExpire = null;
    this.ArriveExpire = null;
    this.Items = [0, 1, 2];
    this.SelectItems = new FormControl({
      value: 2,
      disabled: false
    });
    this.ServiceFee = 0;
  }

  ngOnInit() {
    this.getBuildings();
    const deviceData = {
      Customer: this.userInfo.Customer.Seq,
      NeedShare: 1,
      Devices: this.bemInfoData.deviceSeq
    };
    const data = {
      State: 0
    };
    this.service.serviceR('ent/device/monitor/6011', deviceData, (res: any) => {
      if (res.ResultCode === 0) {
        this.DeviceList = res.Result.Devices[0];
      }
    });
    const scheduleSetupData = {
      Customer: this.userInfo.Customer.Seq
    };
    this.service.serviceR('ent/params/schedulesetup/11701', scheduleSetupData, (res: any) => {
      if (res.ResultCode === 0) {
        this.ScheduleSetup = res.Result.ScheduleSetup[0];
        this.OrderTimeOut = this.ScheduleSetup.OrderTimeOut;
        this.WorkExpire = this.ScheduleSetup.WorkExpire;
        this.ArriveExpire = this.ScheduleSetup.ArriveExpire;
      }
    });
    this.service.serviceR('ent/serviceprovider/8511', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.ServiceProviders = res.Result.ServiceProviders;
        if (this.ServiceProviders.length !== 0) {
          this.SelectServiceProviders.setValue(this.ServiceProviders[0].Seq);
        }
      }
    });
  }

  getBuildings() {
    const data = {
      State: 0,
      Buildings: this.bemInfoData.buildingSeq
    };
    this.service.serviceR('ent/building/monitor/5001', data, (res: any) => {
      if (res.ResultCode === 0) {
        const b = res.Result.Buildings[0];
        if (b) {
          if (b.DistrictPriceVisit) {
            this.ServiceFee = b.DistrictPriceVisit;
          } else if (b.CityPriceVisit) {
            this.ServiceFee = b.CityPriceVisit;
          } else if (b.ProvincePriceVisit) {
            this.ServiceFee = b.ProvincePriceVisit;
          } else {
            this.ServiceFee = 0;
          }
        } else {
          this.ServiceFee = 0;
        }
        this.getWorket(b.Subjection);
        this.getUser(b.Subjection);
      }
    });
  }

  getWorket(sj: number) {
    const data = {
      State: 0,
      UserType: 0,
      subjection: sj
    };
    this.service.serviceR('ent/cususer/4611', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.Workers = Array.from(res.Result.Users);
        this.SelectWorkers.setValue(this.Workers[0].Seq);
      }
    });
  }

  getUser(sj: number) {
    const data = {
      State: 0,
      UserType: 1,
      subjection: sj
    };
    this.service.serviceR('ent/cususer/4611', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.Users = Array.from(res.Result.Users);
        this.SelectUsers.setValue(this.Users[0].Seq);
      }
    });
  }

  goback() {
    this.router.navigate(['index/diagassit']);
  }

  userSave() {
    if (this.SelectServiceType.value === '0') {
      if (!this.SelectWorkers.value) {
        this.snackBar.open('请选择工作人员', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
    } else if (this.SelectServiceType.value === '1') {
      if (!this.SelectServiceProviders.value) {
        this.snackBar.open('请选择固定服务商', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
        return;
      }
    }
    if (this.MSName === '' || this.MSName === null) {
      this.snackBar.open('请输入任务名称', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IAddList = {
      Customer: this.userInfo.Customer.Seq,
      ArriveExpire: this.ArriveExpire,
      Charger: this.SelectUsers.value,
      MSDesc: this.MSDesc,
      MSName: this.MSName,
      OrderExpire: this.OrderTimeOut,
      Pics: this.manyFile.setImgsrcData,
      ServiceType: this.SelectServiceType.value,
      WorkExpire: this.WorkExpire,
      Type: 2,
      FeedbackType: this.SelectItems.value,
      AlertRecord: this.bemInfoData,
      DevRecord: this.DeviceList,
      MSType: 3,
      PriceVisit: this.ServiceFee
    };
    if (this.SelectServiceType.value === '0') {
      Reflect.set(data, 'Workers', this.SelectWorkers.value);
    } else if (this.SelectServiceType === '1') {
      Reflect.set(data, 'SrvProvider', this.SelectServiceProviders.value);
    }
    if (this.SelectServiceType.value === '1' || this.SelectServiceType.value === '2') {
      Reflect.set(data, 'Prices', this.priceComponent.Items);
    }
    this.service.serviceR('ent/maintenance/8002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('派单成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/diagassit']);
      }
    });
  }
}
