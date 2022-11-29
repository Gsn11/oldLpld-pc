import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUseModule } from '../../../../common/common.module';
import { MatCardModule } from '@angular/material/card';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';
import { ThreeDModule } from '../../component/threeD/threeD.module';
import { WarehouseOutModule } from '../../component/warehouseOut/warehouseOut.module';
import { DevRoutingModule } from './dev-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './history/history.component';
import { HistoryInfoComponent } from './history/historyInfo/historyInfo.component';
import { HistoryStateComponent } from './history/historyState/historyState.component';
import { PartsComponent } from './parts/parts.component';
import { TypeTranslate } from './pipe/type.pipe';
import { StateTypeTranslate } from './pipe/statetype.pipe';
import { ActiveNameTypeTranslate } from './pipe/activename.pipe';
import { FeedbacktypeTranslate } from './pipe/feedbacktype.pipe';
import { ModelTypeTranslate } from './pipe/modeltype.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { BuildingDialogModule } from '../../component/dialog/building-dialog/building-dialog.module';
import { DevicemodelDialogModule } from '../../component/dialog/devicemodel-dialog/devicemodel-dialog.module';
import { DeviceManyDialogModule } from '../../../container/component/dialog/devicemany-dialog/devicemany-dialog.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { QRCodeModule } from 'angular2-qrcode';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
	declarations: [
		IndexComponent,
		AddComponent,
		InfoComponent,
		EditComponent,
		HistoryComponent,
		HistoryInfoComponent,
		HistoryStateComponent,
		PartsComponent,
		TypeTranslate,
		StateTypeTranslate,
		ActiveNameTypeTranslate,
		FeedbacktypeTranslate,
		ModelTypeTranslate,
		WordTranslate
	],
	imports: [
		CommonModule,
		CommonUseModule,
		MatCardModule,
		ExcelUploadModule,
		DevRoutingModule,
		CalendarModule,
		ManyfileModule,
		BuildingDialogModule,
		DevicemodelDialogModule,
		ThreeDModule,
		WarehouseOutModule,
		DeviceManyDialogModule,
		NzModalModule,
		QRCodeModule,
		NzButtonModule
	]
})
export class DevModule { }
