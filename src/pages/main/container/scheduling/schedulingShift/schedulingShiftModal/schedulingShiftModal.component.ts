import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { Service } from '../../../../../service/service';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
declare var laydate;
@Component({
  selector: 'app-schedulingshiftmodal',
  templateUrl: './schedulingShiftModal.component.html',
  styleUrls: ['./schedulingShiftModal.component.scss']
})
export class SchedulingShiftModalComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
  @Input() data: any;
  @Output() someEvent = new EventEmitter<string>();

  show: boolean;
  colors: any;
  ImgList: any;
  seletId: any;
  HH: number[];
  MM: number[];
  Name: any;
  AbbrName: any;
  Color: any;
  WorkStart: any;
  WorkEnd: any;
  allTime: any;
  Starts: any;
  Ends: any;
  workteamType:any;
  SelectServiceType: any;
  Seq: any;
  title: any;
  constructor(
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.show = false;
    this.SelectServiceType = new FormControl('');
  }
  ngOnInit() {
    this.title = 'add';
    this.intget(this.WorkStart, this.WorkEnd);
    this.colors = [
      { id: '1', color: '#BCE1AA' },
      { id: '2', color: '#FFDAA4' },
      { id: '3', color: '#7ECEF4' },
      { id: '4', color: '#FFB6BA' },
      { id: '5', color: '#84CCCA' },
      { id: '6', color: '#F29A76' },
      { id: '7', color: '#C4BAEB' },
      { id: '8', color: '#D0BEB0' },
      { id: '9', color: '#88ACDA' },
      { id: '10', color: '#DBE2EA' },
    ];
    this.workteamType = [
      { id: 0, name: '工作班次'},
      { id: 1, name: '休息班次'},
      { id: 2, name: '调休'},
      { id: 3, name: '年假'},
      { id: 4, name: '病假'},
      { id: 5, name: '事假'},
      { id: 6, name: '产假'},
      { id: 7, name: '哺乳假'},
      { id: 8, name: '流产假'},
      { id: 9, name: '婚假'},
      { id: 10, name: '丧假'},
      { id: 11, name: '护理假'},
      { id: 12, name: '工伤假'},
      { id: 13, name: '其它假'}
    ]
  }
  getDtail(e) {
    this.title = 'edit';
    this.show = true;
    console.log(e);
    this.Name = e.Name;
    this.AbbrName = e.AbbrName;
    this.Color = e.Color;
    this.getcolorId(e.Color);
    this.WorkStart = e.WorkStart;
    this.WorkEnd = e.WorkEnd;
    this.intget(e.WorkStart, e.WorkEnd);
    this.calculationTime();
    this.Seq = e.Seq;
    this.SelectServiceType.value = e.Type;
    console.log(this.SelectServiceType.value)

  }
  calculationTime() {
    const hour = this.WorkStart.split(':')[0];
    const min = this.WorkStart.split(':')[1];
    const sec = this.WorkStart.split(':')[2];
    this.Starts = Number(hour * 3600) + Number(min * 60) + Number(sec);
    const hour1 = this.WorkEnd.split(':')[0];
    const min1 = this.WorkEnd.split(':')[1];
    const sec1 = this.WorkEnd.split(':')[2];
    this.Ends = Number(hour1 * 3600) + Number(min1 * 60) + Number(sec1);
    this.allTime = this.Starts > this.Ends ? ((this.Starts - this.Ends)/ 3600).toFixed(1) : ((this.Ends - this.Starts)/ 3600).toFixed(1);
  }
  intget(startTime, endTime) {
    setTimeout(() => {
      laydate.render({
        elem: '#test1',
        type: 'time',
        trigger: 'click',
        value: startTime,
        done: (value) => {
          this.WorkStart = value;
          if (this.WorkEnd) {
            this.calculationTime();
          }
        }
      });
      laydate.render({
        elem: '#test2',
        type: 'time',
        trigger: 'click',
        value: endTime,
        done: (value) => {
          this.WorkEnd = value;
          if (this.WorkStart) {
            this.calculationTime();
          }
        }
      });
    });
  }
  getcolorId(e) {
    for (const d of this.colors) {
      if (d.color === e) {
        this.seletId = d.id;
      }
    }
  }
  selectColr(e) {
    console.log(e);
    this.seletId = e;
    for (const d of this.colors) {
      if (d.id === e) {
        this.Color = d.color;
      }
    }
  }
  submit() {
      if (this.Name === '' || this.Name === undefined) {
        this.snackBar.open('班次名称未填写', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.AbbrName === '' || this.AbbrName === undefined) {
        this.snackBar.open('简称未填写', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.AbbrName.length > 4) {
        this.snackBar.open('班次简称最多只能输入两位数', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.Color === '' || this.Color === undefined) {
        this.snackBar.open('未选择排次颜色', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.SelectServiceType.value === '' || this.SelectServiceType.value === undefined) {
        this.snackBar.open('未选择班次类型', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.WorkStart === '' || this.WorkStart === undefined) {
        this.snackBar.open('未选择开始时间', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else if (this.WorkEnd === '' || this.WorkEnd === undefined) {
        this.snackBar.open('未选择结束时间', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-success'
        });
      } else {
      if (this.title === 'add') {
        const da = {
          Name: this.Name,
          AbbrName: this.AbbrName,
          Color: this.Color,
          WorkStart: this.WorkStart,
          WorkEnd: this.WorkEnd,
          Type: this.SelectServiceType.value
        };
        console.log(da);
        this.service.serviceR('workteamTime/13002', da, (res: any) => {
          console.log(res);
          if (res.ResultCode === 0) {
            this.snackBar.open('添加成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
            });
            this.show = false;
            this.someEvent.next();

          }
        });
        console.log(da);
      // tslint:disable-next-line:no-conditional-assignment
      } else if ( this.title = 'edit') {
        const da = {
          Seq: this.Seq,
          Name: this.Name,
          AbbrName: this.AbbrName,
          Color: this.Color,
          WorkStart: this.WorkStart,
          WorkEnd: this.WorkEnd,
          Type: this.SelectServiceType.value ? this.SelectServiceType.value : '0'
        };
        console.log(da);
        this.service.serviceR('workteamTime/13003', da, (res: any) => {
          console.log(res);
          if (res.ResultCode === 0) {
            this.snackBar.open('修改成功', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
            });
            this.show = false;
            this.someEvent.next();
          }
        });
      }
      // tslint:disable-next-line:no-conditional-assignment
    }
  }
}
