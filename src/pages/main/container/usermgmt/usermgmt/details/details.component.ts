import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IDetailsList } from './iDetails.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Service } from '../../../../../service/service';
import { ServicezoomComponent } from '../component/servicezoom/servicezoom.component';
import { UserDialogComponent } from '../../../component/dialog/user-dialog/user-dialog.component';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	providers: [Service]
})
export class DetailsComponent implements OnInit {
	userInfo: any;
	crumbsList: object;
	stateList: object;
	imgsrcData: object[] = [];
	bemInfoData: any;
	LoginId: string;
	Name: string;
	Email: string;
	Tel: string;
	SelectSex: any;
	Sex: any;
	adminChecked: boolean;
	wkChecked: boolean;
	OldJobs: any;
	SelectRole: any;
	Role: any;
	userJob: any;
	SelectBusiDomains: any;
	BusiDomains: any;
	ServiceZone: string;
	regionChooseList: any;
	ResponseTime: number;
	Subjections: any;
	SelectSubjections: any;
	pageType: string;
	UserRoles: any;
	emergencyContact: any;
	emergencyTel: any;
	@ViewChild(ServicezoomComponent, { static: true }) ServiceItem: ServicezoomComponent;
	ChooseUserName = '请选择上级领导';
	ChooseUserSeq: any = null;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private dialog: MatDialog
	) {
		route.data
			.subscribe(
				(res: any) => {
					this.pageType = res.type;
				}
			);
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.bemInfoData = JSON.parse(localStorage.getItem('bemInfoData'));
		let n: string;
		if (this.pageType === 'edit') {
			n = '修改';
		} else {
			n = '新增';
		}
		this.crumbsList = [
			{ name: '用户权限', open: false, url: '' },
			{ name: '用户设置', open: true, url: 'usermgmt' },
			{ name: n, open: false, url: '' }
		];
		this.LoginId = '';
		this.Name = '';
		this.Email = '';
		this.Tel = '';
		this.adminChecked = false;
		this.wkChecked = false;
		this.SelectSex = new FormControl();
		this.Sex = [
			{ state: '1', name: '男' },
			{ state: '0', name: '女' }
		];
		this.SelectRole = new FormControl();
		this.SelectBusiDomains = new FormControl();
		this.userJob = [];
		this.ServiceZone = '';
		this.regionChooseList = [];
		this.ResponseTime = null;
		this.Subjections = [];
		this.SelectSubjections = new FormControl('');
	}

	ngOnInit() {
		if (this.pageType === 'edit') {
			console.log(this.bemInfoData.ParentLoginId)
			if (this.bemInfoData.LoginId) {
				this.LoginId = this.bemInfoData.LoginId;
			}
			this.Name = this.bemInfoData.Name;
			this.Email = this.bemInfoData.UserEmail ? this.bemInfoData.UserEmail : '';
			this.Tel = this.bemInfoData.UserTel;
			this.adminChecked = this.bemInfoData.IsAdmin;
			this.wkChecked = this.bemInfoData.IsEngineer;
			this.SelectSex.setValue(this.bemInfoData.Sex.toString());
			this.ResponseTime = this.bemInfoData.ResponseTime ? this.bemInfoData.ResponseTime : null;
			this.ChooseUserName = this.bemInfoData.ParentLoginId && this.bemInfoData.ParentName ? `${this.bemInfoData.ParentLoginId} - ${this.bemInfoData.ParentName}` : '请选择上级领导';
			this.ChooseUserSeq = this.bemInfoData.ParentSeq || null;

			this.SelectSubjections = new FormControl({
				value: this.bemInfoData.Subjection.split(',').map(Number),
				disabled: false
			});
			// console.log(this.bemInfoData.Subjection);
			if (this.bemInfoData.Domain) {
				const domains = this.bemInfoData.Domain.split(',');
				for (let i = 0; i < domains.length; i++) {
					domains[i] = parseInt(domains[i], null);
				}
				this.SelectBusiDomains.setValue(domains);
			}
			const selfData = {
				State: 0,
				USeq: this.bemInfoData.Seq
			};
			this.service.serviceR('user/1006', selfData, (res: any) => {
				if (res.ResultCode === 0) {
					this.userJob = res.Result.UserTeamJobs;
					this.OldJobs = Array.from(this.userJob);
				}
			});
			this.service.serviceR('ent/cususer/4007', selfData, (res: any) => {
				if (res.ResultCode === 0) {
					this.UserRoles = res.Result.CustomerUserRoles;
					const temp = [];
					for (const r of this.UserRoles) {
						temp.push(r.RoleSeq);
					}
					this.SelectRole.setValue(temp);
				}
			});
		}
		const data = {
			State: 0,
		};
		this.service.serviceR('ent/role/2101', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.Role = res.Result;
			}
		});
		this.service.serviceR('ent/params/subsys/10911', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.BusiDomains = res.Result.SubSystems;
			}
		});
		this.service.serviceR('ent/subjection/3811', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.Subjections = res.Result.Subjections;
			}
		});
	}

	goback() {
		this.router.navigate(['index/usermgmt']);
	}

	adminToggleChange() {
		this.adminChecked = !this.adminChecked;
	}

	wkToggleChange() {
		this.wkChecked = !this.wkChecked;
		if (this.wkChecked === false) {
			this.SelectBusiDomains.setValue('');
			this.regionChooseList = null;
		}
	}

	openUserModelDialog() {
		const data = {
			State: 0,
			title: '上级领导选择'
		};
		const dialogRef = this.dialog.open(UserDialogComponent, {
			width: '1080px',
			data: { ...data }
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
			if (result) {
				const ids = []; const names = [];
				for ( const i of result) {
					ids.push(i.Seq);
					names.push(i.Name);
			  }
				this.ChooseUserSeq = ids.join();
				this.ChooseUserName = names.join();
				// this.ChooseUserName = `${result.LoginId} - ${result.Name} - ${result.UserTel}`;
			} else {
				this.ChooseUserSeq = '';
				this.ChooseUserName = '请选择上级领导';
			}
		});
	}

	userSave() {
		// console.log(41231);
		if (this.LoginId === '') {
			this.snackBar.open('请输入登录名', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.Name === '') {
			this.snackBar.open('请输入姓名', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.Tel === '') {
			this.snackBar.open('请输入手机号码', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.Tel.length < 11) {
			this.snackBar.open('请输入正确的手机号码', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.ServiceItem) {
			let num = 0;
			while (num < this.ServiceItem.regionChooseList.length) {
				this.ServiceZone = this.ServiceZone + this.ServiceItem.regionChooseList[num].code + ',';
				num++;
			}
			this.ServiceZone = this.ServiceZone.substr(0, this.ServiceZone.length - 1);
		}
		let role = '';
		if (this.SelectRole.value) {
			for (const s of this.SelectRole.value) {
				role = role + s + ',';
			}
			role = role.substr(0, role.length - 1);
		}
		let domains = '';
		if (this.SelectBusiDomains.value) {
			for (const s of this.SelectBusiDomains.value) {
				domains = domains + s + ',';
			}
			domains = domains.substr(0, domains.length - 1);
		}
		const data: IDetailsList = {
			Customer: this.userInfo.Customer.Seq,
			LoginId: this.LoginId,
			Email: this.Email,
			Name: this.Name,
			IsPub: 0,
			ResponseTime: this.ResponseTime,
			State: '0',
			Tel: this.Tel,
			Domain: domains,
			Subjection: this.SelectSubjections.value ? this.SelectSubjections.value.toString() : '',
			ParentSeq: this.ChooseUserSeq,
			EmergencyContact: this.emergencyContact,
			EmergencyContactTelephone: this.emergencyTel,
		};
		if (this.adminChecked === false) {
			Reflect.set(data, 'IsAdmin', 0);
		} else {
			Reflect.set(data, 'IsAdmin', 1);
		}
		if (this.wkChecked === false) {
			Reflect.set(data, 'IsEngineer', 0);
		} else {
			Reflect.set(data, 'IsEngineer', 1);
		}
		if (this.userJob.length !== 0) {
			Reflect.set(data, 'Jobs', this.userJob);
		}
		if (role) {
			Reflect.set(data, 'Roles', role);
		}
		if (this.ServiceZone) {
			Reflect.set(data, 'ServiceZone', this.ServiceZone);
		}
		if (this.SelectSex.value) {
			Reflect.set(data, 'Sex', this.SelectSex.value);
		} else {
			Reflect.set(data, 'Sex', '1');
		}
		let str: string;
		let link: string;
		if (this.pageType === 'edit') {
			Reflect.set(data, 'USeq', this.bemInfoData.Seq);
			if (this.OldJobs && this.OldJobs.length !== 0) {
				Reflect.set(data, 'OldJobs', this.OldJobs);
			}
			str = '修改成功';
			link = 'ent/cususer/4103';
		} else {
			str = '添加成功';
			link = 'ent/cususer/4102';
		}
		this.service.serviceR(link, data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open(str, '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.router.navigate(['index/usermgmt']);
			}
		});
	}
}
