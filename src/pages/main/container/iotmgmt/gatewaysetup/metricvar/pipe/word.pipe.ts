import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wordTranslate' })
export class WordTranslate implements PipeTransform {
	transform(word: string): string {
		const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		if (word === 'CustomerName') {
			if (!Isentver) {
				return '所属企业';
			} else {
				return '所属单位';
			}
		}
	}
}
