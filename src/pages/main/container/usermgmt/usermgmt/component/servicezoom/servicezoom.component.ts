import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servicezoom',
  templateUrl: './servicezoom.component.html',
  styleUrls: ['./servicezoom.component.scss']
})
export class ServicezoomComponent implements OnInit {
  bemInfoData: any;
  region: any;
  checkServiceZoom: boolean;
  regionAllCheck: boolean;
  isType: string;
  @Input() regionChooseList: any;
  @Input() pageType: string;
  constructor() {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.region = JSON.parse(localStorage.getItem('bemRegionJSON'));
    this.regionAllCheck = false;
  }

  ngOnInit() {
    this.isType = this.pageType;
    this.checkServiceZoom = false;
    this.initialData(this.region);
    if (this.pageType === 'edit') {
      const tempList = [];
      let serviceZone: any;
      if (this.bemInfoData.ServiceZone) {
        serviceZone = this.bemInfoData.ServiceZone.split(',');
      } else {
        serviceZone = [];
      }
      if (serviceZone.length !== 0) {
        for (const s of serviceZone) {
          for (const r of this.region) {
            r.switch = false;
            for (const c of r.regionEntitys) {
              c.switch = false;
              for (const d of c.regionEntitys) {
                if (s === d.code) {
                  d.check = true;
                  tempList.push({
                    code: d.code,
                    region: d.region
                  });
                  this.regionChooseList = tempList;
                } else {
                  d.check = false;
                }
              }
            }
          }
        }
      }
    }
  }

  initialData(list: any, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      Reflect.set(list[total], 'check', false);
      Reflect.set(list[total], 'switch', false);
      Reflect.set(list[total], 'name', list[total].region);
      if (list[total].regionEntitys.length !== 0) {
        Reflect.set(list[total], 'children', list[total].regionEntitys);
      }
      this.initialData(list, total + 1);
      if (list[total].regionEntitys) {
        if (list[total].regionEntitys.length !== 0) {
          this.initialData(list[total].regionEntitys, 0);
        }
      }
    }
    return;
  }

  checkAll(event: any) {
    this.regionAllCheck = event.checked;
    this.checkAllItem(this.region, this.regionAllCheck);
  }

  checkAllItem(list: any, check: boolean, total: number = 0) {
    if (list) {
      if (list.length === total) {
        return;
      }
      if (check) {
        list[total].check = true;
      } else {
        list[total].check = false;
      }
      this.checkAllItem(list, check, total + 1);
      if (list[total].regionEntitys.length !== 0) {
        this.checkAllItem(list[total].regionEntitys, check, 0);
      }
    }
    return;
  }

  checkOk() {
    this.checkServiceZoom = false;
    const region: any = [];
    for (const r of this.region) {
      for (const c of r.regionEntitys) {
        for (const d of c.regionEntitys) {
          if (d.check) {
            region.push({
              code: d.code,
              region: d.region
            });
          }
        }
      }
    }
    this.regionChooseList = region;
  }

  chooseService() {
    if (this.checkServiceZoom) {
      return;
    }
    this.checkServiceZoom = !this.checkServiceZoom;
  }

  deleteItem(index: number) {
    this.regionChooseList.splice(index, 1);
  }

  closeChoosePlant() {
    this.checkServiceZoom = false;
  }
}
