import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-seniority',
  templateUrl: './seniority.component.html',
  styleUrls: ['./seniority.component.scss']
})
export class SeniorityComponent {
  data: any;
  pageIndex: number;
  pageSize: number;
  paginatorTotal: number;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  list: any;
  constructor() {
    this.paginatorTotal = 25;
    this.pageIndex = 1;
    this.pageSize = 9;
    this.list = [
      [
        {
          url: '../../../../assets/introduce/seniority/seniority/1.jpg',
          name: '企业集团登记证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/2.jpg',
          name: '高新技术企业'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/3.jpg',
          name: '福建省科技型企业'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/4.jpg',
          name: '机电工程施工总承包资质'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/5.jpg',
          name: '环保工程专业承包资质'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/6.jpg',
          name: '电子与智能化工程专业承包一级资质'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/7.jpg',
          name: '城市及道路照明工程专业承包资质'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/8.jpg',
          name: '建筑机电安装工程专业承包资质'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/9.jpg',
          name: '制冷空调设备维修安装资质A级'
        },
      ],
      [
        {
          url: '../../../../assets/introduce/seniority/seniority/10.jpg',
          name: '建筑施工安全生产许可'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/11.jpg',
          name: '质量管理体系认证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/12.jpg',
          name: '信息技术服务管理体系认证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/13.jpg',
          name: '环境管理体系认证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/14.jpg',
          name: '信息安全管理体系认证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/15.jpg',
          name: '职业健康安全管理体系认证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/16.jpg',
          name: '企业信用等级证书'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/17.jpg',
          name: '2016-2017福州市守合同重信用企业'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/18.jpg',
          name: '中国财政学会会员'
        },
      ],
      [
        {
          url: '../../../../assets/introduce/seniority/seniority/19.jpg',
          name: '优秀产品供应商'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/20.jpg',
          name: '建筑智能化分会理事单位'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/21.jpg',
          name: '最佳合作伙伴'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/22.jpg',
          name: '会员证'
        },
        {
          url: '../../../../assets/introduce/seniority/seniority/23.jpg',
          name: '中国建筑业协会智能建筑分会理事单位'
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
