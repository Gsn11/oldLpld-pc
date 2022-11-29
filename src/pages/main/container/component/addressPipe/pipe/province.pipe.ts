import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'codeTranslateProvince'})
export class CodeTranslateProvince implements PipeTransform {
    transform(code: number): string {
        const json = JSON.parse(localStorage.getItem('bemRegionJSON'));
        for (const r of json) {
            if (r.code === code) {
                return r.region;
            }
        }
        return '无';
    }
}
