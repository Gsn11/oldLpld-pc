import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../common/common.module';
import { MaterielRoutingModule } from './materielalarm-routing.module';
import { MaterielalarmComponent } from './materielalarm.component';


@NgModule({
	declarations: [
		MaterielalarmComponent
	],
	imports: [
		CommonUseModule,
		MaterielRoutingModule
	],
})
export class MaterielalarmModule { }
