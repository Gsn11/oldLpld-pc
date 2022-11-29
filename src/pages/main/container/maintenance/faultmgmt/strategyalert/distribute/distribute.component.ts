import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../../service/service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';
import { UserManyDialogComponent } from '../../../../component/dialog/userMany-dialog/userMany-dialog.component';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';

@Component({
    selector: 'app-distribute',
    templateUrl: './distribute.component.html',
    styleUrls: ['./distribute.component.scss']
})

export class DistributeComponent implements OnInit {
    crumbsList: any;
    data: any;
    chargeVal: any;
    chargeSeq: any;
    workVal: any;
    workSeq: any;
    imgsrcData: any[] = [];
    docListData: any[] = [];
    desc: any;

    strategyList: any[] = [];

    @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    constructor(
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        this.crumbsList = [
            { name: '运维中心', open: false },
            { name: '故障管理', open: false },
            { name: '策略故障', open: false },
            { name: '派单', open: false },
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

    openCharge() {
        const data = {
            State: 0,
            // BSeqs: this.BuildingSeq,
            // UserType: userType,
            title: '负责人'
        };
        // for (const b of this.Builds) {
        //     if (this.BuildingSeq === b.Seq) {
        //         Reflect.set(data, 'subjection', b.Subjection);
        //     }
        // }
        const dialogRef = this.dialog.open(UserManyDialogComponent, {
            width: '1080px',
            data: { ...data }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const name: any[] = [];
                const seq: any[] = [];
                result[0].selected.forEach(item => {
                    name.push(item.Name);
                    seq.push(item.Seq);
                });
                this.chargeVal = name.join('， ');
                this.chargeSeq = seq.toString();
            }
        });
    }

    openWork() {
        const data = {
            State: 0,
            // BSeqs: this.BuildingSeq,
            // UserType: userType,
            title: '工作人员选择'
        };
        // for (const b of this.Builds) {
        //     if (this.BuildingSeq === b.Seq) {
        //         Reflect.set(data, 'subjection', b.Subjection);
        //     }
        // }
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '1080px',
            data: { ...data, multiple: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const name: any[] = [];
                const seq: any[] = [];
                result.forEach(item => {
                    name.push(item.Name);
                    seq.push(item.Seq);
                });
                this.workVal = name.join('， ');
                this.workSeq = seq.toString();
            }
        });
    }

    distribute() {
        // ent/maintenance/8002
        const data = {
            MSName: this.data.Name,
            MSDesc: this.desc,
            Charger: this.chargeSeq,
            Workers: this.workVal,
            ServiceType: 0
        };

        this.service.serviceR('ent/maintenance/8002', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.snackBar.open('派单成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-info'
                });
                this.router.navigate(['index/diagalert']);
            }
        });
    }
}
