import { NgModule } from '@angular/core';
import { ActiveNameTypeTranslate } from './pipe/activename.pipe';
import { OrderTypeTranslate } from './pipe/orderType.pipe';
import { ServiceTypeTranslate } from './pipe/serviceType.pipe';
import { StateTypeTranslate } from './pipe/statetype.pipe';
import { WordTranslate } from './pipe/word.pipe';
import { WorkstateTranslate } from './pipe/workstate';
import { WorklabelstateTranslate } from './pipe/worklabelstate';

@NgModule({
	declarations: [
		ActiveNameTypeTranslate,
		OrderTypeTranslate,
		ServiceTypeTranslate,
		StateTypeTranslate,
		WordTranslate,
		WorkstateTranslate,
		WorklabelstateTranslate
	],
	exports: [
		ActiveNameTypeTranslate,
		OrderTypeTranslate,
		ServiceTypeTranslate,
		StateTypeTranslate,
		WordTranslate,
		WorkstateTranslate,
		WorklabelstateTranslate
	]
})

export class OrderPipeModule { }
