import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../service/service';
import { DownloadFile } from '../../../../common/utils/js/downloadfile';
import { UserManyDialogComponent } from '../../component/dialog/userMany-dialog/userMany-dialog.component';
import { ExcelUploadComponent } from '../../component/excelUpload/excelUpload.component';
import { ManyFileComponent } from '../../component/fileUpload/manyFile/manyFile.component';
import buildData from '../../../../../environments/buildType';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-materiel',
	templateUrl: './materiel.component.html',
	styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {
	buildData: any;
	imgsrcData = [];
	itemClassList = [];
	itemClassCheck = '';
	delSeq = ''; // 要删除的设备seq
	setConfim: boolean;
	surplus = ''; // 剩余量
	crumbsList: any = [];
	checkType = 0; // 类型
	displayedColumns: any = ['index', 'id', 'model', 'name', 'surplus', 'unit', 'Other']; // 列表要显示的项
	searchVal = ''; // 搜索值
	list = [];
	pageSizeOptions = [5, 10, 20];
	paginatorTotal = 10;
	pageIndex = 1;
	pageSize = 10;
	operateStock = ''; // 出入库弹窗类型
	checkList = null; // 选中的列
	operateStockData = { // 出入库提交的参数
		num: '', // 出入库数量
		price: '', // 入库金额
		actualPrice: '', // 真实基恩
		record: '', // 操作记录
		msgName: '', // 操作通知用户名称
		msgPersonList: [] // 操作通知用户列表
	};
	BuildingList  = [];
	buildingType: any;
	DeviceType = '';
	type = ''; // 物料页面类型

	@ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	constructor(
		public route: ActivatedRoute,
		public dialog: MatDialog,
		private service: Service,
		private snackBar: MatSnackBar,
		private router: Router
	) {
		this.buildingType = new FormControl('');
		route.data.subscribe(res => {
			res.type ? this.type = res.type : this.type = '';
		});
	}

	ngOnInit() {
		this.crumbsList = [
			{ name: '物料管理', open: false },
			{ name: '物料列表', open: false }
		];

		this.getList(false);
		this.getItemClassList();
		this.buildingList();

		this.buildData = buildData;
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList(false);
	}

	getItemClassList() {
		this.service.serviceR('ent/devicemodel/6111', { MainType: 6 }, (res: any) => {
			if (res.ResultCode === 0) {
				this.itemClassList = res.Result.DeviceModels;
			}
		});
	}

	//建筑物接口请求
	buildingList(){
		const data  = {
			FromCache: '',
			Buildings: '',
			Stat: '',
			Name: '',
		};
		// console.log(data)
		this.service.serviceR('ent/building/5001', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.BuildingList = res.Result.Buildings;
			}
		});
	}

	// 选中接收消息弹窗
	openMsgDialog() {
		const dialogRef = this.dialog.open(UserManyDialogComponent, {
			width: '1080px',
			data: {
				State: 0,
				title: '收件人'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				result = result[0].selected;
				this.operateStockData.msgPersonList = result;
				if (this.operateStockData.msgPersonList.length === 0) {
					this.operateStockData.msgName = '';
				} else {
					this.operateStockData.msgName = '';
					this.operateStockData.msgPersonList.forEach((item, index) => {
						index === 0 ? this.operateStockData.msgName += item.Name : this.operateStockData.msgName += ('，' + item.Name);
					});
				}
			}
		});
	}

	// 物料导出
	materielExpot() {
		new DownloadFile({ CommonSearch: this.searchVal, Stat: '0,1',	FileName: '八一水库' }, 'ent/material/6205').downloadfile();
	}

	// 列表
	getList(refresh) {
		if (refresh) {
			this.pageIndex = 1;
		}
    
		const data: any = {
			PageIndex: this.pageIndex,
			PageSize: this.pageSize,
			CommonSearch: this.searchVal,
			Stat: '0,1,3',
			Building: buildData.materielVal[this.type].Building
		};

		if (this.itemClassCheck) {
			data.Models = this.itemClassCheck;
		}
    console.log(data)
		this.service.serviceR('ent/material/6211', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.list = res.Result.Materials;
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	// 出入库操作
	operateStockFn() {
		if (!this.operateStockData.num) {
			this.snackBar.open('请输入数量', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		if (this.operateStockData.num > this.checkList.Quantity && this.operateStock !== 'enter') {
			this.snackBar.open('出库库存大于现有库存，请重新输入', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		const data: any = {
			Type: this.operateStock === 'enter' ? 0 : 1,
			DSeq: this.checkList.Seq,
			Quantity: this.operateStockData.num,
			// UnitPrice: this.operateStockData.price,
			// Price: this.operateStockData.actualPrice,
			Remark: this.operateStockData.record,
			Mobile: '',
			Useq: this.checkList.personSeq,
		};

		if (this.operateStockData.price) {
			data.UnitPrice = this.operateStockData.price;
		}

		if (this.operateStockData.actualPrice) {
			data.Price = this.operateStockData.actualPrice;
		}

		this.operateStockData.msgPersonList.forEach(item => {
			!data.Mobile ? data.Mobile += item.UserTel : data.Mobile += (',' + item.UserTel);
		});


		if (this.imgsrcData && this.imgsrcData.length > 0) {
			data.Pics = this.imgsrcData;
		}

		this.service.serviceR('ent/materialstock/6302', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('操作成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.operateStock = '';
				this.getList(true);
			}
		});
	}

	fileBoxChange() {
		this.excelUpload.fileBoxChange();
	}

	// 库存导出
	stockExport() {
		new DownloadFile({ DSeq: this.checkList.Seq }, 'ent/materialstock/6303').downloadfile();
	}

	checkListFn(list, type) {
		this.operateStockData = { // 出入库提交的参数
			num: '', // 出库数量
			price: '', // 入库金额
			actualPrice: '', // 真实价格
			record: '', // 操作记录
			msgName: '', // 操作通知用户名称
			msgPersonList: [] // 操作通知用户列表
		};

		this.imgsrcData = [];
		this.operateStock = type;
		let sysTime: any = new Date();
		sysTime = sysTime.getFullYear() + '-' + (sysTime.getMonth() + 1) + '-' + sysTime.getDate();
		list.sysTime = sysTime; // 出入库时间
		list.personName = JSON.parse(localStorage.getItem('bemUserInfo')).Name; // 出入库人
		list.personSeq = JSON.parse(localStorage.getItem('bemUserInfo')).UserInfo.userSeq; // 出入库人
		this.checkList = list;
	}

	del(type) {
		if (type) {
			this.setConfim = false;
			const data = {
				Dseq: this.delSeq,
				Stat: 2
			};
			this.service.serviceR('ent/material/6204', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.getList(true);
				}
			});
		} else {
			this.setConfim = false;
		}
	}

	goPage(type, el) {
		switch (type) {
			case 'add':
				console.log(this.type)
				if(this.type === 'material'){
					this.router.navigate(['index/' + 'bayi' + 'material/add'], {queryParams: {type: this.type}});
				}else{
					this.router.navigate(['index/' + this.type + 'material/add'], {queryParams: {type: this.type}});
				}
				break;
			case 'edit':
				sessionStorage.setItem('materielItem', JSON.stringify(el));
				this.router.navigate(['index/' + this.type + 'material/edit'], {queryParams: {type: this.type}});
				break;
			case 'record':
				sessionStorage.setItem('materielItem', JSON.stringify(el));
				this.router.navigate(['index/' + this.type + 'material/record']);
				break;
			case 'look':
				sessionStorage.setItem('materielItem', JSON.stringify(el));
				this.router.navigate(['index/' + this.type + 'material/look']);
				break;
		}
	}
}
