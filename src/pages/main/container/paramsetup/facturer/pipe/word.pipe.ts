import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'CustomerName') {
            if (!Isentver) {
                return '所属企业';
            } else {
                return '所属单位';
            }
        } else if (word === 'LegalPerson') {
            if (!Isentver) {
                return '企业法人';
            } else {
                return '单位法人';
            }
        } else if (word === 'Wechat') {
            if (!Isentver) {
                return '企业微信公众号';
            } else {
                return '单位微信公众号';
            }
        } else if (word === 'FDesc') {
            if (!Isentver) {
                return '企业简介';
            } else {
                return '单位简介';
            }
        }
    }
}
