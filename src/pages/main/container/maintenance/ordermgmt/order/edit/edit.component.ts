import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsComponent } from '../../../component/items/items.component';
import { PriceComponent } from '../../../component/price/price.component';
import { MatSnackBar } from '@angular/material';
import { IEditList } from './iEdit.interface';
import { Service } from '../../../../../../service/service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  ScheduleSetup: any;
  @ViewChild(ItemsComponent, null) itemsComponent: ItemsComponent;
  @ViewChild(PriceComponent, null) priceComponent: PriceComponent;
  PriceList: any;
  OrderType: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    route.data
      .subscribe(
        (res: any) => {
          this.OrderType = res.type;
        }
      );
    let crumbsName: string;
    if (this.OrderType === 'orderfix') {
        crumbsName = '维修派单';
    } else if (this.OrderType === 'orderschedulechk') {
        crumbsName = '巡查派单';
    } else {
        crumbsName = '保养派单';
    }
    this.crumbsList = [
      { name: '运维中心', open: false },
      { name: '派单管理', open: false },
      { name: crumbsName, open: true, url: this.OrderType },
      { name: '修改', open: false }
    ];
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
  }

  ngOnInit() {
    const data = {
      OrderSeq: this.bemInfoData.MOSeq,
    };
    this.service.serviceR('ent/maintenance/8801', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.PriceList = res.Result.OrderPrices;
        this.PriceList.map((item: any) => {
          Reflect.set(item, 'Price', item.PricePayee);
        });
      }
    });
  }

  goback() {
    this.router.navigate(['index/' + this.OrderType]);
  }

  userSave() {
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IEditList = {
      MOSeq: this.bemInfoData.MOSeq,
      OrderSeq: this.bemInfoData.MOSeq,
      Prices: this.priceComponent.Items
    };
    this.service.serviceR('ent/maintenance/8003', data, (res: any) => {
      this.snackBar.open('修改成功', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-info'
      });
      this.router.navigate(['index/' + this.OrderType]);
    });
  }
}
