import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EditRegionComponent } from '../../../component/editRegion/editRegion.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { MapComponent } from '../../../component/map/map.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  map: any;
  userInfo: any;
  crumbsList: object;
  stateList: object;
  imgsrc: string;
  imgsrcData: object[] = [];
  @ViewChild(EditRegionComponent, null) regionList: EditRegionComponent;
  @ViewChild(CalendarComponent, null) calendar: CalendarComponent;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  @ViewChild(MapComponent, null) mapList: MapComponent;
  BuildUsages: any;
  SelectBuildUsages: any;
  BuildGroups: any;
  SelectBuildGroups: any;
  Subjections: any;
  SelectSubjections: any;
  chooseTreeList: any;
  isTreeOpen: boolean;
  allSwitchIsOpen: boolean;
  selectName: string;
  selectCode: string;
  // 使用字段
  Addr: string; // 建筑物地址
  BDesc: string;  // 建筑物简介
  BType: number;
  BuildCompany: string; // 施工方
  BuildEnd: string; // 完工日期
  BuildingGroup: string; // ---
  BuildingTime: string; // 开工日期
  City: string; // 城市code
  ConstructCompany: string; // 建设方
  DesignCompany: string; // 设计方
  District: string; // 区域
  DownFloors: number; // 地下层数
  FloorArea: number; // 面积（平方米）
  GdLat: number; // 高德地图纬度
  GdLng: number; // 高德地图经度
  Hight: number; // 高度（米）
  InvestCapital: number; // 总投资（万元）
  Name: string; // 建筑物名称
  Pics: object; // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
  Province: string; // 省份
  Stat: string; // 状态
  Subjection: number; // 归属园群
  SuperVisor: string; // 监理方
  Tel: string; // 联系电话
  UpFloor: string; // 地上层数
  UsageCode: string; // 建筑类型
  WarrantyEnd: string; // 保修截止日期
  Scale: number;
  Isentver: boolean;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,

  ) {
    this.stateList = [
      { value: '正常', state: 0 },
      { value: '销毁', state: 1 },
    ];
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.imgsrc = '';
    this.BuildUsages = [];
    this.SelectBuildUsages = new FormControl('');
    this.BuildGroups = [];
    this.SelectBuildGroups = new FormControl('');
    this.Subjections = [];
    this.SelectSubjections = new FormControl('');
    this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
    let menu1: string;
    if (!this.Isentver) {
      menu1 = '建筑设施管理';
      this.selectName = '请选择建筑类型';
    } else {
      menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
      this.selectName = buildData.buildType === '联排联调' ? '请选择水工建筑类型' : '请选择建筑类型';
    }
    this.crumbsList = [
      { name: menu1, open: false, url: '' },
      { name: '设施管理', open: true, url: 'facilities' },
      { name: '添加', open: false, url: '' }
    ];
    this.isTreeOpen = false;
    this.allSwitchIsOpen = true;
    this.selectCode = null;
    this.GdLng = 116.397428;
    this.GdLat = 39.90923;
    this.Addr = ''; // 建筑物地址
    this.BDesc = '';  // 建筑物简介
    this.BType = 1;
    this.BuildCompany = '';
    this.BuildEnd = '';
    this.BuildingGroup = '';
    this.BuildingTime = '';
    this.City = '';
    this.ConstructCompany = '';
    this.DesignCompany = '';
    this.District = '';
    this.DownFloors = null;
    this.FloorArea = null;
    this.Hight = null;
    this.InvestCapital = null;
    this.Name = '';
    this.Pics = null;
    this.Province = '';
    this.Stat = '';
    this.Subjection = null;
    this.SuperVisor = '';
    this.Tel = '';
    this.UpFloor = '';
    this.UsageCode = '';
    this.WarrantyEnd = '';
    this.Scale = null;
  }

  ngOnInit() {
    const data = {
      FromCache: false,
      PageIndex: 1,
      PageSize: 10,
      State: 0
    };
    this.service.serviceR('ent/params/buildusage/10301', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.BuildUsages = this.create(res.Result.BuildUsages);
      }
    });
    this.service.serviceR('ent/buildgroup/5111', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.BuildGroups = res.Result.BuildGroups;
      }
    });
    this.service.serviceR('ent/subjection/3811', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.Subjections = res.Result.Subjections;
      }
    });
  }

  create(tree: any): any {
    const m = new Map();
    for (const item of tree) {
      Reflect.set(item, 'children', []);
      Reflect.set(item, 'switch', false);
      Reflect.set(item, 'isChoose', false);
      Reflect.set(item, 'useId', item.BUDesc);
      Reflect.set(item, 'display', true);
      m.set(item.BUCode + '', item);
    }
    const t = [];
    for (const d of tree) {
      const node = m.get(d.BUCode + '');
      if (d && !d.BUParent) {
        t.push(node);
      } else {
        const pnode = m.get(d.BUParent + '');
        if (!pnode) {
          continue;
        }
        pnode.children.push(node);
      }
    }
    return t;
  }

  treeChange(tree: any) {
    this.initailChooseData(this.BuildUsages);
    this.chooseTreeList = tree;
  }

  initailChooseData(list: any) {
    list.map((item: any) => {
      item.isChoose = false;
      if (item.children) {
        this.initailChooseData(item.children);
      }
    });
  }
  openTree() {
    this.isTreeOpen = !this.isTreeOpen;
  }
  closeTree() {
    this.isTreeOpen = false;
  }

  checkTreeChildren() {
    this.selectName = this.chooseTreeList.BUDesc;
    this.selectCode = this.chooseTreeList.BUCode;
    this.isTreeOpen = false;
  }
  goback() {
    this.router.navigate(['index/facilities']);
  }

  getBuildingTime(data: string) {
    this.BuildingTime = data;
  }

  getBuildEnd(data: string) {
    this.BuildEnd = data;
  }

  getWarrantyEnd(data: string) {
    this.WarrantyEnd = data;
  }

  userSave() {
    if (this.Name === '') {
      if (!this.Isentver) {
        this.snackBar.open('请输入建筑物名称', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
      } else {
        this.snackBar.open(buildData.buildType === '联排联调' ? '请选择水工建筑类型' : '请选择建筑类型', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
        });
      }
      return;
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IAddList = {
      Addr: this.Addr, // 建筑物地址
      BDesc: this.BDesc,  // 建筑物简介
      BType: 1, // 建筑类型流水号，逗号分割
      BuildCompany: this.BuildCompany, // 施工方
      BuildingGroup: this.SelectBuildGroups.value ? this.SelectBuildGroups.value : '', // ---
      City: this.regionList.cityCode, // 城市code
      ConstructCompany: this.ConstructCompany, // 建设方
      DesignCompany: this.DesignCompany, // 设计方
      District: this.regionList.districtCode, // 区域
      FloorArea: this.FloorArea, // 面积（平方米）
      GdLat: this.mapList.GdLat ? this.mapList.GdLat : this.GdLat, // 高德地图纬度
      GdLng: this.mapList.GdLng ? this.mapList.GdLng : this.GdLng, // 高德地图经度
      InvestCapital: this.InvestCapital, // 总投资（万元）
      Name: this.Name, // 建筑物名称
      Pics: this.manyFile.setImgsrcData, // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
      Province: this.regionList.provinceCode, // 省份
      Stat: '0', // 状态
      SuperVisor: this.SuperVisor, // 监理方
      Tel: this.Tel, // 联系电话
      UsageCode: this.selectCode,
      Scale: this.Scale,
    };
    if (this.BuildEnd) {
      Reflect.set(data, 'BuildEnd', this.BuildEnd);
    }
    if (this.BuildingTime) {
      Reflect.set(data, 'BuildingTime', this.BuildingTime);
    }
    if (this.WarrantyEnd) {
      Reflect.set(data, 'WarrantyEnd', this.WarrantyEnd);
    }
    if (this.SelectSubjections.value) {
      Reflect.set(data, 'Subjection', this.SelectSubjections.value);
    }
    this.service.serviceR('ent/building/5002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-info'
        });
        this.router.navigate(['index/facilities']);
      }
    });
  }
}
