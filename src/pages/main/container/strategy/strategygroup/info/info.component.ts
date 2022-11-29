import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { LookStrategyDialogComponent } from '../../../component/dialog/look-strategy-dialog/look-strategy-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  crumbsList = [
    { name: '智慧运维', open: false, url: '' },
    { name: '运维策略', open: false, url: '' },
    { name: '查看', open: false, url: '' },
  ];
  columns = ['serialNumber', 'date', 'operate'];
  data: any;

  strategyList: any = [];

  imgsrcData: any[] = [];
  docListData: any[] = [];

  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.data = JSON.parse(localStorage.getItem('bemInfoData'));
    this.getStrategyList();
    this.getDocImg();
  }

  ngOnInit() {
  }

  getDocImg() {
    this.service.serviceR('ent/strategy/group/18006', {SGSeq: this.data.Seq}, (res: any) => {
      if (res.ResultCode === 0) {
        const imgsrcData = [];
        const docListData = [];
        res.Result.List.forEach(item => {
            if (item.ImgExt.toLowerCase() === 'png' || item.ImgExt.toLowerCase() === 'jpg' || item.ImgExt.toLowerCase() === 'gif') {
              imgsrcData.push(item);
            } else {
              Reflect.set(item, 'DocDesc', Reflect.get(item, 'ImgDesc'));
              Reflect.set(item, 'DocUrl', Reflect.get(item, 'ImgUrl'));
              docListData.push(item);
            }
        });
        this.imgsrcData = imgsrcData;
        this.docListData = docListData;
      }
    });
  }

  getStrategyList() {
    this.service.serviceR('ent/strategy/group/18005', {SGSeq: this.data.Seq}, (res: any) => {
      if (res.ResultCode === 0) {
        this.strategyList = res.Result.List;
        this.strategyList.forEach(item => {
          this.getListGroup(item);
        });
      }
    });
  }

  getListGroup(item) {
    const data = {
        SSeq: item.Seq,
    };

    this.service.serviceR('ent/strategy/17005', data, (res: any) => {
      if (res.ResultCode === 0) {
          item.group = res.Result.List;
      }
    });
  }

  // 查看策略
  lookStrategy(index) {
    console.log(this.strategyList[index]);

    const dialogRef = this.dialog.open(LookStrategyDialogComponent, {
      width: '1080px',
      data: this.strategyList[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {}
    });
  }

}
