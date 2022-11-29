import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../service/service';
import { ManyFileComponent } from '../../component/fileUpload/manyFile/manyFile.component';
import buildData from '../../../../../environments/buildType';

@Component({
	selector: 'app-look',
	templateUrl: './look.component.html',
	styleUrls: ['./look.component.scss']
})
export class LookMaterielComponent implements OnInit {
	buildData: any;
	crumbsList: any = [];
	checkType = 0; // 类型
	displayedColumns: any = ['index', 'id', 'model', 'name', 'surplus', 'unit', 'Other']; // 列表要显示的项
	searchVal = ''; // 搜索值
	//
	list = [];
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	// 设备型号
	SelectDeviceModel = null;
	DeviceModelName = '';
	// 建筑物
	buildItem = null;
	buildName = '';
	// 文件
	imgsrcData = [];
	docListData = [];
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	// 消息推送
	msgName = '';
	msgPersonList = [];
	//
	materielItem = null;

	constructor(
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
	}

	ngOnInit() {
		this.buildData = buildData;
		this.materielItem = JSON.parse(sessionStorage.getItem('materielItem'));

		if (this.materielItem.Avatar) {
			this.materielItem.Avatar = [{ ImgUrl: this.materielItem.Avatar }];
		} else {
			this.materielItem.Avatar = [];
		}

		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '物料查看', open: false }
		];

		this.getList();
	}

	// 分页修改时响应方法
	// change(event: any) {
	//     this.pageIndex = event.pageIndex + 1;
	//     this.pageSize = event.pageSize;
	//     this.getList();
	// }

	goBack() {
		history.go(-1);
	}

	getList() {
		const data = {
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
			CommonSearch: this.searchVal
		};

		this.service.serviceR('ent/material/6211', { null: null }, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.Materials;
			}
		});
	}
}
