import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'wordTranslate'})
export class WordTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'AllBuildingName') {
            if (!Isentver) {
                return '所有建筑分类';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑分类' : '建筑分类');
            }
        } else if (word === 'newChildrenCode') {
            if (!Isentver) {
                return '请输入建筑物分类代码';
            } else {
                return (buildData.buildType === '联排联调' ? '请输入水工建筑物分类代码' : '请输入建筑物分类代码');
            }
        } else if (word === 'newChildrenItem') {
            if (!Isentver) {
                return '当前建筑物分类名称';
            } else {
                return (buildData.buildType === '联排联调' ? '当前水工建筑物分类名称' : '当前建筑物分类名称');
            }
        } else if (word === 'newChildrenItemTitle') {
            if (!Isentver) {
                return '新增下属建筑分类';
            } else {
                return (buildData.buildType === '联排联调' ? '新增下属水工建筑分类' : '新增下属建筑分类');
            }
        }
    }
}
