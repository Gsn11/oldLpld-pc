import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { UploadService } from '../manyFile.service';
import { IImgResult } from '../iManyFile.component';

@Component({
	selector: 'app-manyfile',
	templateUrl: './manyFile.component.html',
	styleUrls: ['./manyFile.component.scss'],
	providers: [UploadService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManyFileComponent implements OnInit {
	@Input() setImgsrcData: object[];
	@Input() setType: string;
	isState: boolean;
	setPhotoConfim: boolean;
	@Input() docList: object[];
	@Input() type: string;
	@Input() maxLength: number;
	constructor(
		private snackBar: MatSnackBar,
		public domSanitizer: DomSanitizer,
		private uploadService: UploadService,
		private cdr: ChangeDetectorRef
	) {
		this.setPhotoConfim = false;
	}

	ngOnInit() {
		if (this.setType === 'info') {
			this.isState = false;
		} else {
			this.isState = true;
		}
	}
	// 图片更改后序列化对象方法
	fileChange(e: any, type?: string) {
		if (this.maxLength && this.setImgsrcData.length >= this.maxLength) {
			this.snackBar.open('最多上传' + this.maxLength + '张图片', '确认', {
				duration: 1600,
				verticalPosition: 'top',
				panelClass: 'snack-bar-color-danger'
			});
			return false;
		}

		const file = e.srcElement.files[0];
		const formData = new FormData();
		if (type) {
			formData.append('doc', file);
		} else {
			formData.append('FImg', file);
		}
		this.uploadService.uploadImg(formData)
			.subscribe(
				(res: IImgResult) => {
					if (res.ResultCode === 0) {
						const data = {};
						if (type) {
							Reflect.set(data, 'DocUrl', res.Result.doc);
							Reflect.set(data, 'DocDesc', file.name);
							this.docList.push(data);
						} else {
							Reflect.set(data, 'ImgUrl', res.Result.FImg);
							Reflect.set(data, 'Desc', file.name.split('.')[0]);
							this.setImgsrcData.push(data);
						}
						this.cdr.markForCheck();
					}
				}
			);
	}
	// 删除图片方法记录index
	deletePhoto(index: number, type?: string) {
		if (type) {
			this.docList.splice(index, 1);
		} else {
			this.setImgsrcData.splice(index, 1);
		}
		this.cdr.markForCheck();
	}
}
