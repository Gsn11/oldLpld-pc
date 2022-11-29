import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-patent',
  templateUrl: './patent.component.html',
  styleUrls: ['./patent.component.scss']
})
export class PatentComponent {
  data: any;
  pageIndex: number;
  pageSize: number;
  paginatorTotal: number;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  list: any;
  constructor() {
    this.paginatorTotal = 30;
    this.pageIndex = 1;
    this.pageSize = 9;
    this.list = [
      [
        {
          url: '../../../../assets/introduce/seniority/patent/1.jpg',
          name: '商标“BEM”'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/2.jpg',
          name: '商标“悦”'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/3.jpg',
          name: '商标'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/4.jpg',
          name: '实用新型专利'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/5.jpg',
          name: '外观设计专利'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/6.jpg',
          name: '实用新型专利'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/7.jpg',
          name: '实用新型专利'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/8.jpg',
          name: '智能设备集成平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/9.jpg',
          name: '节能控制嵌入式软件V1.0'
        },
      ],
      [
        {
          url: '../../../../assets/introduce/seniority/patent/10.jpg',
          name: '综合管廊自动化控制与节能系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/11.jpg',
          name: '能耗与设施运营（BEX EF-ODA）诊断分析系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/12.jpg',
          name: '综合管廊智慧集成平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/13.jpg',
          name: '泵房物联网集成系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/14.jpg',
          name: '智能设备集成平台V2.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/15.jpg',
          name: '中央冷战节能群控嵌入式软件V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/16.jpg',
          name: '阀门群控节能系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/17.jpg',
          name: '综合管廊管理系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/18.jpg',
          name: '综合管廊环境与安全监测管理系统V1.0'
        },
      ],
      [
        {
          url: '../../../../assets/introduce/seniority/patent/19.jpg',
          name: '泵阀能耗物联系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/20.jpg',
          name: '建筑与环境自动化管理（BEM-AX）系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/21.jpg',
          name: '中央空调群控节能（BEM-AX）系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/22.jpg',
          name: '智慧能耗管理（BEM-AE-CLOUD）云服务平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/23.jpg',
          name: '智慧医疗设施集成监控（BEM-AH）云平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/24.jpg',
          name: '智慧建筑设备集成监控（BEM-IBMS）云平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/25.jpg',
          name: '建筑与环境大数据（BEBD-CLOUD）云平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/26.jpg',
          name: '城市能效监控分析平台V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/27.jpg',
          name: '空调机组节能控制嵌入式软件V1.0'
        },
      ],
      [
        {
          url: '../../../../assets/introduce/seniority/patent/28.jpg',
          name: '城市轨道交通综合节能管理系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/29.jpg',
          name: '建筑与环境自动化管理系统V1.0'
        },
        {
          url: '../../../../assets/introduce/seniority/patent/30.jpg',
          name: '能效管理平台V1.0'
        },
      ],
    ];
    this.data = this.list[this.pageIndex - 1];
  }
  // 分页修改时响应方法
  change(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.data = this.list[this.pageIndex - 1];
  }
}
