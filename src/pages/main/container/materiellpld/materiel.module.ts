import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../common/common.module';
import { MaterielRoutingModule } from './materiel-routing.module';
import { MaterielComponent } from './index/materiel.component';
import { AddMaterielComponent } from './add/add.component';
import { EditMaterielComponent } from './edit/edit.component';
import { RecordComponent } from './record/record.component';
import { LookMaterielComponent } from './look/look.component';
//
import { NgxEchartsModule } from 'ngx-echarts';
import { ManyfileModule } from '../component/fileUpload/manyFile/manyFile.module';
import { BuildingDialogModule } from '../component/dialog/building-dialog/building-dialog.module';
import { DevicemodelDialogModule } from '../component/dialog/devicemodel-dialog/devicemodel-dialog.module';
import { DeviceManyDialogModule } from '../component/dialog/devicemany-dialog/devicemany-dialog.module';
import { UserManyDialogModule } from '../component/dialog/userMany-dialog/userMany-dialog.module';
import { ExcelUploadModule } from '../component/excelUpload/excelUpload.module';


@NgModule({
	declarations: [
		MaterielComponent,
		AddMaterielComponent,
		EditMaterielComponent,
		RecordComponent,
		LookMaterielComponent
	],
	imports: [
		CommonUseModule,
		MaterielRoutingModule,
		NgxEchartsModule,
		BuildingDialogModule,
		DevicemodelDialogModule,
		DeviceManyDialogModule,
		ManyfileModule,
		UserManyDialogModule,
		ExcelUploadModule
	],
})
export class MaterielModule { }
