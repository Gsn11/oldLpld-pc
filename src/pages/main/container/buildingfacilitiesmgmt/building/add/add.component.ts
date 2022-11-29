import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EditRegionComponent } from '../../../component/editRegion/editRegion.component';
import { CalendarComponent } from '../../../component/calendar/calendar.component';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { MapComponent } from '../../../component/map/map.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar } from '@angular/material';
import { RequestService } from '../../../../../service/request';
import buildData from '../../../../../../environments/buildType';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  code: any;
  map: any;
  userInfo: any;
  crumbsList: object;
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
  BType: number; // 建筑类型流水号，逗号分割
  BuildCompany: string; // 施工方
  BuildEnd: string; // 完工日期
  BuildingGroup: string; // ---
  BuildingTime: string; // 开工日期
  City: string; // 城市code
  ConstructCompany: string; // 建设方
  DesignCompany: string; // 设计方
  District: string; // 区域
  DownFloors: number; // 地下层数
  FinanceTel: string; // 物业财务联系电话
  FloorArea: number; // 面积（平方米）
  GdLat: number; // 高德地图纬度
  GdLng: number; // 高德地图经度
  Hight: number; // 高度（米）
  InvestCapital: number; // 总投资（万元）
  Name: string; // 建筑物名称
  Pics: object; // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
  Province: string; // 省份
  Subjection: number; // 归属园群
  SuperVisor: string; // 监理方
  Tel: string; // 联系电话
  UpFloor: string; // 地上层数
  UsageCode: string; // 建筑类型
  WarrantyEnd: string; // 保修截止日期
  Isentver: boolean;
  buildData: any;
  constructor(
    private router: Router,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
    this.imgsrc = '';
    this.BuildUsages = null;
    this.SelectBuildUsages = new FormControl('');
    this.BuildGroups = [];
    this.SelectBuildGroups = new FormControl('');
    this.Subjections = [];
    this.SelectSubjections = new FormControl('');
    this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
    let menu1: string;
    let menu2: string;
    if (!this.Isentver) {
      menu1 = '建筑设施管理';
      menu2 = '建筑物管理';
      this.selectName = '请选择建筑类型';
    } else {
      menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
      menu2 = buildData.buildType === '联排联调' ? '水工建筑管理' : '建筑管理';
      this.selectName = buildData.buildType === '联排联调' ? '请选择水工建筑类型' : '请选择建筑类型';
    }
    this.crumbsList = [
      { name: menu1, open: false },
      { name: menu2, open: true, url: 'building' },
      { name: '添加', open: false, url: '' }
    ];
    this.isTreeOpen = false;
    this.allSwitchIsOpen = true;
    this.selectCode = null;
  }

  ngOnInit() {
    this.buildData = buildData;
    const data = {
      FromCache: false,
      State: 0
    };
    this.requestService.request('ent/params/buildusage/10301', data)
      .subscribe(
        (res: any) => {
          if (res.ResultCode === 0) {
            this.BuildUsages = this.create(res.Result.BuildUsages);
            console.log(res.Result.BuildUsages);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    this.requestService.request('ent/buildgroup/5111', data)
      .subscribe(
        (res: any) => {
          if (res.ResultCode === 0) {
            this.BuildGroups = res.Result.BuildGroups;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    this.requestService.request('ent/subjection/3811', data)
      .subscribe(
        (res: any) => {
          if (res.ResultCode === 0) {
            this.Subjections = res.Result.Subjections;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  create(tree: any): any {
    const m = new Map();
    console.log(tree);
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
      console.log(d);
      if ((d && !d.BUParent) || d.BUParent === '0') {
        t.push(node);
      } else {
        const pnode = m.get(d.BUParent + '');
        if (!pnode) {
          continue;
        }
        pnode.children.push(node);
      }
    }
    console.log(t);
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
    this.router.navigate(['index/building']);
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
          panelClass: 'snack-bar-color-warning'
        });
      } else {
        this.snackBar.open(buildData.buildType === '联排联调' ? '请选择水工建筑名称' : '请选择建筑名称', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-warning'
        });
      }
      return;
    }
    if (this.selectName === '请选择建筑类型') {
      if (!this.Isentver) {
        this.snackBar.open('请选择建筑类型', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-warning'
        });
      } else {
        this.snackBar.open(buildData.buildType === '联排联调' ? '请选择水工建筑类型' : '请选择建筑类型', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-warning'
        });
      }
    }
    this.snackBar.open('正在生成，请稍等', '确认', {
      duration: 1600,
      verticalPosition: 'top',
      panelClass: 'snack-bar-color-info'
    });
    const data: IAddList = {
      Addr: this.Addr, // 建筑物地址
      BDesc: this.BDesc,  // 建筑物简介
      BType: 0, // 建筑类型流水号，逗号分割
      BuildCompany: this.BuildCompany, // 施工方
      BuildEnd: this.BuildEnd, // 完工日期
      BuildingGroup: this.SelectBuildGroups.value ? this.SelectBuildGroups.value : '', // ---
      BuildingTime: this.BuildingTime, // 开工日期
      City: this.regionList.cityCode, // 城市code
      ConstructCompany: this.ConstructCompany, // 建设方
      DesignCompany: this.DesignCompany, // 设计方
      District: this.regionList.districtCode, // 区域
      DownFloors: this.DownFloors, // 地下层数
      FinanceTel: this.FinanceTel, // 物业财务联系电话
      FloorArea: this.FloorArea, // 面积（平方米）
      GdLat:  this.GdLat, // 高德地图纬度
      GdLng: this.GdLng, // 高德地图经度
      Hight: this.Hight, // 高度（米）
      InvestCapital: this.InvestCapital, // 总投资（万元）
      Name: this.Name, // 建筑物名称
      Pics: this.manyFile.setImgsrcData, // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
      Province: this.regionList.provinceCode, // 省份
      SuperVisor: this.SuperVisor, // 监理方
      Tel: this.Tel, // 联系电话
      UpFloor: this.UpFloor, // 地上层数
      UsageCode: this.selectCode, // 建筑类型
      WarrantyEnd: this.WarrantyEnd, // 保修截止日期
    };
    if (this.SelectSubjections.value) {
      Reflect.set(data, 'Subjection', this.SelectSubjections.value);
    }

    if (this.code) {
      Reflect.set(data, 'Code', this.code);
    }

    this.requestService.request('ent/building/5002', data)
      .subscribe(
        (res: any) => {
          this.snackBar.open('添加成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
          });
          this.router.navigate(['index/building']);
        }
      );
  }
}
