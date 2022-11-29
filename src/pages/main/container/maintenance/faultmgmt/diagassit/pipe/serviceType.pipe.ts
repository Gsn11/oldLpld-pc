import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../../environments/buildType';

@Pipe({name: 'serviceTypeTranslate'})
export class ServiceTypeTranslate implements PipeTransform {
    transform(type: number | string): string {
        if (type === 0 || type === '0') {
            return buildData.serviceProvider;
        } else if (type === 1 || type === '1') {
            return '固定服务商';
        } else if (type === 2 || type === '2') {
            return '服务大市场';
        }
    }
}
