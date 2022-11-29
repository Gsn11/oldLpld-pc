import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../../../service/service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-valuerange',
	templateUrl: './valueRange.component.html',
	styleUrls: ['./valueRange.component.scss']
})
// tslint:disable-next-line:class-name
export class valueRangeComponent implements OnInit {
	@Input() value: any;
	maximum:string;
	minimum:string;
	inputValue:string;
	tbCfName:string;
	flagName:string;
	constructor(
		public dialogRef: MatDialogRef<valueRangeComponent>,
		private service: Service,
		private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		console.log(data);
		this.tbCfName = data.value;
		this.flagName = data.flag;
	}

	ngOnInit() {
	}

	confirmFn(type) {
		if (type) {
			if(this.flagName === 'fixation'){
				const data ={
					tbCfName: this.tbCfName,
					inputValue: this.inputValue
				}
				this.service.serviceReport('post','updateInputValue', data, (res: any) => {
					this.dialogRef.close(true);
				});
			}else{
				const data ={
					tbCfName: this.tbCfName,
					tbCfMax: this.maximum,
					tbCfMin: this.minimum
				}
				this.service.serviceReport('post','updateTableConfigCalc', data, (res: any) => {
					this.dialogRef.close(true);
				});
			}
		} else {
			this.dialogRef.close(false);
		}
	}
}
