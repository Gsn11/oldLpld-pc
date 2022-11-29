import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'BGName') {
            if (!Isentver) {
                return '所属园群';
            } else {
                return '所属管理所';
            }
        } else if (word === 'Name') {
            if (!Isentver) {
                return '建筑物名称';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑名称' : '水工建筑名称');
            }
        }
    }
}
