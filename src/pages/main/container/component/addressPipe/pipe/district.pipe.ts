import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'codeTranslateDistrict'})
export class CodeTranslateDistrict implements PipeTransform {
    transform(DistrictCode: number, code?: any): string {
        // console.log(code);
        const ProvinceCode = code[0];
        const CityCode = code[1];
        const json = JSON.parse(localStorage.getItem('bemRegionJSON'));
        let defaultProvince = '无';
        let defaultCity = '无';
        for (const r of json) {
            if (r.code === ProvinceCode) {
                defaultProvince = r.region;
                for (const c of r.regionEntitys) {
                    defaultCity = c.region;
                    if (c.code === CityCode) {
                        for (const d of c.regionEntitys) {
                            if (d.code === DistrictCode) {
                                return d.region;
                            }
                        }
                    }
                }
            }
        }
        if (defaultCity !== '无') {
            return defaultCity;
        } else if (defaultProvince !== '无') {
            return defaultProvince;
        }
    }
}
