import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../common/common.module';
import { MaterielDetailRoutingModule } from './materielDetail-routing.module';
import { MaterielComponent } from './index/materiel.component';
//
import { NgxEchartsModule } from 'ngx-echarts';
import { ManyfileModule } from '../../component/fileUpload/manyFile/manyFile.module';
import { BuildingDialogModule } from '../../component/dialog/building-dialog/building-dialog.module';
import { DevicemodelDialogModule } from '../../component/dialog/devicemodel-dialog/devicemodel-dialog.module';
import { DeviceManyDialogModule } from '../../component/dialog/devicemany-dialog/devicemany-dialog.module';
import { UserManyDialogModule } from '../../component/dialog/userMany-dialog/userMany-dialog.module';
import { ExcelUploadModule } from '../../component/excelUpload/excelUpload.module';
import { CalendarModule } from '../../component/calendar/calendar.module';
import { UserDialogModule } from '../../component/dialog/user-dialog/user-dialog.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
	declarations: [
		MaterielComponent
	],
	imports: [
		CommonUseModule,
		MaterielDetailRoutingModule,
		NgxEchartsModule,
		BuildingDialogModule,
		DevicemodelDialogModule,
		DeviceManyDialogModule,
		ManyfileModule,
		UserManyDialogModule,
		CalendarModule,
		ExcelUploadModule,
		UserDialogModule,
		NzIconModule
	],
})
export class MaterielDetailModule { }
