import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SingleFileComponent } from '../../../component/fileUpload/singleFile/singleFile.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { FacturerDialogComponent } from '../../../component/dialog/facturer-dialog/facturer-dialog.component';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  userInfo: any;
  crumbsList: object;
  imgsrc: string;
  imgsrcData: object[] = [];
  BRName: string;
  BRLocalName: string;
  Proposer: string;
  ProposerAddr: string;
  RegisterZone: string;
  RegisterType: string;
  RegisterCode: string;
  RegisterDate: string;
  ExpireDate: string;
  @ViewChild(SingleFileComponent, null) singleFile: SingleFileComponent;
  @ViewChild('dateStart', null) dateStart: CalendarComponent;
  @ViewChild('dateEnd', null) dateEnd: CalendarComponent;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  customer: number;
  Facturers: any;
  facturersName: string;
  buildData: any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: Service
  ) {
    this.imgsrc = '';
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '品牌管理', open: true, url: 'brand' },
      { name: '新增', open: false, url: '' }
    ];
    this.BRName = null;
    this.BRLocalName = null;
    this.Proposer = null;
    this.ProposerAddr = null;
    this.RegisterZone = null;
    this.RegisterType = null;
    this.RegisterCode = null;
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.Facturers = null;
    this.facturersName = '请点击选择厂商';

    this.buildData = buildData;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FacturerDialogComponent, {
      width: '1080px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Facturers = result;
        this.facturersName = `${result.FName}`;
      } else {
        this.Facturers = null;
        this.facturersName = '请点击选择厂商';
      }
    });
  }

  goback() {
    this.router.navigate(['index/brand']);
  }

  userSave() {
    if (this.BRName === '') {
      this.snackBar.open('请输入品牌名称', '确认', {
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
      BRName: this.BRName,
      BRLocalName: this.BRLocalName,
      Proposer: this.Proposer,
      ProposerAddr: this.ProposerAddr,
      RegisterZone: this.RegisterZone,
      RegisterType: this.RegisterType,
      RegisterCode: this.RegisterCode,
      RegisterDate: this.dateStart.selectDate,
      ExpireDate: this.dateEnd.selectDate,
      Pics: this.manyFile.setImgsrcData,
      BRImg: this.singleFile.setImgsrc
    };
    if (this.Facturers) {
      Reflect.set(data, 'BRFacturer', this.Facturers.FSeq);
    }
    this.service.serviceR('ent/params/brand/10002', data, (res: any) => {
      this.snackBar.open('添加成功', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-info'
      });
      this.router.navigate(['index/brand']);
    });
  }
}
