import { Pipe, PipeTransform } from '@angular/core';
import buildData from '../../../../../../environments/buildType';

@Pipe({name: 'detailsTranslate'})
export class DetailsTranslate implements PipeTransform {
    transform(word: string): string {
        const Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
        if (word === 'Name') {
            if (!Isentver) {
                return '建筑物名称';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑名称' : '建筑名称');
            }
        } else if (word === 'BUDesc') {
            if (!Isentver) {
                return '建筑类型';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑类型' : '建筑类型');
            }
        } else if (word === 'BuildGroups') {
            if (!Isentver) {
                return '归属园群';
            } else {
                return '归属管理所';
            }
        } else if (word === 'BDesc') {
            if (!Isentver) {
                return '建筑物简介';
            } else {
                return (buildData.buildType === '联排联调' ? '水工建筑简介' : '建筑简介');
            }
        }
    }
}
