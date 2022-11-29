import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-info',
    templateUrl: './Info.component.html',
    styleUrls: ['./Info.component.scss']
})

export class InfoComponent implements OnInit {
    crumbsList: any;
    data: any;

    strategyList: any[] = [];

    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service
    ) {
        this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '故障管理', open: false },
            { name: '策略故障', open: false },
            { name: '查看', open: false },
        ];

        this.data = JSON.parse(localStorage.getItem('bemInfoData'));
        this.getListGroup();
    }

    ngOnInit() {}

    getListGroup() {
      const data = {
          SSeq: this.data.Seq,
      };

      this.service.serviceR('ent/strategy/17005', data, (res: any) => {
        if (res.ResultCode === 0) {
            this.strategyList = res.Result.List;
            console.log(this.strategyList);
        }
      });
    }

    // 派单
    distribute() {
        localStorage.setItem('bemInfoData', JSON.stringify(this.data));
        this.router.navigate(['index/strategyalert/distribute']);
    }
}
