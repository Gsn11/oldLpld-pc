import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SingleFileComponent } from '../../../component/fileUpload/singleFile/singleFile.component';
import { EditRegionComponent } from '../../../component/editRegion/editRegion.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { MapComponent } from '../../../component/map/map.component';
import { ProductComponent } from '../component/product/product.component';
import { IAddList } from './iAdd.interface';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  map: any;
  userInfo: any;
  crumbsList: object;
  imgsrc: string;
  imgsrcData: object[] = [];
  customerName: string;
  facturerName: string;
  fLocalName: string;
  fAddress: string;
  fSite: string;
  fCreditCode: string;
  fLegalPerson: string;
  fRegcapital: number;
  fBusiness: string;
  fHotline: string;
  fOfficeTel: string;
  fFax: string;
  fWechat: string;
  fService: string;
  fDesc: string;
  fProvince: string;
  fCity: string;
  fDistrict: string;
  fCreateDate: string;
  fProduct: string;
  fGdLng: number;
  fGdLat: number;
  @ViewChild(SingleFileComponent, null) singleFile: SingleFileComponent;
  @ViewChild(EditRegionComponent, null) regionList: EditRegionComponent;
  @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  @ViewChild(MapComponent, null) mapList: MapComponent;
  @ViewChild(ProductComponent, null) productList: ProductComponent;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: Service
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.imgsrc = '';
    this.customerName = this.userInfo.Customer.Name ? this.userInfo.Customer.Name : '平台系统';
    this.facturerName = '';
    this.fLocalName = '';
    this.fAddress = '';
    this.fSite = '';
    this.fCreditCode = '';
    this.fLegalPerson = '';
    this.fRegcapital = 0;
    this.fBusiness = '';
    this.fHotline = '';
    this.fOfficeTel = '';
    this.fFax = '';
    this.fWechat = '';
    this.fService = '';
    this.fDesc = '';
    this.fProduct = null;
    // this.fGdLng = 116.397428;
    // this.fGdLat = 39.90923;
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '厂商管理', open: true, url: 'facturer' },
      { name: '添加', open: false, url: '' }
    ];
  }

  goback() {
    history.back();
  }

  userSave() {
    if (this.facturerName === '') {
      this.snackBar.open('请输入厂商名称', '确认', {
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
    let productAddList = '';
    if (this.productList.setProductList !== null) {
      const lastStr = this.productList.setProductList.substr(
        this.productList.setProductList.length - 1,
        this.productList.setProductList.length
      );
      if (lastStr === ',') {
        productAddList = this.productList.setProductList.substr(0, this.productList.setProductList.length - 1);
      }
    } else {
      productAddList = null;
    }
    const data: IAddList = {
      FSeq: this.userInfo.Customer.Seq,
      Creator: 1,
      FName: this.facturerName,
      FLocalName: this.fLocalName,
      Addr: this.fAddress,
      Site: this.fSite,
      CreditCode: this.fCreditCode,
      LegalPerson: this.fLegalPerson,
      Regcapital: this.fRegcapital,
      Business: this.fBusiness,
      Hotline: this.fHotline,
      Officetel: this.fOfficeTel,
      Fax: this.fFax,
      Wechat: this.fWechat,
      Service: this.fService,
      Desc: this.fDesc,
      FImg: this.singleFile.setImgsrc,
      Pics: this.manyFile.setImgsrcData,
      Province: this.regionList.provinceCode,
      City: this.regionList.cityCode,
      District: this.regionList.districtCode,
      Country: 'CN',
      GdLat: this.fGdLat,
      GdLng: this.fGdLng,
      Product: productAddList,
      CreateDate: this.calendar.selectDate
    };
    this.service.serviceR('ent/params/facturer/10602', data, (res: any) => {
      // console.log(res);
      this.snackBar.open('添加成功', '确认', {
        duration: 1600,
        verticalPosition: 'top',
        panelClass: 'snack-bar-color-info'
      });
      this.router.navigate(['index/facturer']);
    });
  }
}
