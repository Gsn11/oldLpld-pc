import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'feedbacktypeTranslate'})
export class FeedbacktypeTranslate implements PipeTransform {
    transform(Feedbacktype: string | number): string {
        if (Feedbacktype === '0' || Feedbacktype === 0) {
            return '布尔型';
        } else if (Feedbacktype === '1' || Feedbacktype === 1) {
            return '数值型';
        } else if (Feedbacktype === '2' || Feedbacktype === 2) {
            return '文本型';
        }
    }
}
