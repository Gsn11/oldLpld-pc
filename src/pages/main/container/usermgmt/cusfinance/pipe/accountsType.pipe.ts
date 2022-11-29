import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'accountsTypeTranslate'})
export class AccountsType implements PipeTransform {
    transform(type: number | string): string {
        if (type === 0 || type === '0') {
            return '用户id/手机号';
        } else if (type === 1 || type === '1') {
            return '微信账号';
        } else if (type === 2 || type === '2') {
            return '支付宝账号';
        } else if (type === 3 || type === '3') {
            return '企业线下充值';
        } else if (type === 4 || type === '4') {
            return '用户线下充值';
        }
    }
}
