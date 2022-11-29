import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ExcelUploadService } from './excelUpload.service';

@Component({
	selector: 'app-excelupload',
	templateUrl: './excelUpload.component.html',
	styleUrls: ['./excelUpload.component.scss'],
	providers: [ExcelUploadService]
})
export class ExcelUploadComponent {
	@Output() getList = new EventEmitter<any>();
	@Input() url: string;
	fileList: any;
	fileBoxShow: boolean;
	FailUrl: string;
	FileInfo: boolean;
	@Input() info: string;
	@Input() showDownLoadSrc: any;
	showSrc = false;
	BtnDisabled: boolean;
	constructor(
		private excelUploadService: ExcelUploadService,
		private snackBar: MatSnackBar,
	) {
		this.fileBoxShow = false;
		this.FailUrl = null;
		this.FileInfo = false;
		this.BtnDisabled = false;
	}

	fileBoxChange() {
		this.fileBoxShow = !this.fileBoxShow;
	}

	fileCancel() {
		this.fileBoxShow = false;
		this.fileList = null;
		this.FileInfo = false;
	}

	fileChange(e: any) {
		this.fileList = [];
		if (e.srcElement.files) {
			const temp = Array.from(e.srcElement.files);
			for (const f of e.srcElement.files) {
				Reflect.set(f, 'State', 0);
				if (f.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
					this.snackBar.open('只能上传xlsx文件!', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-danger'
					});
					temp.splice(temp.findIndex((item: any) => item.name === f.name), 1);
					continue;
				}
			}
			this.fileList = temp;
		}
	}

	deleteFile() {
		this.fileList = null;
		this.FileInfo = false;
	}

	FileUpLoad() {
		if (this.BtnDisabled === true) {
			return;
		}
		if (this.fileList && this.fileList.length > 0) {
			this.BtnDisabled = true;
			const formData = new FormData();
			// formData.append('excelInput', this.fileList[0]);
			formData.append('buildingSpace', this.fileList[0]);
			console.log(this.url)
			this.excelUploadService.upload(this.url, formData)
				.subscribe(
					(res: any) => {
						if (res.ResultCode === 0) {
							console.log(res);
							let str: string;
							let info: string;
							this.FailUrl = res.Result.FailUrl;
							this.FileInfo = true;
							this.showSrc = true;
							if (res.Result.FailCount > 0) {
								if (res.Result.FailCount === res.Result.Total) {
									info = 'snack-bar-color-danger';
									str = '上传失败，请重试';
									Reflect.set(this.fileList[0], 'State', 2);
								} else {
									info = 'snack-bar-color-warning';
									str = '文件部分上传成功';
									Reflect.set(this.fileList[0], 'State', 2);
								}
							} else if (res.Result.FailCount === 0) {
								str = '文件全部上传成功';
								info = 'snack-bar-color-info';
								Reflect.set(this.fileList[0], 'State', 1);
								this.FileInfo = false;
								// this.fileCancel();
							} else {
								str = '未知错误，请重试';
								info = 'snack-bar-color-danger';
								Reflect.set(this.fileList[0], 'State', 2);
								this.FileInfo = true;
							}
							this.snackBar.open(str, '确认', {
								duration: 1600,
								verticalPosition: 'top',
								panelClass: info
							});
							this.getList.emit();
							this.BtnDisabled = false;
						}
					},
					(error) => {
						this.BtnDisabled = false;
						this.snackBar.open('文件上传失败，请重新确认！', '确认', {
							duration: 1600,
							verticalPosition: 'top',
							panelClass: 'snack-bar-color-danger'
						});
						Reflect.set(this.fileList[0], 'State', 2);
					}
				);
		} else {
			this.snackBar.open('请先添加文件！', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-info'
			});
		}
	}

}
