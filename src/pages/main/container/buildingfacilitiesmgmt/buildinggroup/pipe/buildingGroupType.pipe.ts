import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'BuildingGroupTypeTranslate'})
export class BuildingGroupTranslate implements PipeTransform {
    transform(code: number | string): string {
        if (code === 0 || code === '0') {
            return '园区';
        } else if (code === 1 || code === '1') {
            const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
            if (!Isentver) {
                return '建筑设施群';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑群' : '建筑群');
            }
        }
    }
}
