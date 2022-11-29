import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from '../component/modal/modal.component';
import { IUpdateInterface } from './iIndex.interface';
import { Service } from '../../../../../service/service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	customer: any;
	crumbsList: object;
	nowItemName: string;
	allSwitchIsOpen: boolean;
	newChildrenItem: any;
	nowParent: string;
	isLastChoose: boolean;
	setConfim: boolean;
	setData: object;
	@ViewChild(ModalComponent, null) modal: ModalComponent;
	List: any;
	TreeCustomerIsOwner: boolean;
	Seq: number;
	serverStatistics: any = true;
	constructor(
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.isLastChoose = true;
		this.newChildrenItem = new FormControl('', [
			Validators.required
		]);
		this.crumbsList = [
			{ name: '参数设置', open: false },
			{ name: '单位部门管理', open: false }
		];
		this.setData = {
			CommonSearch: '',
			FromCache: false,
			State: 0,
			PageIndex: 1,
			PageSize: 10
		};
		this.setConfim = false;
		this.nowItemName = '部门（团队）树';
		this.allSwitchIsOpen = false;
		this.TreeCustomerIsOwner = false;
		this.Seq = null;
	}

	ngOnInit() {
		this.getList();
	}

	getList() {
		const data = {
			FromCache: false,
			State: 0,
		};
		this.service.serviceR('ent/params/team/10101', data, (res: any) => {
			if (res.ResultCode === 0) {
				const key = 'Teams';
				if (res.Result[key].length > 0) {
					this.List = this.create(res.Result[key]);
				} else {
					this.List = null;
				}
			}
		});
	}

	create(tree: any): any {
		const m = new Map();
		for (const item of tree) {
			Reflect.set(item, 'children', []);
			Reflect.set(item, 'switch', false);
			Reflect.set(item, 'isChoose', false);
			Reflect.set(item, 'useId', item.TName);
			Reflect.set(item, 'display', true);
			m.set(item.TSeq + '', item);
		}
		const t = [];
		for (const d of tree) {
			const node = m.get(d.TSeq + '');
			if (d && !d.TParent) {
				t.push(node);
			} else {
				const pnode = m.get(d.TParent + '');
				if (!pnode) {
					continue;
				}
				pnode.children.push(node);
			}
		}
		return t;
	}

	treeChange(tree: any) {
		if (tree.Customer !== this.customer) {
			this.TreeCustomerIsOwner = false;
		} else {
			this.TreeCustomerIsOwner = true;
		}
		this.initailChooseData(this.List);
		this.Seq = tree.TSeq;
		this.nowItemName = tree.TName;
		this.nowParent = tree.TParent;
		this.newChildrenItem.setValue(this.nowItemName);
	}

	initailChooseData(list: any) {
		list.map((item: any) => {
			item.isChoose = false;
			if (item.children) {
				this.initailChooseData(item.children);
			}
		});
	}

	allListSwitch() {
		if (this.List === null) {
			return;
		}
		this.treeChange(this.List[0]);
		if (this.allSwitchIsOpen === true) {
			this.nowItemName = '部门（团队）树';
		}
		this.allSwitchIsOpen = !this.allSwitchIsOpen;
	}

	addChildren() {
		let id: number;
		if (this.allSwitchIsOpen) {
			id = this.Seq;
		} else {
			id = 0;
		}
		this.modal.TSeq = id;
		this.modal.Name = this.nowItemName;
		this.modal.switchModalBox();
	}

	showConfim() {
		this.setConfim = !this.setConfim;
	}

	userSave() {
		const data: IUpdateInterface = {
			TName: this.newChildrenItem.value,
			TParent: this.nowParent,
			OrderReport: this.serverStatistics ? 1 : 0
		};
		if (this.Seq) {
			Reflect.set(data, 'TSeq', this.Seq);
		}


		// console.log(data);
		// return false;

		this.service.serviceR('ent/params/team/10103', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.getList();
				this.snackBar.open('保存成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-success'
				});
			}
		});
	}

	deleteCheck(...d: boolean[]) {
		this.setConfim = false;
		const confimResultState = d[0];
		if (confimResultState === true) {
			const data = {
				TSeqs: this.Seq,
			};
			this.service.serviceR('ent/params/team/10104', data, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('删除成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-info'
					});
					this.nowItemName = '部门（团队）树';
					this.allSwitchIsOpen = !this.allSwitchIsOpen;
					this.getList();
				}
			});
		}
	}

	getnewChildrenItemErrorMessage() {
		return this.newChildrenItem.hasError('required') ? '当前部门分类名称' : '';
	}
}

