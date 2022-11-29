import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'modelTypeTranslate'})
export class ModelTypeTranslate implements PipeTransform {
    transform(type: number): string {
        if (type === 0) {
            return '手动派单';
        } else if (type === 1) {
            return '计划派单';
        }
    }
}
