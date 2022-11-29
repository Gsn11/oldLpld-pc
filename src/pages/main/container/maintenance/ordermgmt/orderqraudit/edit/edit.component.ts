import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../../../../component/calendar/calendar.component';
import { ItemsComponent } from '../../../component/items/items.component';
import { PriceComponent } from '../../../component/price/price.component';
import { IEditList } from './iEdit.interface';
import { Service } from '../../../../../../service/service';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';
import { ServiceType, ServiceInside } from '../../../component/json/order.json';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  bemInfoData: any;
  userInfo: any;
  crumbsList: object;
  @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
  ScheduleSetup: any;
  MSName: string; // 计划名称
  MSDesc: string; // 计划描述
  OrderTimeOut: number = null;
  WorkExpire: number = null;
  ArriveExpire: number = null;
  ServiceFee: number;
  ServiceType: any;
  SelectServiceType: any;
  MaintenanceTemplates: any;
  Builds: any;
  ServiceProviders: any;
  SelectServiceProviders: any;
  @ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;
  @ViewChild(PriceComponent, null) priceComponent: PriceComponent;
  isCheck: boolean;
  BuildingSeq: number = null;
  priceList: any = null;
  scheItem: any;
  MOSeq: any;
  OrderTime: any;
  SelectHH: any;
  HH: number[];
  SelectMM: any;
  MM: number[];
  setConfim: boolean;
  chooseDeleteSeq: number;
  ChooseServiceName: string = null;
  ServiceSeq: number = null;
  ChooseWorkerName: string = null;
  WorkerSeq: number = null;
  NeedQrcode: number;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: Service,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    console.log(this.bemInfoData);
    const Isentver = this.userInfo.Isentver;
    if (!Isentver) {
      this.ServiceType = ServiceType;
      this.SelectServiceType = new FormControl({
        value: this.bemInfoData.ServiceType.toString(),
        disabled: false
      });
    } else {
      this.ServiceType = ServiceInside;
      this.SelectServiceType = new FormControl({
        value: '0',
        disabled: true
      });
    }
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '派单管理', open: false },
      { name: '二维码派单审核', open: true, url: 'orderqraudit' },
      { name: '审核', open: false }
    ];
    this.SelectServiceProviders = new FormControl('');
    this.MSName = this.bemInfoData.MSName;
    this.MSDesc = this.bemInfoData.MSDesc;
    this.OrderTime = this.bemInfoData.OrderTime;
    this.ServiceFee = 0;
    this.isCheck = false;
    this.scheItem = [];
    this.MOSeq = this.bemInfoData.MOSeq;
    this.HH = [];
    this.SelectHH = new FormControl();
    this.MM = [];
    this.SelectMM = new FormControl();
    this.setConfim = false;
    this.NeedQrcode = 1;
  }

  ngOnInit() {
    let h = 0;
    let m = 0;
    while (h < 24) {
      this.HH.push(h);
      h++;
    }
    while (m < 60) {
      this.MM.push(m);
      m++;
    }
    const t = this.OrderTime.split(' ')[1].split(':');
    this.SelectHH.setValue(parseInt(t[0], null));
    this.SelectMM.setValue(parseInt(t[1], null));
    const data = {
      State: 0
    };
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
    const cususerData = {
      State: 0,
      BSeqs: this.BuildingSeq,
      UserType: 1
    };
    const workerData = {
      State: 0,
      BSeqs: this.BuildingSeq,
      UserType: 0
    };
    if (this.scheItem.length !== 0) {
      Reflect.set(cususerData, 'subjection', this.scheItem[0].Subjection);
      Reflect.set(workerData, 'subjection', this.scheItem[0].Subjection);
    }
    this.service.serviceR('ent/cususer/4611', cususerData, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res.Result.Users);
        const users: any = res.Result.Users[0];
        this.ServiceSeq = users.Seq;
        this.ChooseServiceName = `${users.LoginId} - ${users.Name} - ${users.UserTel}`;
      }
    });
    this.service.serviceR('ent/cususer/4611', workerData, (res: any) => {
      if (res.ResultCode === 0) {
        const users: any = res.Result.Users[0];
        this.WorkerSeq = users.Seq;
        this.ChooseWorkerName = `${users.LoginId} - ${users.Name} - ${users.UserTel}`;
      }
    });
    const ScheduleData = {
      Schedule: this.bemInfoData.Schedule
    };
    this.service.serviceR('ent/maintenance/8401', ScheduleData, (res: any) => {
      if (res.ResultCode === 0) {
        this.scheItem = Array.from(res.Result.MaintenanceScheItems);
      }
    });
    const MTData = {
      State: 0
    };
    this.service.serviceR('ent/maintenance/8101', MTData, (res: any) => {
      if (res.ResultCode === 0) {
        this.MaintenanceTemplates = res.Result.MaintenanceTemplates;
      }
    });
    this.service.serviceR('ent/buildspace/monitor/5301', MTData, (res: any) => {
      if (res.ResultCode === 0) {
        this.Builds = res.Result.Builds;
      }
    });
    this.service.serviceR('ent/serviceprovider/8511', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.ServiceProviders = res.Result.ServiceProviders;
        if (this.ServiceProviders[0]) {
          this.SelectServiceProviders.setValue(this.ServiceProviders[0].Seq);
        }
      }
    });
  }

  goback() {
    this.router.navigate(['index/orderqraudit']);
  }

  getOrderTime(data: string) {
    this.OrderTime = data;
  }

  checkPrice(event: any) {
    this.BuildingSeq = event.Buildings;
    this.ServiceFee = event.visit;
  }

  openUserModelDialog(userType: number | string) {
    const data = {
      State: 0,
      BSeqs: this.BuildingSeq,
      UserType: userType,
      title: '工作人员选择'
    };
    for (const b of this.Builds) {
      if (this.BuildingSeq === b.Seq) {
        Reflect.set(data, 'subjection', b.Subjection);
      }
    }
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '1080px',
      data: { ...data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (userType === 1) {
          this.ChooseServiceName = `${result.LoginId} - ${result.Name} - ${result.UserTel}`;
          this.ServiceSeq = result.Seq;
        } else {
          this.ChooseWorkerName = `${result.LoginId} - ${result.Name} - ${result.UserTel}`;
          this.WorkerSeq = result.Seq;
        }
      } else {
        if (userType === 1) {
          this.ChooseServiceName = null;
          this.ServiceSeq = null;
        } else {
          this.ChooseWorkerName = null;
          this.WorkerSeq = null;
        }
      }
    });
  }

  changeCodeOpen() {
    this.NeedQrcode = this.NeedQrcode === 0 ? 1 : 0;
    console.log(this.NeedQrcode);
  }

  userSave() {
    if (this.isCheck === true) {
      this.snackBar.open('正在下单中，请勿重新操作', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    if (this.SelectServiceType.value === '0') {
      if (!this.WorkerSeq) {
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
      this.snackBar.open('请输入计划名称', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    const orderTime = this.OrderTime.split(' ')[0] + ' ' + this.SelectHH.value + ':' + this.SelectMM.value + ':00';
    const data: IEditList = {
      ArriveExpire: this.ArriveExpire,
      Charger: this.ServiceSeq,
      ScheItems: this.itemsComponent.Items,
      MSDesc: this.MSDesc,
      MSName: this.MSName,
      OrderExpire: this.OrderTimeOut,
      ServiceType: this.SelectServiceType.value,
      WorkExpire: this.WorkExpire,
      PriceVisit: this.ServiceFee,
      OrderTime: orderTime,
      Pics: [],
      NeedQrcode: this.NeedQrcode
    };
    if (this.SelectServiceType.value === '0') {
      Reflect.set(data, 'Workers', this.WorkerSeq);
    } else if (this.SelectServiceType === '1') {
      Reflect.set(data, 'SrvProvider', this.SelectServiceProviders.value);
    }
    if (this.SelectServiceType.value === '1' || this.SelectServiceType.value === '2') {
      Reflect.set(data, 'Prices', this.priceComponent.Items);
    }
    if (this.MOSeq) {
      Reflect.set(data, 'PrevOrderSeq', this.MOSeq);
    }
    this.isCheck = true;
    timer(3000).subscribe(() => {
      this.isCheck = false;
    });
    this.service.serviceR('ent/maintenance/8002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.isCheck = false;
        this.router.navigate(['index/orderqraudit'])
          .then(() => {
            if (res.Result.NotBalance) {
              this.snackBar.open('余额不足，请及时充值', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-warning'
              });
            } else {
              this.snackBar.open('派单成功', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-info'
              });
            }
          });
      }
    });
  }

  // 控制confim模态框
  showConfim() {
    this.setConfim = !this.setConfim;
  }

  orderDelectConfimResult(...data: boolean[]) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/maintenance/8011', { MOSeq: this.MOSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/orderqraudit']);
        }
      });
    }
  }
}
