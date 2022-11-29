import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SingleFileComponent } from '../../../component/fileUpload/singleFile/singleFile.component';
import { EditRegionComponent } from '../../../component/editRegion/editRegion.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { MapComponent } from '../../../component/map/map.component';
import { ProductComponent } from '../component/product/product.component';
import { IEditList } from './iEdit.interface';
import { Service } from '../../../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userInfo: any;
  bemInfoData: any;
  crumbsList: object;
  imgsrc: string;
  imgsrcData: object[] = [];
  oldImgsrcData: object[] = [];
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
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.imgsrc = this.bemInfoData.Img;
    this.customerName = this.bemInfoData.CustomerName ? this.bemInfoData.CustomerName : '平台系统';
    this.facturerName = this.bemInfoData.FName;
    this.fLocalName = this.bemInfoData.FLocalName ? this.bemInfoData.FLocalName : '';
    this.fProvince = this.bemInfoData.Province;
    this.fCity = this.bemInfoData.City;
    this.fDistrict = this.bemInfoData.District;
    this.fCreateDate = this.bemInfoData.CreateDate;
    this.fAddress = this.bemInfoData.Addr ? this.bemInfoData.Addr : '';
    this.fSite = this.bemInfoData.Site;
    this.fCreditCode = this.bemInfoData.CreditCode ? this.bemInfoData.CreditCode : '';
    this.fLegalPerson = this.bemInfoData.LegalPerson ? this.bemInfoData.LegalPerson : '';
    this.fRegcapital = this.bemInfoData.Regcapital ? this.bemInfoData.Regcapital : 0;
    this.fBusiness = this.bemInfoData.Business;
    this.fHotline = this.bemInfoData.Hotline;
    this.fOfficeTel = this.bemInfoData.OfficeTel;
    this.fFax = this.bemInfoData.Fax;
    this.fWechat = this.bemInfoData.Wechat;
    this.fService = this.bemInfoData.Service;
    this.fDesc = this.bemInfoData.FDesc ? this.bemInfoData.FDesc : '';
    this.fGdLng = this.bemInfoData.GdLng ? this.bemInfoData.GdLng : '';
    this.fGdLat = this.bemInfoData.GdLat ? this.bemInfoData.GdLat : '';
    this.fProduct = this.bemInfoData.Product ? this.bemInfoData.Product : '';
    this.crumbsList = [
      { name: '参数设置', open: false, url: '' },
      { name: '厂商管理', open: true, url: 'facturer' },
      { name: '修改', open: false, url: '' }
    ];
  }

  ngOnInit() {
    this.searchImgList();
  }

  searchImgList() {
    const data = {
      FSeq: this.bemInfoData.FSeq,
      FromCache: false
    };
    this.service.serviceR('ent/params/facturer/10605', data, (res: any) => {
      if (res.ResultCode === 0) {
        const key = 'FacturerImages';
        this.imgsrcData = res.Result[key];
        this.oldImgsrcData = Array.from(res.Result[key]);
      }
    });
  }

  goback() {
    this.router.navigate(['index/facturer']);
  }

  userSave() {
    if (this.facturerName === '') {
      this.snackBar.open('请输入厂商名称', '确认', {
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
    const productAddList = this.productList.setProductList.substr(0, this.productList.setProductList.length - 1);
    const data: IEditList = {
      FSeq: this.bemInfoData.FSeq,
      Creator: 1,
      FName: this.facturerName,
      FLocalName: this.fLocalName,
      Country: 'CN',
      Addr: this.fAddress,
      Site: this.fSite,
      GdLat: this.fGdLat,
      GdLng: this.fGdLng,
      LegalPerson: this.fLegalPerson,
      Regcapital: this.fRegcapital,
      CreditCode: this.fCreditCode,
      Business: this.fBusiness,
      Hotline: this.fHotline,
      Fax: this.fFax,
      Officetel: this.fOfficeTel,
      Service: this.fService,
      Wechat: this.fWechat,
      Desc: this.fDesc,
      Product: productAddList,
      FImg: this.singleFile.setImgsrc,
      OldFImg: this.bemInfoData.Img,
      Pics: this.manyFile.setImgsrcData,
      OldPics: this.oldImgsrcData,
      Province: this.regionList.provinceCode,
      City: this.regionList.cityCode,
      District: this.regionList.districtCode,
      CreateDate: this.calendar.selectDate
    };
    this.service.serviceR('ent/params/facturer/10603', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('操作成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/facturer']);
      }
    });
  }
}
