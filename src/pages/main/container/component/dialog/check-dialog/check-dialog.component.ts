import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { RequestService } from '../../../../../service/request';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
	title: string;
}

@Component({
	selector: 'app-check-dialog',
	templateUrl: './check-dialog.component.html',
	styleUrls: ['./check-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckDialogComponent {
	check = true;
	constructor(
		private requestService: RequestService,
		public dialogRef: MatDialogRef<CheckDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
}
