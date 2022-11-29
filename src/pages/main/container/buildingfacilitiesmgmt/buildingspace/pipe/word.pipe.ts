import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'BuildingName') {
            if (!Isentver) {
                return '建筑设施';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑设施' : '建筑设施');
            }
        } else if (word === 'BGName') {
            if (!Isentver) {
                return '所属园群';
            } else {
                return '所属管理所';
            }
        } else if (word === 'searchName') {
            if (!Isentver) {
                return '设施名称/楼层/区域/空间位置';
            } else {
                return '空间位置';
            }
        }
    }
}
