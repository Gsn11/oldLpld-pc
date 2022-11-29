import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'codeTranslateToAddress' })
export class CodeTranslateToAddress implements PipeTransform {
    transform(code: number): string {
        const regionJson = JSON.parse(localStorage.getItem('bemRegionJSON'));
        for (const r of regionJson) {
            for (const c of r.regionEntitys) {
                for (const d of c.regionEntitys) {
                    if (d.code === code) {
                        return d.region;
                    }
                }
            }
        }
        return '无';
    }
}
