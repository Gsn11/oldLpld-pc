import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'chooseBuilding') {
            if (!Isentver) {
                return '建筑物选择';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑选择' : '建筑选择');
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
