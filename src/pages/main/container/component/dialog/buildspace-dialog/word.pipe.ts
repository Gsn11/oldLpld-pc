import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'searchTitle') {
            if (!Isentver) {
                return '建筑设施查找';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑查找' : '建筑查找');
            }
        } else if (word === 'searchName') {
            if (!Isentver) {
                return '设施名称/楼层/区域/空间位置';
            } else {
                return '空间位置';
            }
        } else if (word === 'BuildingName') {
            if (!Isentver) {
                return '建筑物名称';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑名称' : '建筑名称');
            }
        }
    }
}
