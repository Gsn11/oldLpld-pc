import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bigEndianTranslate'})
export class BigEndianTranslate implements PipeTransform {
    transform(bigEndian: number): string {
        if (bigEndian === 0) {
            return '小端模式（低位在前）';
        } else if (bigEndian === 1) {
            return '大端模式（高位在前）';
        }
    }
}
