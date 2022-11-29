import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Title } from '@angular/platform-browser';
import { RsaHelper } from '../../common/utils/js/headers/reshelper';
import buildData from 'src/environments/buildType';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [LoginService],
})
export class LoginComponent implements OnInit {
	userNameIsSave: boolean;  // 是否保存用户名 wly
	UserNameIsSaveLPLD: boolean; // 是否保存用户名 lpld
	lpldUserName: string;
	lpldUserPwd: string;
	LpldData: string;
	LpldHeader: string;
	userName: any;  // 用户名
	userPwd: any;   // 用户密码
	userCode: any = 1;  // 验证码
	userCID: any = 1;   // 企业ID
	codeImg: string;    // 验证码默认图片
	codeToken: string; // 请求缓存中的codetoken信息
	isError: boolean;
	errorMsg: string;
	loginType: string;
	buildData = buildData;
	constructor(
		private loginService: LoginService,
		private router: Router,
		private route: ActivatedRoute,
		private titleSerivce: Title
	) {
		this.errorMsg = null;
		this.UserNameIsSaveLPLD = true;
	}

	ngOnInit() {

		this.route.params
			.subscribe((params: any) => {
				// this.loginType = location.port;
				console.log(params);
				console.log(location);
				console.log(this.loginType);
				// if (params.type === 'lpld') {
				if (location.hostname === '192.168.199.10' && params.type !== 'lpld') {
					this.titleSerivce.setTitle('福州市联排联调');
					this.loginType = 'lpld';
					console.log('显示');
					this.userName = new FormControl('', Validators.required);
					this.userPwd = new FormControl('', Validators.required);
					this.userCode = new FormControl('', Validators.required);
					this.userCID = new FormControl('', Validators.required);
					this.userCode.setValue('1');
					this.userCID.setValue('lpld');
				} else if (location.port === '11181' && params.type !== 'lpld') {
					this.titleSerivce.setTitle('福州市联排联调');
					this.loginType = 'lpld';
					console.log('显示');
					this.userName = new FormControl('', Validators.required);
					this.userPwd = new FormControl('', Validators.required);
					this.userCode = new FormControl('', Validators.required);
					this.userCID = new FormControl('', Validators.required);
					this.userCode.setValue('1');
					this.userCID.setValue('lpld');
				} else if (location.port === '40081' && params.type !== 'dnsc') {
					this.titleSerivce.setTitle('福州市联排联调');
					this.loginType = 'dnsc';
					console.log('buxianshi');
					this.userName = new FormControl('', Validators.required);
					this.userPwd = new FormControl('', Validators.required);
					this.userCode = new FormControl('', Validators.required);
					this.userCID = new FormControl('', Validators.required);
					this.userCode.setValue('1');
					this.userCID.setValue('lpld');
					// } else if (location.port === '4200') {
				} else if (params.type === 'lpld') {
					// this.loginType = params.type;
					// this.lpldUserName = params.username;
					// const code = unescape(params.userpwd);
					// const lpldD = unescape(params.data);
					// this.LpldData = unescape(params.data);
					// this.LpldHeader = this.recode(unescape(params.header));
					// this.LpldData = this.recode(unescape(params.data));
					// console.log(this.LpldHeader);
					// console.log('body: ' + this.LpldData);
					// if (!localStorage.hasOwnProperty('LPLDUSERNAME')) {
					// 	localStorage.setItem('LPLDUSERNAME', this.lpldUserName);
					// 	this.UserNameIsSaveLPLD = false;
					// } else {
					// 	this.UserNameIsSaveLPLD = true;
					// }
					// this.lpldLogin();
					this.titleSerivce.setTitle('福州市联排联调');
					this.loginType = 'lpld';
					console.log('显示');
					this.userName = new FormControl('', Validators.required);
					this.userPwd = new FormControl('', Validators.required);
					this.userCode = new FormControl('', Validators.required);
					this.userCID = new FormControl('', Validators.required);
					this.userCode.setValue('1');
					this.userCID.setValue('lpld');
				} else if (params.type === 'dnsc') {
					this.titleSerivce.setTitle('东南水厂');
					this.loginType = params.type;
					this.lpldUserName = params.username;
					const code = unescape(params.userpwd);
					const lpldD = unescape(params.data);
					this.LpldData = unescape(params.data);
					this.LpldHeader = this.recode(unescape(params.header));
					this.LpldData = this.recode(unescape(params.data));
					// console.log(this.LpldHeader);
					// console.log('body: ' + this.LpldData);
					if (!localStorage.hasOwnProperty('LPLDUSERNAME')) {
						localStorage.setItem('LPLDUSERNAME', this.lpldUserName);
						this.UserNameIsSaveLPLD = false;
					} else {
						this.UserNameIsSaveLPLD = true;
					}
					this.lpldLogin();
				} else {
					// this.titleSerivce.setTitle('万楼云管理平台');
					// // this.titleSerivce.setTitle('福州市联排联调');
					// this.loginType = 'wly';
					// this.userName = new FormControl('', Validators.required);
					// this.userPwd = new FormControl('', Validators.required);
					// this.userCode = new FormControl('', Validators.required);
					// this.userCID = new FormControl('', Validators.required);
					// this.userNameIsSave = false;
					// this.codeImg = '';
					// // 判断是否曾有存储过用户名，是则获取
					// if (localStorage.getItem('USERNAME')) {
					// 	this.userName.setValue(localStorage.getItem('USERNAME'));
					// 	this.userNameIsSave = true;
					// }
					// // 启动获取验证码
					// this.getCodeImg();
					// this.isError = false;
					this.titleSerivce.setTitle('福州市联排联调');
					this.loginType = 'lpld';
					console.log('显示');
					this.userName = new FormControl('', Validators.required);
					this.userPwd = new FormControl('', Validators.required);
					this.userCode = new FormControl('', Validators.required);
					this.userCID = new FormControl('', Validators.required);
					this.userCode.setValue('1');
					this.userCID.setValue('lpld');
				}
			});

		this.buildData.buildType === '东南水厂' ? this.userCode.setValue('1') : this.userCode = this.userCode;
		this.buildData.buildType === '东南水厂' ? this.userCID.setValue('dnsc') : this.userCID = this.userCID;
	}
	/**
	 * 检测各项是否输入
	 * 输入成功后进入登录接口
	 * 服务输送数据：
	 * {
	 *  loginId: string   用户名
	 *  CustomerId: string   企业ID
	 *  Pwd: string  用户密码
	 *  ImgToken: string  验证码
	 *  NeedMenu: boolean  是否需要菜单
	 * }
	 */
	gotoPlant(): void {
		this.isError = false;
		if (this.userName.errors) {
			this.userName.markAsTouched({
				onlySelf: false
			});
			return;
		}

		if (this.userPwd.errors) {
			this.userPwd.markAsTouched({
				onlySelf: false
			});
			return;
		}

		if (this.userCID.errors) {
			this.userCID.markAsTouched({
				onlySelf: false
			});
			return;
		}

		if (this.userCode.errors) {
			this.userCode.markAsTouched({
				onlySelf: false
			});
			return;
		}
		const loginData = {
			LoginId: this.userName.value,
			CustomerId: this.userCID.value,
			Pwd: this.userPwd.value,
			ImgToken: this.userCode.value,
			NeedMenu: true
		};
		console.log(loginData);
		this.loginService.checkLogin(loginData, this.codeToken)
			.subscribe(
				(res: any) => {
					console.log(res);
					if (res.ResultCode === 0) {
						const tempResult = res.Result;
						// 用户信息存储
						const Customer = {
							Addr: res.Result.Customer.addr,
							Avatar: res.Result.Customer.avatar,
							BdLat: res.Result.Customer.bdLat,
							BdLng: res.Result.Customer.bdLng,
							Createtime: res.Result.Customer.createtime,
							GdLat: res.Result.Customer.gdLat,
							GdLng: res.Result.Customer.gdLng,
							Id: res.Result.Customer.id,
							IsPub: res.Result.Customer.isPub,
							Name: res.Result.Customer.name,
							Seq: res.Result.Customer.seq,
							State: res.Result.Customer.state,
							Tel: res.Result.Customer.tel,
							Types: res.Result.Customer.types,
							Updatetime: res.Result.Customer.updatetime,
							UserCreating: res.Result.Customer.userCreating,
						};
						Reflect.set(tempResult, 'Customer', Customer);
						localStorage.setItem('bemUserInfo', JSON.stringify(tempResult));
						this.router.navigate(['index/home'])
							.then(() => {
								// 记录用户登录成功状态
								if (!localStorage.getItem('LOGINSTATES')) {
									localStorage.setItem('LOGINSTATES', 'islogin');
								}
								// 存储用户名
								this.userNameIsSave === true ? localStorage.setItem('USERNAME', this.userName.value) : localStorage.removeItem('USERNAME');
								// 存储LPLD用户名
								if (this.loginType === 'lpld') {
									localStorage.setItem('LPLDUSERNAME', this.lpldUserName);
								} else {
									localStorage.removeItem('LPLDUSERNAME');
								}
							});
					} else {
						console.log('network is bad!');
					}
				},
				(error: any) => {
					console.log(error);
					const err = JSON.parse(new RsaHelper().decryptRSA(error.error));
					switch (err.ResultCode) {
						case -3: {
							this.errorMsg = '验证码错误！';
							break;
						}
						case 0: {
							this.errorMsg = '验证码已失效，请重新获取验证码！';
							break;
						}
						case 1914: {
							this.errorMsg = '密码输入错误！';
							break;
						}
						case 1915: {
							this.errorMsg = '用户名或企业ID输入错误！';
							break;
						}
						case 1916: {
							this.errorMsg = '您被禁止访问，请联系管理员！';
							break;
						}
						case 1917: {
							this.errorMsg = '您被禁止访问，请联系管理员！';
							break;
						}
						default: {
							this.errorMsg = '输入错误，请重新确认！';
							break;
						}
					}
					this.isError = true;
					throw error;
				}
			);
	}

	hiddenErrorBox() {
		this.isError = false;
	}

	getUserNameErrorMessage() {
		return this.userName.hasError('required') ? '请输入用户名' : '';
	}
	getUserPwdErrorMessage() {
		return this.userPwd.hasError('required') ? '请输入密码' : '';
	}
	getUserCIDErrorMessage() {
		return this.userCID.hasError('required') ? '请输入企业ID' : '';
	}
	// userCodeKeyUp() {
	//   this.userCodeError = false;
	// }
	getUserCodeErrorMessage() {
		return this.userCode.hasError('required') ? '请输入验证码' : '';
	}
	// 请求验证码
	getCodeImg() {
		this.loginService.getCodeImg(null)
			.subscribe(
				(res: any) => {
					if (res.ResultCode === 0) {
						this.codeToken = res.Result.ImgTokenListName;
						this.codeImg = 'data:image/jpeg;base64,' + res.Result.TokenImg;
					}
				},
				(error: any) => {
					throw error;
				}
			);
	}

	goWlyIntroducePage() {
		this.router.navigate(['']);
	}

	gotoRegsiter() {
		this.router.navigate(['regsiter']);
	}

	recode(code: string): string {
		if (code !== 'undefined') {
			let c = String.fromCharCode(code.charCodeAt(0) - code.length);
			for (let i = 1; i < code.length; i++) {
				c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
			}
			return c;
		}
	}

	/**
	 * LPLD 登陆需要通过URL 获取header, body 做GET 请求
	 * header，body 都是经过LPLD 项目加密过的数据传输过来，直接开发service 接口单项使用
	 */
	lpldLogin() {
		this.loginService.lpldCheckLogin(this.LpldHeader, this.LpldData)
			.subscribe((res: any) => {
				console.log(res);
				if (res.ResultCode === 0) {
					const tempResult = res.Result;
					// 用户信息存储
					const Customer = {
						Addr: res.Result.Customer.addr,
						Avatar: res.Result.Customer.avatar,
						BdLat: res.Result.Customer.bdLat,
						BdLng: res.Result.Customer.bdLng,
						Createtime: res.Result.Customer.createtime,
						GdLat: res.Result.Customer.gdLat,
						GdLng: res.Result.Customer.gdLng,
						Id: res.Result.Customer.id,
						IsPub: res.Result.Customer.isPub,
						Name: res.Result.Customer.name,
						Seq: res.Result.Customer.seq,
						State: res.Result.Customer.state,
						Tel: res.Result.Customer.tel,
						Types: res.Result.Customer.types,
						Updatetime: res.Result.Customer.updatetime,
						UserCreating: res.Result.Customer.userCreating,
					};
					Reflect.set(tempResult, 'Customer', Customer);
					localStorage.setItem('bemUserInfo', JSON.stringify(tempResult));
					this.router.navigate(['index/home'])
						.then(() => {
							// 记录用户登录成功状态
							if (!localStorage.getItem('LOGINSTATES')) {
								localStorage.setItem('LOGINSTATES', 'islogin');
							}
							// 存储用户名
							this.userNameIsSave === true ? localStorage.setItem('USERNAME', this.userName.value) : localStorage.removeItem('USERNAME');
							// 存储LPLD用户名
							localStorage.setItem('LPLDUSERNAME', this.lpldUserName);
						});
				} else {
					console.log('network is bad!');
				}
			}, (error: any) => {
				console.log(error);
				console.log('System error,This is not \'lpld\' system,Please delete cookies,Try again!');
				this.errorMsg = '信息不存在，请重新与管理员确认！';
				this.isError = true;
			});
	}
}
