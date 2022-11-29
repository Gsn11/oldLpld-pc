import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'actionTranslate'})
export class ActionTranslate implements PipeTransform {
    transform(action: number): string {
        if (action === 0) {
            return '接单（维修方）';
        } else if (action === 1) {
            return '出发（维修方）';
        } else if (action === 2) {
            return '到达现场（维修方）';
        } else if (action === 3) {
            return '诊断提交（维修方）';
        } else if (action === 4) {
            return '要求重检（客户方）';
        } else if (action === 5) {
            return '服务单确认（客户方）';
        } else if (action === 6) {
            return '要求验收（维修方）';
        } else if (action === 7) {
            return '验收拒绝，要求整改（物业方）';
        } else if (action === 8) {
            return '验收通过（客户方）';
        } else if (action === 9) {
            return '已收款（维修方）';
        } else if (action === 10) {
            return '取消派单（维修方）';
        } else if (action === 11) {
            return '取消派单（客户方）';
        } else if (action === 12) {
            return '诊断验证确认（维修方）';
        } else if (action === 13) {
            return '验收验证确认（维修方）';
        } else if (action === 21) {
            return '修改价格（管理端）';
        } else if (action === 31) {
            return '客户方作出评价';
        } else if (action === 32) {
            return '维修方作出评价';
        } else if (action === 33) {
            return '已重新派单';
        } else if (action === 49) {
            return '取消派单（平台方）';
        } else if (action === 70) {
            return '工程师内部派单（工程师）';
        } else if (action === 71) {
            return '内部派单审核通过（审核员）';
        } else if (action === 72) {
            return '内部派单提交验收（工程师）';
        } else if (action === 73) {
            return '内部派单验收通过（审核员）';
        } else if (action === 74) {
            return '内部派单重检（审核员）';
        }
    }
}
