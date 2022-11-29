import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { FormControl } from '@angular/forms';
import { UserDialogComponent } from '../../../component/dialog/user-dialog/user-dialog.component';

@Component({
	selector: 'app-materiel',
	templateUrl: './materiel.component.html',
	styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {
	crumbsList: any;
  templateName = '';
	warningName = '';
	warningContent = '';
	typeSave = '';
	delSeq = '';
	ClassId = null;
	ringType = '0';
	list: any = [];
	alarmInfo = false;
	setConfim = false;
	userListSeq = '';
	leaders = [];
	saveUserData = {ids: '', names: ''};
	alarmCheckBox = false;
	pageIndex = 0;
	pageSize = 10;
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 0;

	displayedColumns = ['garel','LevelType', 'modouName', 'name', 'phone', 'operate'];
	gradeList  = [];
	userListData = [];
	idArray: any = [];
  buildingType: any;
	classSeq = '';
	type: any;

	constructor(
		public route: ActivatedRoute,
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
		this.buildingType = new FormControl('');
		route.data.subscribe(res => {
			res.type ? this.type = res.type : this.type = '';
		});
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '报警管理', open: false },
			{ name: '报警模板', open: false }
		];
  this.grade();
		this.getList();
		// this.userList();
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	getList() {
		const data  = {
			Level: this.buildingType.value ? this.buildingType.value : null,
			CommonSearch: this.templateName,
			// PageIndex: this.pageIndex,
			// PageSize: this.pageSize
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
				this.list = res.Result.List;
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
						this.gradeList = res.Result[key];
				}
		});
		}

		// 所有用户
		userList() {
			const data = {
				PageIndex: 0,
				PageSize: 9999
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

		// 点击配置
		allocation() {
			this.idArray = [];
			this.classSeq = '';
			this.warningName = '';
			this.warningContent = '';
			this.saveUserData.ids = '';
			this.saveUserData.names = '';
			this.ringType = '0';
			this.userList();
			this.alarmInfo = true;
		}

		// 保存配置
		saveInfo() {
			if (this.warningName === '') {
				this.snackBar.open('请输入模板名称', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				return false;
			} else if (this.warningContent === '' ) {
				this.snackBar.open('请输入警报内容', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				return false;
			} else if (this.saveUserData.ids === '' ) {
				this.snackBar.open('请添加用户', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				return false;
			}
			const data = {
				Level: this.classSeq ? this.classSeq : null,
				Name: this.warningName,
				Content: this.warningContent,
				Ring: this.ringType,
				Users: this.saveUserData.ids,
				Seq: this.ClassId ? this.ClassId : null
			};
			if ( this.typeSave == '1' ) {
				this.service.serviceR('smsalert/21003', data, (res: any) => {
					if (res.ResultCode === 0) {
						this.alarmInfo = false;
						this.getList();
						this.typeSave = '';
					}
			  });
				return false;
			}
			this.service.serviceR('smsalert/21002', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.alarmInfo = false;
					this.getList();
				}
		});
		}
		// 编辑模板
		compileClass(v, type) {
			this.userList();
		  this.idArray = v.idArr;
			this.classSeq = v.Level;
			this.warningName = v.Name;
			this.warningContent = v.Content;
			this.saveUserData.names = v.names;
			this.saveUserData.ids = v.ids;
			this.ringType = v.Ring;
			this.typeSave = type;
			this.ClassId = v.Seq;
			this.alarmInfo = true;
		}

	
		// addUser(){
		// 	this.alarmCheckBox = true;
		// 	for (const i of this.idArray) {
		// 		for (const j of this.userListData) {
		// 			if ( i === j.Seq ) {
		// 					j.single = true;
		// 				}
		// 		 }
		//  }
		// }
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

		// 删除模板
		delete(type) {
			if (type) {
				this.setConfim = false;
			 const data = {
				Seq: this.delSeq,
			};
			 this.service.serviceR('smsalert/21004', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.getList();
				}
			});
			} else {
				this.setConfim = false;
			}
		}
}
