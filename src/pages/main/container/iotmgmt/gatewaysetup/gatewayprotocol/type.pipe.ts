import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'typeTranslate'})
export class TypeTranslate implements PipeTransform {
    transform(code: number): string {
        if (code === 0) {
            return 'BACNET';
        } else if (code === 1) {
            return 'MODBUS';
        } else if (code === 2) {
            return 'OPC DA';
        } else if (code === 3) {
            return 'OPC UA';
        } else if (code === 4) {
            return 'OBIX';
        } else if (code === 5) {
            return 'BEM';
        } else if (code === 6) {
            return 'MQTT';
        }
    }
}
