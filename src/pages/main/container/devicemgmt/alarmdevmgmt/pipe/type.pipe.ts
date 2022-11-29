import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'typeTranslate'})
export class TypeTranslate implements PipeTransform {
    transform(code: number): string {
        if (code === 0) {
            return '库存';
        } else if (code === 1) {
            return '使用中';
        } else {
            return '报废';
        }
    }
}
