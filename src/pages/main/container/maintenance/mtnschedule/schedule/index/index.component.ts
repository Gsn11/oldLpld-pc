import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { FormControl } from '@angular/forms';
import { DownloadFile } from '../../../../../../common/utils/js/downloadfile';
import { ServiceType, ServiceTypeNow, ServiceInside } from '../../../component/json/order.json';
import { PhotoSwipeComponent } from '../../../../component/photoSwipe/photoSwipe.component';
import { timeout } from 'rxjs/operators';
import buildData from '../../../../../../../environments/buildType';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    searchName: string;
    crumbsList: object;
    imgsrcData: string;
    userInfo: any;
    customer: any;
    confimType: string;
    bemInfoData: any;
    confimTitle: string;
    setConfim: boolean;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    paginatorTotal: number;
    activeChoose: number;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(PhotoSwipeComponent, null) photoSwipe: PhotoSwipeComponent;
    displayedColumns: string[];
    List: object[];
    chooseDeleteSeq: number;
    changePwdUseUSeq: number;
    changePwdUsePhone: string;
    enableUSeq: number;
    enableState: number;
    ScheduleType: string;
    GotoAdd: string;
    GotoEdit: string;
    GotoInfo: string;
    MaintenanceType: string;
    TableTitle1: string;
    TableTitle2: string;
    ServiceType: any;
    SelectServiceType: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        route.data
            .subscribe(
                (res: any) => {
                    this.ScheduleType = res.type;
                }
            );
        let crumbsName: string;
        if (this.ScheduleType === 'schedulepatrol') {
            crumbsName = '巡检计划';
            this.GotoAdd = 'schedulepatrol/add';
            this.GotoEdit = 'schedulepatrol/edit';
            this.GotoInfo = 'schedulepatrol/info';
            this.MaintenanceType = '0';
            this.TableTitle2 = '巡检周期（生效时间段）';
            this.TableTitle1 = crumbsName;
            this.crumbsList = [
                { name: '运维中心', open: false },
                { name: '运维计划', open: false },
                { name: crumbsName, open: false }
            ];
        } else if (this.ScheduleType === 'schedulekeep') {
            crumbsName = '保养计划';
            this.GotoAdd = 'schedulekeep/add';
            this.GotoEdit = 'schedulekeep/edit';
            this.GotoInfo = 'schedulekeep/info';
            this.MaintenanceType = '1';
            this.TableTitle2 = '保养周期（生效时间段）';
            this.TableTitle1 = crumbsName;
            this.crumbsList = [
                { name: '运维中心', open: false },
                { name: '运维计划', open: false },
                { name: crumbsName, open: false }
            ];
        } else if (this.ScheduleType === 'inspectionschedule') {
            crumbsName = '自动巡检计划';
            this.GotoAdd = 'inspectionschedule/add';
            this.GotoEdit = 'inspectionschedule/edit';
            this.GotoInfo = 'inspectionschedule/info';
            this.MaintenanceType = '4';
            this.TableTitle2 = '巡检周期（生效时间段）';
            this.TableTitle1 = crumbsName;
            this.crumbsList = [
                { name: 'Aiot', open: false },
                { name: crumbsName, open: false }
            ];
        } else {
            crumbsName = '维修计划';
            this.GotoAdd = 'schedulefix/add';
            this.GotoEdit = 'schedulefix/edit';
            this.GotoInfo = 'schedulefix/info';
            this.MaintenanceType = '2,3';
            this.TableTitle2 = '维修周期（生效时间段）';
            this.TableTitle1 = crumbsName;
            this.crumbsList = [
                { name: '运维中心', open: false },
                { name: '运维计划', open: false },
                { name: crumbsName, open: false }
            ];
        }
        this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
        this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
        this.customer = this.userInfo.Customer.Seq;
        this.confimTitle = null;
        this.setConfim = false;
        this.displayedColumns = ['MSName', 'TimeType', 'State', 'NeedQrcode', 'ChargerName', 'Other'];
        this.List = null;
        this.pageSizeOptions = [5, 10, 20];
        this.paginatorTotal = 10;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.searchName = null;
        const Isentver = this.userInfo.Isentver;
        console.log(buildData);
        // if (!Isentver) {
        //     this.ServiceType = [{ name: buildData.serviceProvider, value: '0' }, { name: '服务大市场', value: '2' }];
        //     this.SelectServiceType = new FormControl('');
        // } else {
            this.ServiceType = ServiceInside;
            this.SelectServiceType = new FormControl({
                value: '0',
                disabled: false
            });
        // }
    }

    ngOnInit() {
        if (localStorage.hasOwnProperty('BemSelectServiceType')) {
            this.SelectServiceType.setValue(localStorage.getItem('BemSelectServiceType').toString());
        }
        if (localStorage.getItem('BemPageIndex')) {
            this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
        }
        if (localStorage.getItem('BemPageSize')) {
            this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
        }
        this.getList();
        if (localStorage.hasOwnProperty('BemSelectServiceType')) {
            localStorage.removeItem('BemSelectServiceType');
        }
        if (localStorage.getItem('BemPageIndex')) {
            localStorage.removeItem('BemPageIndex');
        }
        if (localStorage.getItem('BemPageSize')) {
            localStorage.removeItem('BemPageSize');
        }
    }

    lookImg(el) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        const data = {
            MSSeq: el.MSSeq,
            FromCache: false
        };
        this.service.serviceR('ent/maintenance/8305', data, (res: any) => {
            if (res.ResultCode === 0) {
                const key = 'ScheduleImages';
                this.imgsrcData = res.Result[key];
                if (res.Result[key] && res.Result[key][0] && res.Result[key][0].ImgUrl) {
                    const items = [
                        {
                            src: res.Result[key][0].ImgUrl,
                            w: 2000,
                            h: 1200
                        }
                    ];
                    this.photoSwipe.open(items);
                    // window.open(res.Result[key][0].ImgUrl);
                } else {
                    alert('暂无指引');
                }
            }
        });
    }

    getList() {
        const data = {
            State: '0,1,3',
            Type: this.MaintenanceType,
        };
        if (this.SelectServiceType.value) {
            Reflect.set(data, 'ServiceType', this.SelectServiceType.value);
        }
        if (this.searchName) {
            Reflect.set(data, 'CommonSearch', this.searchName);
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        } else {
            Reflect.set(data, 'PageIndex', this.pageIndex);
            Reflect.set(data, 'PageSize', this.pageSize);
        }
        this.service.serviceR('ent/maintenance/8311', data, (res: any) => {
            if (res.ResultCode === 0) {
                console.log(res);
                this.List = res.Result.MaintenanceSchedules;
                this.paginatorTotal = res.Result.Total;

                for (const da of res.Result.MaintenanceSchedules) {
                    if (da.MSSeq === 3568) {
                        Reflect.set(da, 'url', 'http://www.bemcn.com.cn:10000/?scene_id=50195147');
                    } else if (da.MSSeq === 3567) {
                        Reflect.set(da, 'url', 'http://www.bemcn.com.cn:10000/?scene_id=50195150');
                    } else if (da.MSSeq === 3566) {
                        Reflect.set(da, 'url', 'http://www.bemcn.com.cn:10000/?scene_id=50195146');
                    }
                }
            }
        });
    }
    gotovr(url) {
        window.open(url);
    }
    downloadScheduleFile() {
        let FileNameData = '';
        if(this.ScheduleType === 'schedulepatrol'){
            FileNameData = '巡检计划';
        }else if(this.ScheduleType === 'schedulekeep'){
            FileNameData = '保养计划';
        }else if(this.ScheduleType === 'inspectionschedule'){
            FileNameData = 'AOT巡检计划';
        }else{
            FileNameData = '维修计划';
        }
        const body = {
            State: '0,1,3',
            Type: this.MaintenanceType,
            FileName: FileNameData
        };
        if (this.SelectServiceType.value) {
            Reflect.set(body, 'ServiceType', this.SelectServiceType.value);
        }
        if (this.searchName) {
            Reflect.set(body, 'CommonSearch', this.searchName);
        }
        new DownloadFile(body, 'ent/maintenance/8306').downloadfile();
    }

    gotoAdd() {
        if (localStorage.hasOwnProperty('bemDevicealarmData')) {
            localStorage.removeItem('bemDevicealarmData');
        }
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/' + this.GotoAdd]);
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
        this.pageIndex = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getList();
    }

    gotoInfo(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/' + this.GotoInfo]);
    }

    gotoEdit(el: any) {
        localStorage.setItem('bemInfoData', JSON.stringify(el));
        localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
        localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        this.router.navigate(['index/' + this.GotoEdit]);
    }

    changeState(seq: number, state: number) {
        const changeState = state === 0 ? 1 : 0;
        const data = {
            State: changeState,
            MSSeq: seq
        };
        this.service.serviceR('ent/maintenance/8304', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.getList();
                this.snackBar.open('操作成功', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
            }
        });
    }
    StateType(e) {
      switch (e) {
          case 0:
              return '正常';
          case 1:
              return '失效';
          case 2:
              return '删除';
          case 3:
              return '超时失效';

      }
    }
    // 控制confim模态框
    showConfim(seq: number) {
        this.chooseDeleteSeq = seq;
        this.setConfim = !this.setConfim;
    }

    tableConfimResult(...data: boolean[]) {
        this.setConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.service.serviceR('ent/maintenance/8304', { MSSeq: this.chooseDeleteSeq, State: 2 }, (res: any) => {
                if (res.ResultCode === 0) {
                    this.snackBar.open('删除成功', '确认', {
                        duration: 1600,
                        verticalPosition: 'top',
                        panelClass: 'snack-bar-color-info'
                    });
                    this.getList();
                }
            });
        }
    }
}

