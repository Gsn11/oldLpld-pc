import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderTypeTranslate' })
export class OrderTypeTranslate implements PipeTransform {
	transform(type: number | string): string {
		if (type === 0 || type === '0') {
			return '手动派单';
		} else if (type === 1 || type === '1') {
			return '计划派单';
		} else if (type === 2 || type === '2') {
			return '报警派单';
		}
	}
}
