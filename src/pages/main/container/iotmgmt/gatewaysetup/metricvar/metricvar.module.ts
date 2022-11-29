import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../../common/common.module';
import { DevmodRoutingModule } from './metricvar-routing.module';
import { IndexComponent } from './index/index.component';
import { ModalComponent } from './component/modal/modal.component';
import { WordTranslate } from './pipe/word.pipe';
import { ExcelUploadModule } from '../../../component/excelUpload/excelUpload.module';

@NgModule({
	declarations: [
		IndexComponent,
		ModalComponent,
		WordTranslate
	],
	imports: [
		ExcelUploadModule,
		CommonModule,
		CommonUseModule,
		DevmodRoutingModule
	],
})
export class MetricvarModule { }
