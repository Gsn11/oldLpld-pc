import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { Service } from '../../../../../../service/service';
import { ExcelUploadComponent } from '../../../../component/excelUpload/excelUpload.component';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
	searchName: string;
	crumbsList: object;
	setConfim: boolean;
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];
	paginatorTotal: number;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	@ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
	displayedColumns: string[];
	list: any;
	chooseDeleteSeq: number;
	@ViewChild(ModalComponent, null) modal: ModalComponent;
	constructor(
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.crumbsList = [
			{ name: 'IOT管理', open: false },
			{ name: '监测管理（度量单位）', open: false }
		];
		this.setConfim = false;
		this.displayedColumns = ['MCode', 'MDesc', 'State', 'CustomerName', 'Other'];
		this.list = null;
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.searchName = null;
	}
	ngOnInit() {
		this.getList();
	}
	getList() {
		const data = {
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
		this.service.serviceR('ent/params/metrics/11011', data, (res: any) => {
			if (res.ResultCode === 0) {
				const key = 'Metrics';
				this.list = res.Result[key];
				this.paginatorTotal = res.Result.Total;
			}
		});
	}
	gotoAdd() {
		console.log(this.modal);
		this.modal.type = 'add';
		this.modal.switchModalBox();
	}
	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}
	// 控制confim模态框
	showConfim(seq: number) {
		this.chooseDeleteSeq = seq;
		this.setConfim = !this.setConfim;
	}
	gotoEdit(el: any) {
		if (el.MCode) {
			this.modal.type = 'edit';
			this.modal.MCode.setValue(el.MCode);
			this.modal.MDesc.setValue(el.MDesc);
			this.modal.oldMCode = el.MCode;
		}
		this.modal.switchModalBox();
	}
	tableConfimResult(...data: boolean[]) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.service.serviceR('ent/params/metrics/11004', { MCodes: this.chooseDeleteSeq }, (res: any) => {
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

	fileBoxChange() {
		this.excelUpload.fileBoxChange();
	}
}

