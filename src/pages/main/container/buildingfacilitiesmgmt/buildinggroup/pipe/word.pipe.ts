import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'searchName') {
            if (!Isentver) {
                return '园群名称/地址';
            } else {
                return '管理所名称/地址';
            }
        } else if (word === 'BGName') {
            if (!Isentver) {
                return '园群名称';
            } else {
                return '管理所名称';
            }
        } else if (word === 'Addr') {
            if (!Isentver) {
                return '园群地址';
            } else {
                return '管理所地址';
            }
        }
    }
}
