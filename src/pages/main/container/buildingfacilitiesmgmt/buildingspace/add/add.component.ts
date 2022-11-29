import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ManyFileComponent } from '../../../component/fileUpload/manyFile/manyFile.component';
import { IAddList } from './iAdd.interface';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';
import buildData from '../../../../../../environments/buildType';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	userInfo: any;
	crumbsList: object;
	imgsrcData: object[] = [];
	@ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
	Buildings: any;
	SelectBuildings: any;
	Floor: string;
	Zone: string;
	SpacePos: string;
	Isentver: boolean;
	buildData: any;
	constructor(
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
	) {
		this.userInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
		this.Buildings = [];
		this.SelectBuildings = new FormControl('');
		this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		let menu1: string;
		if (!this.Isentver) {
			menu1 = '建筑设施管理';
		} else {
			menu1 = buildData.buildType === '联排联调' ? '水工建筑群管理' : '建筑群管理';
		}
		this.crumbsList = [
			{ name: menu1, open: false, url: '' },
			{ name: '空间位置标记', open: true, url: 'buildingspace' },
			{ name: '添加', open: false, url: '' }
		];
		this.Floor = '';
		this.Zone = '';
		this.SpacePos = '';
		this.buildData = buildData;
	}

	ngOnInit() {
		const data = {
			PageIndex: 1,
			PageSize: 10,
			State: 0
		};
		this.service.serviceR('ent/building/5001', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.Buildings = res.Result.Buildings;
			}
		});
	}

	goback() {
		this.router.navigate(['index/buildingspace']);
	}


	userSave() {
		if (this.SelectBuildings.value === '') {
			if (!this.Isentver) {
				this.snackBar.open('请选择建筑设施', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			} else {
				this.snackBar.open(buildData.buildType === '联排联调' ? '请选择水工建筑设施' : '请选择建筑设施', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-danger'
				});
			}
			return;
		}
		this.snackBar.open('正在生成，请稍等', '确认', {
			duration: 1600,
			verticalPosition: 'top',
			panelClass: 'snack-bar-color-info'
		});
		const data: IAddList = {
			Building: this.SelectBuildings.value,
			Floor: this.Floor + '层',
			Pics: this.manyFile.setImgsrcData,
			SpacePos: this.SpacePos,
			Zone: this.Zone
		};
		this.service.serviceR('ent/buildspace/5202', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.snackBar.open('添加成功', '确认', {
					duration: 1600,
					verticalPosition: 'top',
					panelClass: 'snack-bar-color-info'
				});
				this.router.navigate(['index/buildingspace']);
			}
		});
	}
}
