import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'procotolTranslate'})
export class ProcotolTranslate implements PipeTransform {
    transform(procotol: number): string {
        if (procotol === 0) {
            return 'BACNET';
        } else if (procotol === 1) {
            return 'MODBUS';
        } else if (procotol === 2) {
            return 'OPC DA';
        } else if (procotol === 3) {
            return 'OPC UA';
        } else if (procotol === 4) {
            return 'OBIX';
        } else if (procotol === 5) {
            return 'BEM';
        }
    }
}
