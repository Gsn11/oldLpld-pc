import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stateTypeTranslate' })
export class StateTypeTranslate implements PipeTransform {
	transform(state: number | string): string {
		if (state === -1 || state === '-1') {
			return '未派单';
		} else if (state === 0 || state === '0') {
			return '待接单';
		} else if (state === 1 || state === '1') {
			return '已接单';
		} else if (state === 2 || state === '2') {
			return '已出发';
		} else if (state === 3 || state === '3') {
			return '现场服务开始';
		} else if (state === 4 || state === '4') {
			return '诊断已提交';
		} else if (state === 5 || state === '5') {
			return '要求重新诊断';
		} else if (state === 6 || state === '6') {
			return '等待维修';
		} else if (state === 7 || state === '7') {
			return '等待验收';
		} else if (state === 8 || state === '8') {
			return '等待整改';
		} else if (state === 9 || state === '9') {
			return '验收通过';
		} else if (state === 10 || state === '10') {
			return '已收款完成';
		} else if (state === 11 || state === '11') {
			return '维修方取消';
		} else if (state === 12 || state === '12') {
			return '物业方取消';
		} else if (state === 13 || state === '13') {
			return '接单超时';
		} else if (state === 14 || state === '14') {
			return '诊断验证已提交';
		} else if (state === 15 || state === '15') {
			return '验收验证已提交';
		} else if (state === 16 || state === '16') {
			return '维修方已被评价';
		} else if (state === 20 || state === '20') {
			return '维修反馈超时';
		} else if (state === 21 || state === '21') {
			return '修改价格';
		} else if (state === 22 || state === '22') {
			return '维保位置异常';
		} else if (state === 32 || state === '32') {
			return '物业方已评价';
		} else if (state === 48 || state === '48') {
			return '已评价';
		} else if (state === 50 || state === '50') {
			return '派单时候余额不足';
		} else if (state === 60 || state === '60') {
			return '诊断时余额不足';
		} else if (state === 61 || state === '61') {
			return '已重新派单';
		} else if (state === 70 || state === '70') {
			return '内部派单待审核';
		} else if (state === 71 || state === '71') {
			return '内部派单待确认';
		} else if (state === 72 || state === '72') {
			return '内部派单待验收';
		} else if (state === 73 || state === '73') {
			return '已完成';
		} else if (state === 74 || state === '74') {
			return '派单重检';
		} else if (state === 75 || state === '75') {
			return '已确认';
		} else if (state === 88 || state === '88') {
			return '派单成功';
		} else if (state === 99 || state === '99') {
			return '待审核是否可以派单';
		} else if (state === 100 || state === '100') {
			return '主管人审核';
		} else if (state === 101 || state === '101') {
			return '厂领导审核';
		} else if (state === 102 || state === '102') {
			return '厂领导审核';
		} else if (state === 103 || state === '103') {
			return '订单意见人取消订单';
		} else if (state === 104 || state === '104') {
			return '等待维修班长处理';
		}
	}
}
