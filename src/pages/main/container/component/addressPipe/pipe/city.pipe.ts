import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'codeTranslateCity'})
export class CodeTranslateCity implements PipeTransform {
    transform(cityCode: number, provinceCode: number): string {
        const json = JSON.parse(localStorage.getItem('bemRegionJSON'));
        let defaultProvince = '无';
        for (const r of json) {
            if (r.code === provinceCode) {
                defaultProvince = r.region;
                for (const c of r.regionEntitys) {
                    if (c.code === cityCode) {
                        return c.region;
                    }
                }
            }
        }
        return defaultProvince;
    }
}
