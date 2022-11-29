import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'agreementTypeTranslate'})
export class AgreementTypeTranslate implements PipeTransform {
    transform(type: number): string {
        if (type === 0) {
            return '维客协议';
        } else if (type === 1) {
            return '运营方协议';
        } else if (type === 2) {
            return '服务方协议';
        }
    }
}
