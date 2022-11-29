import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeTypeTranslate'})
export class TimeTypeTranslate implements PipeTransform {
    transform(time: number | string): string {
        if (time === 0 || time === '0') {
            return '单次';
        } else if (time === 1 || time === '1') {
            return '每日';
        } else if (time === 2 || time === '2') {
            return '每周';
        } else if (time === 3 || time === '3') {
            return '每月';
        }
    }
}
