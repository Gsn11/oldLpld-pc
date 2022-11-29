import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'worklabelstateTranslate' })
export class WorklabelstateTranslate implements PipeTransform {
	transform(state: string): string {
		if (state === 'orderfix') {
			return '维修状态';
		} else if (state === 'orderschedulechk') {
			return '巡检状态';
		} else if (state === 'orderkeep') {
			return '保养状态';
		}
	}
}
