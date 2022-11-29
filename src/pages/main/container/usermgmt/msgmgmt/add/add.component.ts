import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { UserManyDialogComponent } from '../../../component/dialog/userMany-dialog/userMany-dialog.component';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	customer: any;
	userInfo: any;
	crumbsList: object;
	SelectRecvType = new FormControl({
		value: 0,
		disabled: false
	});
	recvType: object[] = [];
	SelectTeams = new FormControl();
	Teams: any;
	title: string = null;
	msg: string = null;
	memo: string = null;
	imgsrcData: object[] = [];
	docList: object[] = [];
	SelectUserName: string;
	ReceiverNames: string = null;
	Receivers: string = null;
	constructor(
		private router: Router,
		private service: Service,
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) {
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.crumbsList = [
			{ name: '用户管理', open: false, url: '' },
			{ name: '推送消息管理', open: true, url: 'msgmgmt' },
			{ name: '新增', open: false, url: '' }
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.recvType.push({ value: 0, name: '个人' }, { value: 1, name: '部门' });
		this.SelectUserName = '选择信息接收用户';
	}

	ngOnInit() {
		this.getTeamList();
	}

	openUserManyDialog(): void {
		const dialogRef = this.dialog.open(UserManyDialogComponent, {
			width: '1080px',
			data: {
				State: 0,
				title: '收件人'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const selected = result[0].selected;
				console.log(selected);
				if (selected.length > 0) {
					this.ReceiverNames = '';
					this.Receivers = '';
					this.SelectUserName = '';
					for (const s of selected) {
						this.ReceiverNames += s.Name + ',';
						this.Receivers += s.Seq + ',';
						this.SelectUserName += s.Name + ', ';
					}
					this.ReceiverNames = this.ReceiverNames.substr(0, this.ReceiverNames.length - 1);
					this.Receivers = this.Receivers.substr(0, this.Receivers.length - 1);
					this.SelectUserName = this.SelectUserName.substr(0, this.SelectUserName.length - 2);
				} else {
					this.ReceiverNames = null;
					this.Receivers = null;
					this.SelectUserName = '选择信息接收用户';
				}
			}
		});
	}

	getTeamList() {
		const data = {
			State: 0
		};
		this.service.serviceR('ent/params/team/10101', data, (res: any) => {
			if (res.ResultCode === 0) {
				const key = 'Teams';
				this.Teams = res.Result[key];
				this.SelectTeams.setValue(this.Teams[0].TSeq);
			}
		});
	}

	goback() {
		this.router.navigate(['index/msgmgmt']);
	}

	userSave() {
		if (this.SelectRecvType.value === 0) {
			if (!this.Receivers) {
				this.snackBar.open('请选择收件人', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-warning'
				});
				return;
			}
		} else if (this.SelectRecvType.value === 1) {
			if (!this.SelectTeams.value) {
				this.snackBar.open('请选择收件部门', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-warning'
				});
				return;
			}
		}
		if (!this.msg) {
			this.snackBar.open('请输入消息', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-warning'
			});
			return;
		}
		const data: IAddList = {
			recvType: this.SelectRecvType.value,
			msg: this.msg,
			title: this.title,
			memo: this.memo,
			pics: this.imgsrcData,
			attach: this.docList
		};
		if (this.SelectRecvType.value === 0) {
			Reflect.set(data, 'receivers', this.Receivers);
		} else if (this.SelectRecvType.value === 1) {
			Reflect.set(data, 'team', this.SelectTeams.value);
		}
		console.log(data);
		this.service.serviceR('ent/user/addmsg', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('添加成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.router.navigate(['index/msgmgmt']);
			}
		});
	}
}
