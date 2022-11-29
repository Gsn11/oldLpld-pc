import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statTranslate'})
export class StatTranslate implements PipeTransform {
    transform(code: number): string {
        if (code === 0) {
            return '正常';
        } else if (code === 1) {
            return '已删除';
        } else if (code === 2) {
            return '在建';
        } else if (code === 1) {
            return '未建';
        } else {
            return '停建';
        }
    }
}
