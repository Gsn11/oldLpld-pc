import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sexTranslate'})
export class SexTranslate implements PipeTransform {
    transform(state: number | string): string {
        if (state === 0 || state === '0') {
            return '维客协议';
        } else if (state === 1 || state === '1') {
            return '运营方协议';
        } else {
            return null;
        }
    }
}
