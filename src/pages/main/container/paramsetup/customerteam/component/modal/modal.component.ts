import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
	show: boolean;
	TeamId: string;
	newChildrenItem = new FormControl('', Validators.required);
	TSeq: number;
	Name: string;
	serverStatistics: any = true;
	@Output() updateData = new EventEmitter();
	constructor(
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.Name = '';
		this.show = false;
		this.TSeq = 0;
	}

	switchModalBox() {
		this.show = !this.show;
	}

	goCancel() {
		this.show = !this.show;
	}

	userSave() {
		if (this.newChildrenItem.errors) {
			this.newChildrenItem.markAsTouched({
				onlySelf: true
			});
			return;
		}
		this.show = !this.show;
		let data = {};
		data = {
			TName: this.newChildrenItem.value,
			TParent: this.TSeq,
			OrderReport: this.serverStatistics ? 1 : 0
		};
		this.service.serviceR('ent/params/team/10102', data, (res: any) => {
			this.updateData.emit();
			this.snackBar.open('添加成功', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-success'
			});
		});
	}
	getnewChildrenItemErrorMessage() {
		return this.newChildrenItem.hasError('required') ? '请输入部门分类名称' : '';
	}
}
