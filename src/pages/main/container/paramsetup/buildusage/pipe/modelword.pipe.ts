import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'modelWordTranslate'})
export class ModelWordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'newItem') {
            if (!Isentver) {
                return '新增建筑分类';
            } else {
                return (buildData.buildType === '联排联调' ? '新增水工建筑分类' : '新增建筑分类');
            }
        } else if (word === 'atBuilding') {
            if (!Isentver) {
                return '所属建筑物父级';
            } else {
                return (buildData.buildType === '联排联调' ? '所属水工建筑物父级' : '所属建筑物父级');
            }
        }
    }
}
