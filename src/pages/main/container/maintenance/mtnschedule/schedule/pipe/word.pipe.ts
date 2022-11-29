import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'Users') {
            if (!Isentver) {
                return '物业负责人';
            } else {
                return '审核负责人';
            }
        } else if (word === 'LebalUsers') {
            if (!Isentver) {
                return '请选择物业负责人';
            } else {
                return '请选择负责人';
            }
        } else if (word === 'LebalWorker') {
            return '请点击选择工作人员';
        }
    }
}
