import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'Users') {
            if (!Isentver) {
                return '物业负责人';
            } else {
                return '负责人';
            }
        } else if (word === 'LebalUsers') {
            if (!Isentver) {
                return '请选择物业负责人';
            } else {
                return '请选择负责人';
            }
        } else if (word === 'customer') {
            if (!Isentver) {
                return '所属企业';
            } else {
                return '所属单位';
            }
        }
    }
}