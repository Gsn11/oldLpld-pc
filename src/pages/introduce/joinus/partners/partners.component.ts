import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPartnersInterface } from './regsiter.interface';
import { Service } from '../../../service/service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-partners',
	templateUrl: './partners.component.html',
	styleUrls: ['./partners.component.scss'],
	providers: [Service]
})
export class PartnersComponent {
	Name: string;
	Addr: string;
	LegalPerson: string;
	Tel: string;
	show: boolean;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar
	) {
		this.Tel = null;
		this.show = true;
	}

	goWlyPlantPage() {
		this.router.navigate(['home']);
	}

	showJoinMode() {
		this.show = false;
	}

	closeMode() {
		this.show = !this.show;
	}

	register() {
		const regsiterData: IPartnersInterface = {
			Name: this.Name,
			Addr: this.Addr,
			Tel: parseInt(this.Tel, null),
			LegalPerson: this.LegalPerson,
			LoginId: this.Tel
		};

		if (!regsiterData.Name) {
			this.snackBar.open('请输入企业名称', '确认', {
				duration: 3000,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			return false;
		}

		if (!regsiterData.Addr) {
			this.snackBar.open('请输入地址', '确认', {
				duration: 3000,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			return false;
		}

		if (!regsiterData.LegalPerson) {
			this.snackBar.open('请输入联系人', '确认', {
				duration: 3000,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			return false;
		}

		if (!regsiterData.Tel) {
			this.snackBar.open('请输入电话号码', '确认', {
				duration: 3000,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			return false;
		}

		this.service.serviceR('customer/register', regsiterData, (res: any) => {
			if (res.ResultCode === 0) {
				this.show = !this.show;
				this.snackBar.open('提交成功，我们会尽快处理，请耐心等待', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			} else if (res.ResultCode === 3007001) {
				this.show = !this.show;
				this.snackBar.open('请输入企业名称', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			} else if (res.ResultCode === 3007002) {
				this.show = !this.show;
				this.snackBar.open('电话号码已存在', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			} else if (res.ResultCode === 3007003) {
				this.show = !this.show;
				this.snackBar.open('企业名称已存在', '确认', {
					duration: 3000,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
			}
		});
	}
}
