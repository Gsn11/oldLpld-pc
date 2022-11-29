import { Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from '../../../../service/service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-spacetreemodal',
  templateUrl: './spacetreeModal.component.html',
  styleUrls: ['./spacetreeModal.component.scss']
})
export class SpacetreeModalComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  @Input() data: any;
  @Output() getBuildings = new EventEmitter<any>();
  List: any;
  fshow: boolean;
  displayedColumns: string[];
  indeterminate: boolean;
  allIsCheck: boolean;
  deviceName: any;
  dataSource: any;
  selection: any;
  Items: any;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private service: Service
  ) {
    this.displayedColumns = ['select', 'DeviceNo', 'MetricsDesc', 'IsAlert'];
    this.fshow = false;
  }
  ngOnInit() {

  }
  checkAll(event: any) {
    for (const d of this.data) {
        d.uCheck = event.checked;
    }
}
search() {
  const data = {
    // Id: '',
    // DeviceNo: '',
    // DevSeq: '',
    // Gateway: '',
    // GatewaySeq: '',
    // SmartDevSeq: '',
    // BoxDevSeq: '',
    // State: '',
    CommonSearch: this.deviceName,
    PageIndex: '',
    PageSize: ''
  };
  console.log(data);
  this.service.serviceR('ent/iot/metricsbem/11901', data, (res: any) => {
    if (res.ResultCode === 0) {
      for (const d of res.Result.MetricsBems) {
        Reflect.set(d, 'uCheck', false);
      }
      this.data = res.Result.MetricsBems;
      console.log(this.data);
    }
  });
}
checkItem() {
  const len = this.data.length;
  let sum = 0;
  for (const d of this.data) {
      if (d.uCheck === true) {
          sum += 1;
      } else {
          sum -= 1;
      }
  }
  if (sum === len) {
      this.indeterminate = false;
      this.allIsCheck = true;
  } else if (sum < len && sum > -Math.abs(len)) {
      this.allIsCheck = false;
      this.indeterminate = true;
  } else if (sum === -Math.abs(len)) {
      this.indeterminate = false;
      this.allIsCheck = false;
  }
}
    // 空间位置新增
    spaceChoose() {
      this.fshow = false;
      if (this.data) {
        const temp = [];
        for (const d of this.data) {
              if (d.uCheck === true) {

                  temp.push(d);
              }
          }
        this.getBuildings.emit(temp);
      }
  }


}
