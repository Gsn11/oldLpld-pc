import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Service } from '../../../../../service/service';
import { BrandDialogComponent } from '../../../component/dialog/brand-dialog/brand-dialog.component';
import { UserManyDialogComponent } from '../../../component/dialog/userMany-dialog/userMany-dialog.component';
import buildData from '../../../../../../environments/buildType';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	buildData: any;
	code: any;
	customer: any;
	nowItemName: string;
	isLastChoose: boolean;
	allSwitchIsOpen: boolean;
	isTreeOpen: boolean;
	chooseTreeList: any;
	selectName: string;
	Id: string;
	Name: string;
	Certificate: string;
	Desc: string;
	Pics: [];
	Power: number;
	Prob: string;
	Size: string;
	Weight: string;
	deviceMainTypeSelect: any;
	deviceMainType: string[];
	userInfo: any;
	crumbsList: object;
	imgsrcData: object[] = [];
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	List: any;
	brand: any;
	brandName: string;
	threshold: any; // 阈值
	// 消息推送
	msgName = '';
	msgPersonList = [];
	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private service: Service,
		private dialog: MatDialog
	) {
		this.buildData = buildData;
		this.selectName = '请选择设备类型';
		this.nowItemName = '所有设备类型';
		this.isLastChoose = false;
		this.isTreeOpen = false;
		this.deviceMainType = ['0', '1', '2', '3', '6', '7'];
		this.deviceMainTypeSelect = new FormControl();
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.Id = '';
		this.Power = 0;
		this.Certificate = '';
		this.Desc = '';
		this.Name = '';
		this.Prob = '';
		this.Size = '';
		this.Weight = '';
		this.crumbsList = [
			{ name: '参数设置', open: false, url: '' },
			{ name: '设备型号管理', open: true, url: 'devmod' },
			{ name: '新增', open: false, url: '' }
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.allSwitchIsOpen = true;
		this.brand = null;
		this.brandName = '请点击选择品牌';
	}

	ngOnInit() {
		const deviceTypeData = {
			FromCache: false,
			State: 0
		};
		this.service.serviceR('ent/params/devicetype/10501', deviceTypeData, (res: any) => {
			this.List = this.create(res.Result.DeviceTypes);
			console.log(this.List);
		});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(BrandDialogComponent, {
			width: '1080px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.brand = result;
				this.brandName = `${result.BRName}`;
			} else {
				this.brand = null;
				this.brandName = '请点击选择品牌';
			}
		});
	}

	create(tree: any): any {
		const m = new Map();
		for (const item of tree) {
			Reflect.set(item, 'children', []);
			Reflect.set(item, 'switch', false);
			Reflect.set(item, 'isChoose', false);
			Reflect.set(item, 'display', true);
			Reflect.set(item, 'useId', item.DTName);
			m.set(item.DTSeq + '', item);
		}
		const t = [];
		for (const d of tree) {
			const node = m.get(d.DTSeq + '');
			if (d && d.DTParent === 0) {
				t.push(node);
			} else {
				const pnode = m.get(d.DTParent + '');
				if (!pnode) {
					continue;
				}
				pnode.children.push(node);
			}
		}
		return t;
	}

	// 消息推送人员
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
				this.msgPersonList = result;
				if (this.msgPersonList.length === 0) {
					this.msgName = '';
				} else {
					this.msgName = '';
					this.msgPersonList.forEach((item, index) => {
						index === 0 ? this.msgName += item.Name : this.msgName += ('，' + item.Name);
					});
				}
			}
		});
	}

	treeChange(tree: any) {
		this.initailChooseData(this.List);
		this.chooseTreeList = tree;
	}

	initailChooseData(list: any) {
		list.map((item: any) => {
			item.isChoose = false;
			if (item.children) {
				this.initailChooseData(item.children);
			}
		});
	}

	goback() {
		this.router.navigate(['index/devmod']);
	}

	userSave() {
		if (!this.deviceMainTypeSelect.value) {
			this.snackBar.open('请选择设备主分类', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		if (this.Id === '') {
			this.snackBar.open('请输入设备型号', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return;
		}
		this.snackBar.open('正在生成，请稍等', '确认', {
			duration: 1600,
			verticalPosition: 'top',
			panelClass: 'snack-bar-color-info'
		});
		const data: IAddList = {
			Id: this.Id,
			Name: this.Name,
			Certificate: this.Certificate,
			Desc: this.Desc,
			MainType: this.deviceMainTypeSelect.value,
			Pics: this.manyFile.setImgsrcData,
			Power: this.Power,
			Prob: this.Prob,
			Size: this.Size,
			Type: this.chooseTreeList ? this.chooseTreeList.DTSeq : '',
			Weight: this.Weight,
			Brand: this.brand ? this.brand.BRSeq : '',
			Thresholds: this.threshold,
			Mobile: ''
		};

		if (this.code) {
			data.Code = this.code;
		}

		this.msgPersonList.forEach(item => {
			!data.Mobile ? data.Mobile += item.UserTel : data.Mobile += (',' + item.UserTel);
		});

		this.service.serviceR('ent/devicemodel/6102', data, (res: any) => {
			this.snackBar.open('添加成功', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
			this.router.navigate(['index/devmod']);
		});
	}

	openTree() {
		this.isTreeOpen = !this.isTreeOpen;
	}

	closeTree() {
		this.isTreeOpen = false;
	}

	getParentCode(parentSeq, item) {
		if (item.DTSeq === parentSeq) {
			this.code = item.Code + '' + this.code || '';

			if (item.DTParent !== 0) {
				for (const item2 of this.List) {
					this.getParentCode(item.DTParent, item2);
				}
			}
			return false;
		}
		if (item.children) {
			for (const item2 of item.children) {
				this.getParentCode(parentSeq, item2);
			}
		}
	}

	getCode(item) {
		if (this.chooseTreeList.DTSeq === item.DTSeq) {
			this.code = item.Code;

			for (const item2 of this.List) {
				this.getParentCode(item.DTParent, item2);
			}
			return false;
		}

		if (item.children) {
			for (const item2 of item.children) {
				this.getCode(item2);
			}
		}
	}

	checkTreeChildren() {
		this.code = '';
		if (this.chooseTreeList.DTParent === 0) {
			this.code = this.chooseTreeList.Code;
		} else {
			for (const item of this.List) {
				this.getCode(item);
			}
		}

		this.selectName = this.chooseTreeList.DTName;
		this.isTreeOpen = false;
	}

	allListChange(all: boolean) {
		this.allSwitchIsOpen = all;
	}
}
