import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import buildData from '../../../../environments/buildType';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolsComponent {
	welcomeInfo: string;
	meunState: boolean;
	@Output() meunSwitch = new EventEmitter<boolean>();
	setConfim: boolean;
	confimTitle: string;
	buildData: any;
	constructor(
		private router: Router
	) {
		this.welcomeInfo = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Name;
		// this.welcomeInfo = '东南水厂运维智慧云平台';
		this.meunState = true;
		this.setConfim = false;
		this.confimTitle = '确认退出？';

		this.buildData = buildData;
	}

	switchMeun() {
		this.meunState = !this.meunState;
		this.meunSwitch.emit(this.meunState);
	}
	goPage(url, newWindow) {
		if (newWindow) {
			let domain = 'http://www.bemcn.com.cn:8001/';
			if (buildData.buildType === '联排联调') {
				if (buildData.isProd) { // 正式
					domain = 'http://192.168.199.11:8001/';
				} else { // 测试
					domain = 'http://www.bemcn.com.cn:8001/';
				}
			} else if (buildData.buildType === '东南水厂') {
				if (buildData.isProd) { // 正式
					domain = 'http://168.1.7.64:8005/';
				} else { // 测试
					domain = 'http://www.bemcn.com.cn:8005/';
				}
			}

			window.open(domain + url, '_blank');

		} else {
			// vr地址http://www.bemcn.com.cn:10001/
			this.router.navigate(['index/thirdPartyUrl'], { queryParams: { src: url ? url : 'http://www.bemcn.com.cn:10001/' } });
		}
	}

	gotoDiagonDevice() {
		this.router.navigate(['index/diagalert']);
	}
	gotoMsg() {
		this.router.navigate(['index/msgmgmt']);
	}
	// gotoAgreement() {
	//   this.router.navigate(['index/agreement']);
	// }
	// 退出平台帐号
	exit() {
		// console.log('exit system');
		let t: string;
		let n: string;
		if (localStorage.hasOwnProperty('LPLDUSERNAME')) {
			// localStorage.setItem('LPLDUSERNAME', this.lpldUserName);
			t = 'lpld';
			n = localStorage.getItem('LPLDUSERNAME');
		}
		localStorage.removeItem('LOGINSTATES');
		localStorage.removeItem('bemUserInfo');
		if (t) {
			this.router.navigate(['login']);
			// this.router.navigate(['login', { type: t, username: n }]);
		} else {
			this.router.navigate(['login']);
		}
	}

	// 控制confim模态框
	showConfim() {
		this.setConfim = !this.setConfim;
	}

	tableConfimResult(...data: boolean[]) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.exit();
		}
	}
}
