import { NgModule } from '@angular/core';
import { CommonUseModule } from '../../../../../common/common.module';
import { valueRangeComponent } from './valueRange.component';

@NgModule({
	imports: [
		CommonUseModule
	],
	declarations: [
		valueRangeComponent
	],
	exports: [
		valueRangeComponent
	],
	entryComponents: [valueRangeComponent]
})
export class ValueRangeModule { }
