import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	searchName: string;
	crumbsList: object;
	customer: any;
	setConfim: boolean;
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];
	paginatorTotal: number;
	activeChoose: number;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	displayedColumns: string[];
	List: object[];
	chooseDelete: any;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.crumbsList = [
			{ name: 'IOT管理', open: false, url: '' },
			//   { name: '智联网关', open: false, url: '' },
			{ name: 'IOT协议设置', open: false, url: '' }
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.setConfim = false;
		this.displayedColumns = ['DeviceNo', 'Protocol', 'SmartDevNo', 'ObjectId', 'Ip', 'Other'];
		this.List = null;
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.searchName = null;
	}

	ngOnInit() {
		if (localStorage.getItem('BemPageIndex')) {
			this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.getItem('BemPageSize')) {
			this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		this.getList();
		if (localStorage.getItem('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.getItem('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}

	getList() {
		const data = {
			Customer: this.customer,
			State: 0
		};
		if (this.searchName) {
			Reflect.set(data, 'CommonSearch', this.searchName);
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		} else {
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		}
		this.service.serviceR('ent/iot/gatewayprotocol/11811', data, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.GatewayProtocols);
				this.List = res.Result.GatewayProtocols;
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	gotoAdd() {
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/gatewayprotocol/add']);
	}

	gotoEdit(el: any) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/gatewayprotocol/edit']);
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
		this.router.navigate(['index/gatewayprotocol/info']);
	}

	// 控制confim模态框
	showConfim(data: number, state: number) {
		if (state === 1) {
			return;
		}
		this.chooseDelete = data;
		this.setConfim = !this.setConfim;
	}

	tableConfimResult(...data: boolean[]) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.service.serviceR('ent/iot/gatewayprotocol/11804', {
				Device: this.chooseDelete.DSeq,
				Protocol: this.chooseDelete.Protocol,
				ObjectId: this.chooseDelete.ObjectId
			}, (res: any) => {
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

