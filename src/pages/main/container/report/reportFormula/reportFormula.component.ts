import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../service/service';
import { MatDialog } from '@angular/material';
import { valueRangeComponent } from '../component/valueRange/valueRange.component';
@Component({
	selector: 'app-cleanwater',
	templateUrl: './reportFormula.component.html',
	styleUrls: ['./reportFormula.component.scss']
})
// tslint:disable-next-line:class-name
export class reportFormulaComponent implements OnInit {
	list: any;
	listOne: any;
	listTwo: any;
	listThree: any;
	listFour:any;
	tab2 = ['60px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px'];
	tab1 = ['60px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px'];
	tab = ['60px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px'];
	tab3 = ['60px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px','130px'];
	constructor(
		public dialog: MatDialog,
		private service: Service,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.getList()
		this.getListOne()
		this.getListTwo()
		this.getListThree()
		this.getListFour()
	}

  getList(){
		const data ={
			tbCfCode: 2
		}
		this.service.serviceReport('get','getTableConfigCalc', data, (res: any) => {
			if (res.code === '2000') {
				this.list = res.data;
			}
		});
	}
	getListOne(){
		const data ={
			tbCfCode: 3
		}
		this.service.serviceReport('get','getTableConfigCalc', data, (res: any) => {
			if (res.code === '2000') {
				this.listOne = res.data;
			}
		});
	}
	getListTwo(){
		const data ={
			tbCfCode: 4
		}
		this.service.serviceReport('get','getTableConfigCalc', data, (res: any) => {
			if (res.code === '2000') {
				this.listTwo = res.data;
			}
		});
	}
	getListThree(){
		const data ={
			tbCfCode: 1
		}
		this.service.serviceReport('get','getTableConfigCalc', data, (res: any) => {
			if (res.code === '2000') {
				this.listThree = res.data;
			}
		});
	}
	getListFour(){
		const data ={
			tbCfCode: 0
		}
		this.service.serviceReport('get','getTableConfigCalc', data, (res: any) => {
			if (res.code === '2000') {
				this.listFour = res.data;
			}
		});
	}
	listChange(e,Flag) {
		const dialogRef = this.dialog.open(valueRangeComponent, {
			width: '300px',
			data: {
				value: e,
				flag: Flag
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result){
				this.getList()
				this.getListOne()
		    this.getListTwo()
				this.getListThree()
				this.getListFour()
			}
		});
	}
}
