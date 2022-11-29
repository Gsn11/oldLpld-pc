import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'DayTranslate'})
export class DayTranslate implements PipeTransform {
    transform(day: number | string): string {
        if (day === 1 || day === '1') {
            return '周日';
        } else if (day === 2 || day === '2') {
            return '周一';
        } else if (day === 3 || day === '3') {
            return '周二';
        } else if (day === 4 || day === '4') {
            return '周三';
        } else if (day === 5 || day === '5') {
            return '周四';
        } else if (day === 6 || day === '6') {
            return '周五';
        } else if (day === 7 || day === '7') {
            return '周六';
        } else {
            return '无';
        }
    }
}
