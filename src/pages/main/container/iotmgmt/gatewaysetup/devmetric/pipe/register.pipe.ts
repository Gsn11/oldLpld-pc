import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'registerTranslate'})
export class RegisterTranslate implements PipeTransform {
    transform(register: number): string {
        if (register === 0) {
            return '01 线圈状态(Coil Status) (0x)';
        } else if (register === 1) {
            return '02 输入状态(Input Status) (1x)';
        } else if (register === 2) {
            return '03 保持寄存器(Holding Register) (4x)';
        } else if (register === 3) {
            return '04 输入寄存器(Input Register) (3x)';
        }
    }
}
