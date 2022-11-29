import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './request';
import { MatSnackBar } from '@angular/material';
import { RsaHelper } from '../common/utils/js/headers/reshelper';
import buildData from '../../environments/buildType';

@Injectable({
	providedIn: 'root'
})
export class Service {
	requestService: RequestService;
	constructor(
		requestService: RequestService,
		private router: Router,
		private snackBar: MatSnackBar,
	) {
		this.requestService = requestService;
	}

	serviceR(url: string, data: any, fn: any) {
		this.requestService.request(url, data)
			.subscribe(
				res => {
					if (buildData.buildType === '联排联调' && buildData.isProd) {
						res = JSON.stringify(res);
						res = res.replace(/https:\/\/water.wanlouyun.com:30443/g, 'http://192.168.199.10:30080');
						res = JSON.parse(res);
					}
					return fn(res);
				},
				error => {
					const err = JSON.parse(new RsaHelper().decryptRSA(error));
					if(err.Result.indexOf('SQLIntegrityConstraintViolationException')!== -1){
						this.snackBar.open('与列表内容重复', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-warning'
						});
						return;
					}
					if (err.Result === 'Date is wrong') {
						console.log('Date is wrong');
						this.snackBar.open('日期选择错误（年报表不超过今年/月报表不超过本月）', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-warning'
						});
						return;
					}
					if (err.Result === 'logintoken.expired') {
						localStorage.removeItem('LOGINSTATES');
						localStorage.removeItem('bemUserInfo');
						this.router.navigate(['/login']);
						this.snackBar.open('登录过期，请重新登录', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-warning'
						});
						return;
					}
					switch (err.ResultCode) {
						case 900: {
							this.snackBar.open('对不起，您没有本功能权限，请与管理员联系', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 999: {
							this.snackBar.open('系统错误，请联系管理员', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-warning'
							});
							break;
						}
						case 1008004: {
							this.snackBar.open('旧密码输入错误', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-info'
							});
							break;
						}
						case 1008005: {
							this.snackBar.open('新密码长度应填写6-12位', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-info'
							});
							break;
						}
						case 1008006: {
							this.snackBar.open('旧密码输入错误', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-info'
							});
							break;
						}
						case 4602002: {
							this.snackBar.open('登录名已存在，请重新确认', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 4602004: {
							this.snackBar.open('手机号已存在，请重新确认', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 4603004: {
							this.snackBar.open('手机号码已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 5102001: {
							this.snackBar.open('园群名称已存在，请勿重复添加', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 5004001: case 6004002: case 10603001: case 10604002: case 10703001: {
							this.snackBar.open('您无此权限操作', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 6002002: {
							this.snackBar.open('设备编号已存在，请确认后修改', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 10102002: {
							this.snackBar.open('部门名称已存在，请重新输入', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 8002001: {
							this.snackBar.open('该设备已派单，请勿重复派单', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 8102001: case 8103002: case 8302007: case 8303007: {
							this.snackBar.open('条目不能为空', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 8103003: case 8102002: case 8302008: case 8303008: {
							this.snackBar.open('反馈条目不能为空', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002015: {
							this.snackBar.open('规则名称重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002018: {
							this.snackBar.open('此时间段已经排班', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14003014: {
							this.snackBar.open('此日期已经排班', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002013: {
							this.snackBar.open('排班天数超过生效时间范围', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002016: {
							this.snackBar.open('班次重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002008: {
							this.snackBar.open('未添加班次', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002009: {
							this.snackBar.open('未添加人员', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002010: {
							this.snackBar.open('不能选择今日之前的日期', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 14002019: {
							this.snackBar.open('未选择主班人员', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 3007001: {
							this.snackBar.open('请输入企业名称', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 3007002: {
							this.snackBar.open('电话号码已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 3007003: {
							this.snackBar.open('企业名称已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 13002007: {
							this.snackBar.open('班次名称已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 6102003: {
							this.snackBar.open('型号已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 6202003: {
							this.snackBar.open('物料名称已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 18002006: {
							this.snackBar.open('运维名称重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 18003005: {
							this.snackBar.open('运维名称重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 17002004: {
							this.snackBar.open('运维名称重复', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						case 6202004: {
							this.snackBar.open('物料编号已存在', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							break;
						}
						default: {
							this.snackBar.open('系统错误，请确认后重新尝试', '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: 'snack-bar-color-danger'
							});
							// return fn(err);
							break;
						}
					}
				}
			);
	}
	serviceReport(method: string, url: string, data: any, fn: any) {
		if(method == 'get'){
			this.requestService.requestReport(url, data)
			.subscribe(
				res => {
					// if (buildData.buildType === '联排联调' && buildData.isProd) {
					// 	res = JSON.stringify(res);
					// 	res = res.replace(/https:\/\/water.wanlouyun.com:30443/g, 'http://192.168.199.10:30080');
					// 	res = JSON.parse(res);
					// }
					return fn(res);
				},
				error => {
				  console.log()
				}
			);
		}else{
			this.requestService.requestReportPost(url, data)
			.subscribe(
				res => {
					return fn(res);
				},
				error => {
				  console.log()
				}
			);
		}
		 
	}
}
