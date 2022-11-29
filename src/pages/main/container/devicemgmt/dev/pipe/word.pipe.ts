import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'Building') {
            if (!Isentver) {
                return '所在建筑设施';
            } else {
                return '所在地点';
            }
        }
    }
}
