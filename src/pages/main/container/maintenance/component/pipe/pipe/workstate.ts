import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'workstateTranslate' })
export class WorkstateTranslate implements PipeTransform {
	transform(state: number | string): string {
		if (state === 11 || state === '11') {
			return '维修方取消';
		} else if (state === 12 || state === '12') {
			return '物业方取消';
		} else if (state === 13 || state === '13') {
			return '订单超时';
		} else if (state === 20 || state === '20') {
			return '反馈超时';
		} else if (state === 22 || state === '22') {
			return '位置异常';
		} else if (state === 49 || state === '49') {
			return '平台方取消';
		} else {
			return '正常';
		}
	}
}
