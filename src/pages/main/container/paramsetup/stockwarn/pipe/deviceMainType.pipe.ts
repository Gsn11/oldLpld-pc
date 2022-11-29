import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'deviceMainTypeTranslate'})
export class DeviceMainType implements PipeTransform {
    transform(type: number | string): string {
        if (type === 0 || type === '0') {
            return '通用设备';
        } else if (type === 1 || type === '1') {
            return '智能设备';
        } else if (type === 2 || type === '2') {
            return '智联网关';
        } else if (type === 3 || type === '3') {
            return '配件';
        } else {
            return '智能井盖';
        }
    }
}
