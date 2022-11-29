import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  manyFileUseType: string;
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  setConfim: boolean;
  imgsrcData: object[] = [];
  userPower: boolean;
  PriceList: any;
  ScheduleType: string;
  Day: number[];
  SubcharList: any;
  ChooseServiceName: string = null;
  ServiceSeq: number = null;
  ChooseWorkerName: string = null;
  WorkerSeq: number = null;
  Zindex: any;
  SubList: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    route.data
      .subscribe(
        (res: any) => {
          this.ScheduleType = res.type;
          console.log(res);
        }
      );
    let crumbsName: string;
    if (this.ScheduleType === 'schedulepatrol') {
        crumbsName = '巡检计划';
        this.crumbsList = [
          { name: '运维中心', open: false },
          { name: '运维计划', open: false },
          { name: crumbsName, open: true, url: this.ScheduleType },
          { name: '查看', open: false }
        ];
    } else if (this.ScheduleType === 'schedulekeep') {
        crumbsName = '保养计划';
        this.crumbsList = [
          { name: '运维中心', open: false },
          { name: '运维计划', open: false },
          { name: crumbsName, open: true, url: this.ScheduleType },
          { name: '查看', open: false }
        ];
    } else if (this.ScheduleType === 'inspectionschedule') {
       crumbsName = '自动巡检计划';
       this.crumbsList = [
        { name: 'Aoit', open: false },
        { name: crumbsName, open: true, url: this.ScheduleType },
        { name: '查看', open: false }
      ];
  } else {
        crumbsName = '维修计划';
        this.crumbsList = [
          { name: '运维中心', open: false },
          { name: '运维计划', open: false },
          { name: crumbsName, open: true, url: this.ScheduleType },
          { name: '查看', open: false }
        ];
    }
    this.manyFileUseType = 'info';
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    console.log(this.bemInfoData);
    this.userPower = false;
    this.setConfim = false;
    this.Zindex = this.bemInfoData.Zindex;

    if (this.bemInfoData.Day) {
      this.Day = this.bemInfoData.Day.split(',');
    } else {
      this.Day = [8];
    }
  }

  ngOnInit() {
    if (this.userInfo.Customer.Seq === this.bemInfoData.Customer) {
      this.userPower = true;
    } else {
      this.userPower = false;
    }
    const data = {
      Schedule: this.bemInfoData.MSSeq,
    };
    this.service.serviceR('ent/maintenance/8701', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.PriceList = res.Result.SchedulePrices;
      }
    });
    this.ServiceSeq = this.bemInfoData.Charger;
    this.WorkerSeq = this.bemInfoData.Workers;

    const da = {
      State: 0
    };
    this.service.serviceR('ent/cususer/4101', da, (res: any) => {
      if (res.ResultCode === 0 && res.Result.Users.length > 0) {
        console.log(res);
        res.Result.Users.map((item: any) => {
          if (this.ServiceSeq === item.Seq) {
            this.ChooseServiceName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
          }
          if (Number(this.WorkerSeq) === item.Seq) {
            this.ChooseWorkerName = `${item.LoginId} - ${item.Name} - ${item.UserTel}`;
          }
          console.log(this.ChooseWorkerName);
        });
      }
    });
    this.searchImgList();
    if (this.bemInfoData.SubChargers) {

    this.seachchar();
    }
    if (this.bemInfoData.WorkTeamId) {
      this.seachRule();
    }
  }
  seachchar() {
    const cart = this.bemInfoData.SubChargers.split(',');
    const da = {
      Users: this.bemInfoData.SubChargers,
    };
    this.service.serviceR('ent/cususer/4611', da, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res.Result.Users);
        this.SubList = res.Result.Users;
      }
    });
  }
  seachRule() {
    const da = {
      Id: this.bemInfoData.WorkTeamId,
      TeamTime: this.bemInfoData.TeamTime,
      Time: this.bemInfoData.Time
    };
    this.service.serviceR('workteam/14011', da, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res.Result.List[0]);
        this.SubcharList = res.Result.List[0];
      }
    });
  }
  searchImgList() {
    const data = {
      MSSeq: this.bemInfoData.MSSeq,
      FromCache: false
    };
    this.service.serviceR('ent/maintenance/8305', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'ScheduleImages';
        this.imgsrcData = res.Result[key];
      }
    });
  }

  goback() {
    this.router.navigate(['index/' + this.ScheduleType]);
  }

  gotoEdit() {
    this.router.navigate(['index/' + this.ScheduleType + '/edit']);
  }

  showConfim() {
    this.setConfim = !this.setConfim;
  }

  // confim组件返回值 true 确定 / false 取消
  infoConfimResult(...data: any) {
    this.setConfim = false;
    const confimResultState = data[0];
    if (confimResultState === true) {
      this.service.serviceR('ent/maintenance/8304', { MSSeq: this.bemInfoData.MSSeq }, (res: any) => {
        if (res.ResultCode === 0) {
          this.snackBar.open('删除成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/' + this.ScheduleType]);
        }
      });
    }
  }
}
