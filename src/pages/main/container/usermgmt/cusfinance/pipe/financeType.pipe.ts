import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'financeTypeTranslate'})
export class FinanceType implements PipeTransform {
    transform(type: number | string): string {
        if (type === 0 || type === '0') {
            return '等待支付平台派单';
        } else if (type === 1 || type === '1') {
            return '支付平台派单成功';
        } else if (type === 2 || type === '2') {
            return '支付平台支付成功';
        } else if (type === 3 || type === '3') {
            return '支付平台派单失败';
        } else if (type === 4 || type === '4') {
            return '支付平台支付失败';
        } else if (type === 5 || type === '5') {
            return '线下手工充值成功';
        } else if (type === 6 || type === '6') {
            return '线下手工扣减成功';
        } else if (type === 7 || type === '7') {
            return '冻结金额';
        } else if (type === 8 || type === '8') {
            return '解除冻结';
        } else if (type === 9 || type === '9') {
            return '派单扣款';
        } else if (type === 10 || type === '10') {
            return '派单退款';
        }
    }
}
