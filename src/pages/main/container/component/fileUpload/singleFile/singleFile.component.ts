import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../manyFile.service';
import { IImgResult } from '../iManyFile.component';

@Component({
	selector: 'app-singlefile',
	templateUrl: './singleFile.component.html',
	styleUrls: ['./singleFile.component.scss'],
	providers: [UploadService],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleFileComponent {
	@Input() setImgsrc: string;
	Timg: any;

	constructor(
		public domSanitizer: DomSanitizer,
		public uploadService: UploadService
	) { }

	fileChange(e: any) {
		const file = e.srcElement.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append('FImg', file);
		this.uploadService.uploadImg(formData)
			.subscribe(
				(res: IImgResult) => {
					if (res.ResultCode === 0) {
						this.setImgsrc = res.Result.FImg;
						this.Timg = res.Result.FImg;
						console.log(res.Result.FImg);
					}
				}
			);
	}
}
