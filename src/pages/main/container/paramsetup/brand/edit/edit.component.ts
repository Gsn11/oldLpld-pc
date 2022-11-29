import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingleFileComponent } from '../../../component/fileUpload/singleFile/singleFile.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IEditList } from './iEdit.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { FacturerDialogComponent } from '../../../component/dialog/facturer-dialog/facturer-dialog.component';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  BRName: string; // 品牌名称
  BRFacturer?: string; // 品牌所属厂商
  BRLocalName: string; // 品牌英文名称
  Proposer: string; // 申请人
  ProposerAddr: string; //  申请人地址
  RegisterZone: string;  // 注册地
  RegisterType: string; // 注册类型
  RegisterCode: string; // 注册号
  RegisterDate: string; // 申请日期
  ExpireDate: string; // 失效日期
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  BRImg: string; // 品牌图标文件（multipart）
  OldBRImg: string;
  Pics: object[]; // 品牌其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
  OldPics: object[] = [];
  @ViewChild(SingleFileComponent, null) singleFile: SingleFileComponent;
  @ViewChild('dateStart', null) dateStart: CalendarComponent;
  @ViewChild('dateEnd', null) dateEnd: CalendarComponent;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  Facturers: any;
  facturersName: string;
  buildData: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.BRName = this.bemInfoData.BRName;
    this.BRLocalName = this.bemInfoData.BRLocalName ? this.bemInfoData.BRLocalName : '';
    this.Proposer = this.bemInfoData.Proposer ? this.bemInfoData.Proposer : '';
    this.ProposerAddr = this.bemInfoData.ProposerAddr ? this.bemInfoData.ProposerAddr : '';
    this.RegisterZone = this.bemInfoData.RegisterZone ? this.bemInfoData.RegisterZone : '';
    this.RegisterType = this.bemInfoData.RegisterType ? this.bemInfoData.RegisterType : '';
    this.RegisterCode = this.bemInfoData.RegisterCode ? this.bemInfoData.RegisterCode : '';
    this.RegisterDate = this.bemInfoData.RegisterDate ? this.bemInfoData.RegisterDate : '';
    this.ExpireDate = this.bemInfoData.ExpireDate ? this.bemInfoData.ExpireDate : '';
    this.BRImg = this.bemInfoData.Img;
    this.crumbsList = [
      { name: '用户权限', open: false, url: '' },
      { name: '用户设置', open: true, url: 'usermgmt' },
      { name: '修改', open: false, url: '' }
    ];
    this.Facturers = {
      FSeq: this.bemInfoData.BRFacturer
    };
    this.facturersName = `${this.bemInfoData.FName ? this.bemInfoData.FName : '请点击选择厂商'}`;

    this.buildData = buildData;
  }

  ngOnInit() {
    this.searchImgList();
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

  searchImgList() {
    const data = {
      BRSeq: this.bemInfoData.BRSeq,
      FromCache: false
    };
    this.service.serviceR('ent/params/brand/10005', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'BrandImages';
        this.Pics = res.Result[key];
        console.log(res);
        this.OldPics = this.OldPics.concat(res.Result[key]);
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
        panelClass: 'snack-bar-color-warning'
      });
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IEditList = {
      BRSeq: this.bemInfoData.BRSeq,
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
      OldPics: this.OldPics,
      BRImg: this.singleFile.setImgsrc,
      OldBRImg: this.bemInfoData.Img
    };
    if (this.Facturers) {
      Reflect.set(data, 'BRFacturer', this.Facturers.FSeq);
    }
    this.service.serviceR('ent/params/brand/10003', data, (res: any) => {
      this.snackBar.open('修改成功', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-info'
      });
      this.router.navigate(['index/brand']);
    });
  }
}
