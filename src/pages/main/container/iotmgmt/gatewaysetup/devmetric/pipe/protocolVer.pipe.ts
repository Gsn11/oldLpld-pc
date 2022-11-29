import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'protocolVerTranslate'})
export class ProtocolVerTranslate implements PipeTransform {
    transform(protocolVer: number): string {
        if (protocolVer === 0) {
            return 'OPC UA';
        } else if (protocolVer === 1) {
            return 'OPC DA';
        }
    }
}
