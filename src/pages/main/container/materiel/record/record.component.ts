import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../service/service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserManyDialogComponent } from '../../component/dialog/userMany-dialog/userMany-dialog.component';
import buildData from '../../../../../environments/buildType';

@Component({
	selector: 'app-record',
	templateUrl: './record.component.html',
	styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
	buildData: any;
	crumbsList: any = [];
	showImgPopup = false;
	displayedColumns: any = ['time', 'state', 'number', 'unit', 'price', 'totalPrice', 'realTotalPrice', 'operatePerson', 'record']; // 列表要显示的项
	list = [];
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	imgList = [];
	materialItem = null; //

	constructor(
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '历史记录', open: false }
		];

		this.materialItem = JSON.parse(sessionStorage.getItem('materielItem'));

		this.getList();

		this.buildData = buildData;
		if (this.buildData.buildType !== '联排联调') {
			this.displayedColumns = ['time', 'state', 'number', 'unit', 'price', 'totalPrice', 'realTotalPrice', 'operatePerson', 'record', 'lookImg'];
		}
	}

	lookImg(el) {
		this.service.serviceR('ent/materialstock/6306', { MSSeq: el.Seq }, (res: any) => {
			if (res.ResultCode === 0) {
				this.imgList = res.Result.MaterialStocksImages;
				if (this.imgList.length > 0) {
					this.showImgPopup = true;
				} else {
					this.snackBar.open('没有图片', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-danger'
					});
					this.showImgPopup = false;
				}
			}
		});
	}

	goBack() {
		history.go(-1);
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	getList() {
		const data = {
			DSeq: this.materialItem.Seq,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};

		this.service.serviceR('ent/materialstock/6311', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.MaterialStocks;
			}
		});
	}
}
