import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'typeTranslate'})
export class TypeTranslate implements PipeTransform {
    transform(type: number): string {
        if (type === 0) {
            return '服务费用';
        } else if (type === 1) {
            return '设备或配件费用';
        } else if (type === 2) {
            return '必须支付费用';
        }
    }
}
