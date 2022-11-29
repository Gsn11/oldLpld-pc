import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TimeCompare } from '../../../../../../common/utils/js/timeCompare';
import { Service } from '../../../../../../service/service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DownloadFile } from 'src/pages/common/utils/js/downloadfile';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserDialogComponent } from '../../../../component/dialog/user-dialog/user-dialog.component';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
  // 短信模板 参数
  warningName = '';
	warningContent = '';
	ringType = '0';
	userListData = [];
	alarmLevel = '';
	leaders = [];
	templateData = [];
	saveUserData = {ids: '', names: ''};
	radioType = '';
	templateName = null;
	radioSelect: any = [];
	alarmInfo = false;
	alarmCheckBox = false;
	templateFlag = false;
	setConfim = false;
	idArray: any = [];
	gradeList:any = [];
	buildingType: any;


	searchName: string;
	crumbsList: object;
	DeviceType: string;
	customer: any;
	setData: object;
	initialCompanyList: any;
	@ViewChild(MatSort, null) sort: MatSort;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	pageIndex: number;
	pageSize: number;
	SystemList: any;
	SystemSelect = new FormControl();
	displayedColumns: string[];
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public dialog: MatDialog,
		private snackBar: MatSnackBar,
		private service: Service
	) {
		this.buildingType = new FormControl('');
		route.data
			.subscribe(
				(res: any) => {
					this.DeviceType = res.type;
				}
			);
		if (this.DeviceType === 'alertsms') {
			this.crumbsList = [
					{ name: '报警管理', open: false },
					{ name: '实时报警', open: false }
			];
			this.displayedColumns = ['timeStr', 'building', 'devName', 'metricDesc', 'levelName', 'time', 'orderState','ring', 'Other'];
		} else {
			this.crumbsList = [
				{ name: '运维中心', open: false },
				{ name: '故障管理', open: false },
				{ name: '预防性诊断', open: false }
			];
			this.displayedColumns = ['timeStr', 'building', 'devName', 'metricDesc', 'levelName', 'time', 'orderState', 'Other'];
		}
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.setData = {
			CommonSearch: '',
			CSeq: this.customer,
			AlertType: '2'
		};
		this.initialCompanyList = null;
		this.pageIndex = 1;
		this.pageSize = 10;
	
		this.searchName = '';
	}

	ngOnInit() {
		if (localStorage.getItem('BemPageIndex')) {
			this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.getItem('BemPageSize')) {
			this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		// 短信 接口 
		this.templateList(null,2);
		this.grade();
		this.getList();
		const data = {
			State: 0,
		};
		this.service.serviceR('ent/params/subsys/monitor/10911', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.SystemList = res.Result.SubSystems;
			}
		});
		if (localStorage.getItem('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.getItem('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}
	getList() {
		if(this.DeviceType === 'alertsms'){
			this.setData = {
				CommonSearch: '',
				CSeq: this.customer,
				AlertType: '0,1,2,3'
			};
		}
		this.service.serviceR('ent/diagalert/9101', this.setData, (res: any) => {
			console.log(res)
			if (res.ResultCode === 0) {
				this.initialCompanyList = new MatTableDataSource(res.Result.AlertList);
				this.initialCompanyList.sort = this.sort;
				this.initialCompanyList.paginator = this.paginator;
			}
		});
	}

	applyFilter() {
		this.initialCompanyList.filter = this.searchName.trim();
		if (this.initialCompanyList.paginator) {
			this.initialCompanyList.paginator.firstPage();
		}
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
	}

	selectClose(selectName: any) {
		this.initialCompanyList.filter = selectName.value.trim();
		if (this.initialCompanyList.paginator) {
			this.initialCompanyList.paginator.firstPage();
		}
	}

	gotoAdd(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        if(this.DeviceType === 'alertsms'){
            this.router.navigate(['index/diagassit/addAlarm']);
        }else{
            this.router.navigate(['index/diagassit/add']);
        }
		
	}

	gotoInfo(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
        if(this.DeviceType === 'alertsms'){
            this.router.navigate(['index/diagassit/infoAlarm']);
        }else{
            this.router.navigate(['index/diagassit/info']);
        }
		
	}

	getTime(time: number) {
		return new TimeCompare(time).compare();
	}
	downloadDeviceFile() {
		const body = {
			CommonSearch: this.searchName ? this.searchName : '',
			SubsysSeq: '',
			AlertType: '2',
			FileName: '预防性诊断'
		};
		if(this.DeviceType === 'alertsms'){
			body.AlertType = '0,1,2,3',
			body.FileName = '实时报警'
		}
		new DownloadFile(body, 'ent/diagrt/9001/export').downloadfile();
	}



    //短信 数据  接口 方法
	// 所有用户
    userList() {
        const data = {
            PageIndex: 0,
            PageSize: 9999999
        };
				this.userListData = [];
        this.service.serviceR('ent/cususer/4611', data, (res: any) => {
            if (res.ResultCode === 0) {
							for ( const i of res.Result.Users) {
									i.single = false;
								}
							this.userListData = res.Result.Users;
            }
    });
    }
		// 报警等级
		grade() {
				const data = {
					State: 0
				};
				this.service.serviceR('ent/params/alertlevel/11611', data, (res: any) => {
					if (res.ResultCode === 0) {
							const key = 'DevAlertLevels';
							console.log( res.Result[key])
							this.gradeList = res.Result[key];
					}
			});
			}
    // 选中人员
    updateAllComplete(v) {
        this.leaders = [];
        this.leaders = this.userListData.filter( v => v.single);
    }
 
    // 保存人员
    saveUser() {
        this.saveUserData = {ids: '', names: ''};
        const ids = []; const names = [];
        for ( const i of this.leaders) {
            ids.push(i.Seq);
            names.push(i.Name);
        }
        this.saveUserData.ids = ids.join();
        this.saveUserData.names = names.join();
        this.alarmCheckBox = false;
    }
     // 获取短信模板
    templateList(level,type) {
			const data  = {
				Level : level ? level : this.buildingType.value ? this.buildingType.value: null,
				CommonSearch: this.templateName ? this.templateName:null
			};
			this.service.serviceR('smsalert/21001', data, (res: any) => {
				if (res.ResultCode === 0) {
					for ( const i of res.Result.List) {
						const names = []; const phones = []; const ids = [];
						for ( const j of i.Users) {
							names.push(j.UName);
							phones.push(j.Tel);
							ids.push(j.USeq);
						}
						i.names = names.join();
						i.phones = phones.join();
						i.ids = ids.join();
						i.idArr = ids;
					}
					if(level !==null && type === 1 ){
						this.warningName = res.Result.List[0].Name;
						this.warningContent = res.Result.List[0].Content;
						this.ringType = res.Result.List[0].Ring;
						this.saveUserData.ids = res.Result.List[0].ids;
						this.saveUserData.names = res.Result.List[0].names;
						this.alarmLevel = res.Result.List[0].LevelName;
						this.radioType = res.Result.List[0].Seq;
						this.idArray = res.Result.List[0].idArr;
					}else{
						this.templateData = res.Result.List;
					}
				}
		 });
	  }
		 	// 添加用户
			 openUserModelDialog() {
				const data = {
					State: 0,
					title: '人员选择'
				};
				console.log(UserDialogComponent)
				const dialogRef = this.dialog.open(UserDialogComponent, {
					width: '1080px',
					data: { ...data }
				});
				dialogRef.afterClosed().subscribe(result => {
					console.log(result)
					if (result) {
						this.saveUserData = {ids: '', names: ''};
						const ids = []; const names = [];
						for ( const i of result) {
							ids.push(i.Seq);
							names.push(i.Name);
						}
						this.saveUserData.ids = ids.join();
						this.saveUserData.names = names.join();
						// this.ChooseUserName = `${result.LoginId} - ${result.Name} - ${result.UserTel}`;
					} else {
						this.saveUserData = {ids: '', names: ''};
					}
				});
			}

     // 点击单选框触发
     templateRadioChange(v){
        this.radioSelect = [];
        for (const i of this.templateData) {
            if ( i.Seq == v.value ) {
                this.radioSelect = i;
            }
        }
     }

     // 单选框点击保存
     saveTemplate(){
				this.userList();
        this.warningName = this.radioSelect.Name;
        this.warningContent = this.radioSelect.Content;
        this.ringType = this.radioSelect.Ring;
        this.saveUserData.ids = this.radioSelect.ids;
        this.saveUserData.names = this.radioSelect.names;
        this.alarmLevel = this.radioSelect.LevelName;
        this.radioType = this.radioSelect.Seq;
				this.idArray = this.radioSelect.idArr;
        this.templateFlag = false;
     }

		 // 手动报警
		 operation(){
			this.idArray = [];
			this.warningName = '';
			this.warningContent = '';
			this.ringType = '0';
			this.saveUserData.ids = '';
			this.saveUserData.names = '';
			this.alarmLevel = '';
			this.radioType = '';
			this.userList();
			this.alarmInfo = true;
		 }

    // 点击 发送短信
    sendMessage(v){
        this.templateList(v.level,1);
				this.userList();
        this.alarmInfo = true;
    }
 
		//确定发送
		sendInfo(type){
			if (type) {
			 const data = {
				Template: this.radioType? this.radioType:null,
				Name:  this.warningName,
				Content: this.warningContent,
				Ring: this.ringType,
				Users:  this.saveUserData.ids ? this.saveUserData.ids:null
			};
			this.setConfim = false;
			 this.service.serviceR('smsalert/22002', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('短信发送成功', '确认', {
						duration: 2000,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-info'
					});
					this.getList();
				}
			});
			} else {
				this.setConfim = false;
			}
		}

}
