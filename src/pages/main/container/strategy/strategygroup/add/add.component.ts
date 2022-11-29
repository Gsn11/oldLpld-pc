import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { SelectStrategyDialogComponent } from '../../../component/dialog/select-strategy-dialog/select-strategy-dialog.component';
import { LookStrategyDialogComponent } from '../../../component/dialog/look-strategy-dialog/look-strategy-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  crumbsList = [
    { name: '智慧运维', open: false, url: '' },
    { name: '运维策略', open: false, url: '' },
    { name: '添加', open: false, url: '' },
  ];

  columns = ['serialNumber', 'date', 'operate'];
  imgsrcData = [];
  docListData = [];

  list: any = [];

  remark: any;

  name: any;

  BeginDate: any;
  EndDate: any;
  BeginTime: any;
  EndTime: any;

  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
  }

  // 选择策略
  selectStrategy() {
    const dialogRef = this.dialog.open(SelectStrategyDialogComponent, {
      width: '1080px',
      data: { ...{} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list = result;
      }
    });
  }

  // 查看策略
  lookStrategy(index) {
    const dialogRef = this.dialog.open(LookStrategyDialogComponent, {
      width: '1080px',
      data: this.list[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {}
    });
  }

  // 删除选择的策略
  del(index) {
    this.list.splice(index, 1);
    const list = [];
    this.list.forEach(item => {
      list.push(item);
    });
    this.list = list;
  }

  // 选择开始日期
  getBeginTime(e) {
    this.BeginDate = e;
  }

  // 选择开始时间
  getScheduleFirstTime(e) {
    this.BeginTime = e;
  }

  // 选择结束日期
  getEndTime(e) {
    this.EndDate = e;
  }

  // 选择结束时间
  getScheduleEndTime(e) {
    this.EndTime = e;
  }

  add() {
    if (!this.name) {
      this.snackBar.open('请输入运维名称', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    if (!this.BeginDate || !this.BeginTime) {
      this.snackBar.open('请选择开始时间', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    if (!this.EndDate || !this.EndTime) {
      this.snackBar.open('请选择结束时间', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    if (!this.list || this.list.length === 0) {
      this.snackBar.open('请选择策略内容', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-danger'
      });
      return false;
    }


    const data = {
      Name: this.name,
      BeginTime: this.BeginDate + ' ' + this.BeginTime,
      EndTime: this.EndDate + ' ' + this.EndTime,
      Items: [],
      Remark: this.remark,
      Pics: []
    };

    if (this.imgsrcData) {
      this.imgsrcData.forEach(item => {
        data.Pics.push({
          ImgUrl: item.ImgUrl,
          ImgDesc: item.Desc
        });
      });
    }

    if (this.docListData) {
      this.docListData.forEach(item => {
        data.Pics.push({
          ImgUrl: item.DocUrl,
          ImgDesc: item.DocDesc
        });
      });
    }

    this.list.forEach(item => {
      data.Items.push({
        Strategy: item.Seq
      });
    });

    // console.log(data);
    // return false;

    this.service.serviceR('ent/strategy/group/18002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
        });
        window.history.back();
      }
    });
  }
}
