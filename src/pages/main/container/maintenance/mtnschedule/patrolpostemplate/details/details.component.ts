import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IDetailsList } from './iDetails.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../../service/service';
import { BuildspaceDialogComponent } from '../../../../component/dialog/buildspace-dialog/buildspace-dialog.component';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  @ViewChild(ModalComponent, null) modal: ModalComponent;
  MTName: string;
  BuildSpaces: any;
  SelectBuildSpaces: any;
  Items: object[];
  pageType: string;
  BuildingType: any;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: Service,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    route.data
      .subscribe(
        (res: any) => {
          this.pageType = res.type;
        }
      );
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    let pageName: string;
    if (this.pageType === 'edit') {
      this.MTName = this.bemInfoData.MTName;
      pageName = '修改';
      if (this.bemInfoData) {
        this.Items = this.bemInfoData.Items;
      }
    } else {
      this.MTName = '';
      pageName = '添加';
    }
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '运维计划', open: false },
      { name: '巡检模板', open: true, url: 'patrolpostemplate' },
      { name: pageName, open: false }
    ];
    this.BuildSpaces = null;
    this.SelectBuildSpaces = new FormControl();
    this.Items = [];
    if (this.pageType === 'edit') {
      this.Items = this.bemInfoData.Items;
    } else {
      this.Items = [];
    }
    this.BuildingType = null;
  }

  openBuildDialog(): void {
    const dialogRef = this.dialog.open(BuildspaceDialogComponent, {
      width: '1080px',
      data: { type: this.BuildingType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result[0].selected.map((item: any) => {
          Reflect.set(item, 'Space', item.BSSeq);
          Reflect.set(item, 'FeedbackType', result[1]);
          Reflect.set(item, 'Item', result[2]);
          Reflect.deleteProperty(item, 'BSSeq');
          Reflect.deleteProperty(item, 'CityPriceVisit');
          Reflect.deleteProperty(item, 'DistrictPriceVisit');
          Reflect.deleteProperty(item, 'ProvincePriceVisit');
          Reflect.deleteProperty(item, 'Subjection');
          Reflect.deleteProperty(item, 'SubjectionId');
          this.Items.push(item);
        });
      } else {
        // console.log('choose is nothing!');
      }
    });
  }

  goback() {
    this.router.navigate(['index/patrolpostemplate']);
  }

  addItem() {
    this.modal.switchModalBox('add');
  }

  editItem(index: number) {
    console.log(index);
    this.modal.switchModalBox('edit', index);
  }

  deleteItem(index: number) {
    this.Items.splice(index, 1);
  }

  userSave() {
    if (this.MTName === '' || this.MTName === null) {
      this.snackBar.open('请输入模版名称', '确认', {
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
    const data: IDetailsList = {
      Items: this.Items,
      MTName: this.MTName,
      State: '0',
    };
    let str = '添加成功';
    let link = 'ent/maintenance/template/8102';
    if (this.pageType === 'edit') {
      Reflect.set(data, 'MTSeq', this.bemInfoData.MTSeq);
      str = '操作成功';
      link = 'ent/maintenance/8103';
    }
    console.log(data);
    this.service.serviceR(link, data, (res: any) => {
      this.snackBar.open(str, '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-info'
      });
      this.router.navigate(['index/patrolpostemplate']);
    });
  }
}
