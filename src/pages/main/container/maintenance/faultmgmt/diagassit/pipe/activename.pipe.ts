import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'activeNameTypeTranslate' })
export class ActiveNameTypeTranslate implements PipeTransform {
    transform(active: number | string): string {
        if (active === 0 || active === '0') {
            return '接单（维客）';
        } else if (active === 1 || active === '1') {
            return '出发（维客）';
        } else if (active === 2 || active === '2') {
            return '到达现场（维客）';
        } else if (active === 3 || active === '3') {
            return '诊断提交（维客）';
        } else if (active === 4 || active === '4') {
            return '要求重检（客户方）';
        } else if (active === 5 || active === '5') {
            return '服务单确认（客户方）';
        } else if (active === 6 || active === '6') {
            return '要求验收（维客）';
        } else if (active === 7 || active === '7') {
            return '验收拒绝，要求整改（客户方）';
        } else if (active === 8 || active === '8') {
            return '验收通过（客户方）';
        } else if (active === 9 || active === '9') {
            return '已收款（维客）';
        } else if (active === 10 || active === '10') {
            return '取消派单（维客）';
        } else if (active === 11 || active === '11') {
            return '取消派单（客户方）';
        } else if (active === 12 || active === '12') {
            return '诊断验证确认（维客）';
        } else if (active === 13 || active === '13') {
            return '验收验证确认（维客）';
        } else if (active === 21 || active === '21') {
            return '修改价格（管理端）';
        } else if (active === 31 || active === '31') {
            return '维客作出评价';
        } else if (active === 32 || active === '32') {
            return '客户方作出评价';
        } else if (active === 33 || active === '33') {
            return '已重新派单';
        } else if (active === 49 || active === '49') {
            return '取消派单（平台方）';
        } else if (active === 70 || active === '70') {
            return '内部派单待审核';
        } else if (active === 71 || active === '71') {
            return '内部派单审核通过';
        } else if (active === 72 || active === '72') {
            return '内部派单待验收';
        } else if (active === 73 || active === '73') {
            return '内部派单验收通过';
        } else if (active === 74 || active === '74') {
            return '内部派单重检';
        } else if (active === 88 || active === '88') {
            return '派单成功';
        }
    }
}
