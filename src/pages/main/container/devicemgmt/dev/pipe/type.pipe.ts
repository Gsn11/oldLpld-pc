import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'typeTranslate'})
export class TypeTranslate implements PipeTransform {
    transform(code: number): string {
        if (code === 0) {
            return '库存';
        } else if (code === 1) {
            return '使用中';
        } else if (code === 2) {
            return '报废';
        } else if (code === 4) {
            return '停用';
        }else if (code === 5) {
            return '大修';
        }
    }
}
