import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../service/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  searchName: string;
  bemInfoData: any;
  crumbsList: object;
  customer: any;
  @ViewChild(ModalComponent, null) modal: ModalComponent;
  SubsysAudits: any;
  SubsysUsers: any;
  modalTitle: string;
  data: any;
  pageSize: number;
  pageSizeOptions: number[];
  paginatorTotal: number;
  activeChoose: number;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  setData: object;
  displayedColumns: string[];
  useList: any;
  UserSubsysAudits: any;
  type: string;
  constructor(
    private service: Service,
    private router: Router
  ) {
    this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
    this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
    this.setData = {
        BType: 1,
        CommonSearch: '',
        Customer: this.customer,
        FromCache: false,
        State: 0,
        PageIndex: 1,
        PageSize: 10
    };
    this.crumbsList = [
      { name: '用户权限', open: false, url: '' },
      { name: '授权管理', open: true, url: 'buildingauth' },
      { name: '新增', open: false, url: '' }
    ];
    this.modalTitle = null;
    this.pageSize = 10;
    this.displayedColumns = ['姓名', '登陆名', '管理员', '状态', '手机号', 'Email', '操作'];
    this.pageSizeOptions = [5, 10, 20];
    this.paginatorTotal = 10;
    this.type = 'system';
  }

  ngOnInit() {
    this.getList();
    this.getUserList();
  }

  getList() {
    const data = {
      BSeq: this.bemInfoData.Seq,
      Customer: this.customer,
      State: 0
    };
    this.service.serviceR('ent/dataauth/7403', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.SubsysAudits = res.Result.SubsysAudits;
      }
    });
  }

  getUserList() {
    this.service.serviceR('ent/cususer/4611', this.setData, (res: any) => {
      if (res.ResultCode === 0) {
        this.useList = res.Result.Users;
        this.paginatorTotal = res.Result.Total;
      }
    });
  }

  addSystem(index: number) {
    this.type = 'system';
    const data = {
      BSeq: this.bemInfoData.Seq,
      Customer: this.customer,
      SubsysSeq: this.SubsysAudits[index].SubsysSeq,
    };
    this.service.serviceR('ent/dataauth/7405', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.SubsysUsers = res.Result.SubsysUsers;
        this.modalTitle = `${this.SubsysAudits[index].SubsysName} 新增`;
      }
    });
    this.modal.switchModalBox();
  }

  addUserSystem(index: number) {
    this.type = 'userSystem';
    const data = {
      BSeq: this.bemInfoData.Seq,
      CSeq: this.customer,
      USeq: this.useList[index].Seq,
    };
    console.log(data);
    this.service.serviceR('ent/dataauth/7406', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res.Result.UserSubsysAudits);
        this.SubsysUsers = res.Result.UserSubsysAudits;
        this.modalTitle = `${this.useList[index].Name} 新增`;
      }
    });
    this.modal.switchModalBox();
  }

  // 点击item项做active切换底色方法
  radioChange(index: number) {
    if (this.activeChoose === index) {
      this.activeChoose = 35;
      return;
    }
    this.activeChoose = index;
  }
  // 分页修改时响应方法
  change(event: any) {
    Reflect.set(this.setData, 'PageIndex', event.pageIndex + 1);
    Reflect.set(this.setData, 'PageSize', event.pageSize);
    this.getUserList();
  }

  // 其他组件调用条件搜索方法
  search() {
      Reflect.set(this.setData, 'CommonSearch', this.searchName);
      this.getUserList();
  }

  goback() {
    this.router.navigate(['index/buildingauth']);
  }
}
