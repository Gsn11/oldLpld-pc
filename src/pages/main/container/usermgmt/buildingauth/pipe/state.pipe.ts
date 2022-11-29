import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stateTranslate'})
export class StateTranslate implements PipeTransform {
    transform(code: number): string {
        if (code === 0) {
            return '正常';
        } else if (code === 1) {
            return '失效';
        } else {
            return '注销';
        }
    }
}
