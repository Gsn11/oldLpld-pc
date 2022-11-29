import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../service/service';
import { FormControl } from '@angular/forms';
import { UserManyDialogComponent } from '../../component/dialog/userMany-dialog/userMany-dialog.component';
import buildData from '../../../../../environments/buildType';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditMaterielComponent implements OnInit {
	crumbsList = [
		{ name: '物料管理', open: false },
		{ name: '出入库明细', open: false }
	];
	buildData = buildData;

	inOutList = [{name: '出库'}, {name: '入库'}];

	name = '';
	inOut: any = new FormControl();
	num: any;
	unitPrice: any;
	price: any;
	remark: any;
	imgsrcData = [];
	imgsrcDataOld = [];
	seq: any;

	constructor(
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
	}

	ngOnInit() {
		const materielDetailItem = JSON.parse(sessionStorage.getItem('materielDetailItem'));
		this.inOut.setValue(materielDetailItem.TypeName);
		this.name = materielDetailItem.MaterialName;
		this.num = materielDetailItem.Quantity;
		this.unitPrice = materielDetailItem.UnitPrice;
		this.price = materielDetailItem.Price;
		this.remark = materielDetailItem.Remark;
		this.seq = materielDetailItem.Seq;
		console.log(materielDetailItem);

		this.queryImg();
	}

	goBack() {
		history.go(-1);
	}

	queryImg() {
		this.service.serviceR('ent/materialstock/6306', {MSSeq: this.seq}, (res: any) => {
			if (res.ResultCode === 0) {
				this.imgsrcData = [...res.Result.MaterialStocksImages];
				this.imgsrcDataOld = [...res.Result.MaterialStocksImages];
			}
		});
	}

	// 编辑
	editDetail() {
		// ent/materialstock/6305
		const data: any = {
			Seq: this.seq,
			Quantity: this.num,
			Type: this.inOut.value === '入库' ? 0 : 1,
			UnitPrice: this.unitPrice,
			Price: this.price,
			Remark: this.remark
		};

		if (this.imgsrcData && this.imgsrcData.length > 0) {
			data.Pics = this.imgsrcData;
			data.OldPics = this.imgsrcDataOld;
		}

		this.service.serviceR('ent/materialstock/6305', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('修改成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				history.go(-1);
			}
		});
	}
}
