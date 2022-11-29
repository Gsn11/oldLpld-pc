import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';
import { PriceComponent } from '../../../component/price/price.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAddList } from './iAdd.interface';
import { Service } from '../../../../../../service/service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';
import { UserManyDialogComponent } from '../../../../component/dialog/userMany-dialog/userMany-dialog.component';

import { ServiceType, ServiceInside } from '../../../component/json/order.json';
import { timer } from 'rxjs';
import buildData from '../../../../../../../environments/buildType';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  buildData: any;
  userInfo: any;
  crumbsList: object;
  imgsrc: string;
  imgsrcData: object[] = [];
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  ScheduleSetup: any;
  MSName: string = null; // 计划名称
  MSDesc: string = null; // 计划描述
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
  @ViewChild(PriceComponent, null) priceComponent: PriceComponent;
  isCheck: boolean;
  BuildingSeq: number = null;
  IsReOrder: string;
  priceList: any = null;
  scheItem: any;
  bemReOrder: any = null;
  BeginTime: any;
  ChooseWorkerName: string = null;
  WorkerSeq: any | string = null;
  ChooseServiceName: string = null;
  ServiceSeq: any = null;
  NeedQrcode: number;
  SubList: any;
  SubChargers: any;
  msgPerson = [];
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: Service,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.buildData = buildData;
    route.params
      .subscribe(
        (params: any) => {
          this.IsReOrder = params.type;
        }
      );
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.imgsrc = '';
    const Isentver = this.userInfo.Isentver;
    if (!Isentver) {
      this.ServiceType = ServiceType;
      this.SelectServiceType = new FormControl({
        value: '2',
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
      { name: '维修派单', open: true, url: 'orderfix' },
      { name: '添加', open: false }
    ];
    this.SelectServiceProviders = new FormControl('');
    this.ServiceFee = 0;
    this.isCheck = false;
    this.scheItem = [];
    this.NeedQrcode = 1;
  }

  ngOnInit() {
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
    if (this.IsReOrder === 'Re') {
      const bemData = JSON.parse(localStorage.getItem('BemReOrderList'));
      this.scheItem = JSON.parse(localStorage.getItem('BemReOrderScheItem'));
      this.priceList = JSON.parse(localStorage.getItem('BemReOrderPriceItem'));
      this.MSName = bemData.MSName;
      this.MSDesc = bemData.MSDesc;
      this.SelectServiceType.setValue(bemData.ServiceType.toString());
      this.ServiceFee = bemData.PriceVisit;
      this.bemReOrder = bemData.MOSeq;
      this.ServiceSeq = bemData.Charger;
      this.WorkerSeq = bemData.Workers;
      this.service.serviceR('ent/cususer/4101', data, (res: any) => {
        if (res.ResultCode === 0 && res.Result.Users.length > 0) {
          res.Result.Users.map((item: any) => {
            if (this.ServiceSeq === item.Seq) {
              this.ChooseServiceName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
            }
            if (Number(this.WorkerSeq) === item.Seq) {
              this.ChooseWorkerName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
            }
          });
        }
      });
    } else {
      this.scheItem = [];
    }
  }

  goback() {
    history.back();
  }

  getBeginTime(data: string) {
    this.BeginTime = data;
  }

  changeCodeOpen() {
    this.NeedQrcode = this.NeedQrcode === 0 ? 1 : 0;
    console.log(this.NeedQrcode);
  }

  checkPrice(event: any) {
    this.BuildingSeq = event.Buildings;
    this.ServiceFee = event.visit;
  }

  openUserModelDialog(userType: number | string) {
    if ( userType === 2 ) {
      const data = {
        State: 0,
        BSeqs: this.BuildingSeq,
        UserType: userType,
        title: '选择次级负责人'
      };
      for (const b of this.Builds) {
        if (this.BuildingSeq === b.Seq) {
          Reflect.set(data, 'subjection', b.Subjection);
        }
      }
      const dialogRef = this.dialog.open(UserManyDialogComponent, {
        width: '1080px',
        data: { ...data }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result[0].selected);
          if (userType === 2) {
            this.SubList = result[0].selected;
          } else {
            this.SubList = result[0].selected;
          }
        } else {
          if (userType === 2) {
            this.ChooseServiceName = null;
            this.ServiceSeq = null;
          } else {
            this.ChooseWorkerName = null;
            this.WorkerSeq = null;
          }
        }
      });
    } else {
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
      data: { ...data, multiple: userType === 1 ? true : false  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (userType === 1) {
          // this.ChooseServiceName += `${item.LoginId} - ${item.Name} - ${item.UserTel}，`;
          this.ChooseServiceName = '';
          this.ServiceSeq = '';
        }  else {
          // this.ChooseWorkerName += `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
          this.ChooseWorkerName = '';
          this.WorkerSeq = '';
        }

        result.forEach(item => {
          if (userType === 1) {
            // this.ChooseServiceName += `${item.LoginId} - ${item.Name} - ${item.UserTel}，`;
            this.ChooseServiceName += `${item.Name}，`;
            this.ServiceSeq += (item.Seq + ',');
          }  else {
            // this.ChooseWorkerName += `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
            this.ChooseWorkerName += `${item.Name}，`;
            this.WorkerSeq += (item.Seq + ',');
          }
        });
        if (userType === 1) {
          this.ChooseServiceName = this.ChooseServiceName.substr(0, this.ChooseServiceName.length - 1);
          this.ServiceSeq = this.ServiceSeq.substr(0, this.ServiceSeq.length - 1);
        } else {
          this.ChooseWorkerName = this.ChooseWorkerName.substr(0, this.ChooseWorkerName.length - 1);
          this.WorkerSeq = this.WorkerSeq.substr(0, this.WorkerSeq.length - 1);
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
  }

  // 消息推送人员
  openMsgDialog() {
    const dialogRef = this.dialog.open(UserManyDialogComponent, {
        width: '1080px',
        data: {
          State: 0,
          title: '收件人'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
           this.msgPerson = result[0].selected;
        }
    });
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
    if (!this.ServiceSeq) {
      this.snackBar.open('请先选择审核负责人', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return;
    }
    const data: IAddList = {
      ArriveExpire: this.ArriveExpire,
      Charger: this.ServiceSeq,
      ScheItems: this.scheItem,
      // ScheItems: this.itemsComponent.items,
      MSDesc: this.MSDesc,
      MSName: this.MSName,
      OrderExpire: this.OrderTimeOut,
      Pics: this.manyFile.setImgsrcData,
      ServiceType: this.SelectServiceType.value,
      WorkExpire: this.WorkExpire,
      // Type: 2,,
      NeedQrcode: this.NeedQrcode
    };


    if (this.msgPerson && this.msgPerson.length > 0) {
      let notifyUsers = '';

      this.msgPerson.forEach(item => {
        notifyUsers += (item.Seq + ',');
      });

      notifyUsers = notifyUsers.substr(0, notifyUsers.length - 1);

      data.NotifyUsers = notifyUsers;
    }

    if (this.bemReOrder) {
      Reflect.set(data, 'PrevOrderSeq', this.bemReOrder);
    }
    if (this.SelectServiceType.value === '1' || this.SelectServiceType.value === '2') {
      Reflect.set(data, 'Prices', this.priceComponent.Items);
    }
    if (this.SubList) {
      let SubChargers = '';
      for ( const i of this.SubList) {
        SubChargers += i.Seq + ',';
      }
      if (SubChargers.length > 0) {
        SubChargers = SubChargers.substr(0, SubChargers.length - 1);
             }
      this.SubChargers = SubChargers;
      Reflect.set(data, 'SubChargers', this.SubChargers);
    }
    this.isCheck = true;
    timer(3000).subscribe(() => {
      this.isCheck = false;
    });
    if (this.scheItem.length > 0) {
      if (data.ScheItems[0].Device === '') {
        // tslint:disable-next-line:no-unused-expression
        data.ScheItems[0].Device = 0;
      }
    }
    console.log(data);
    if (this.SelectServiceType.value === '0') {
      Reflect.set(data, 'PriceVisit', 0);
      Reflect.set(data, 'Workers', this.WorkerSeq);
      this.service.serviceR('ent/maintenance/inside/8102', data, (res: any) => {
        if (res.ResultCode === 0) {
          this.isCheck = false;
          this.router.navigate(['index/orderfix'])
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
    } else {
      Reflect.set(data, 'PriceVisit', this.ServiceFee);
      if (this.SelectServiceType === '1') {
        Reflect.set(data, 'SrvProvider', this.SelectServiceProviders.value);
      }
      this.service.serviceR('ent/maintenance/8002', data, (res: any) => {
        if (res.ResultCode === 0) {
          this.isCheck = false;
          this.router.navigate(['index/orderfix'])
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
  }
}
