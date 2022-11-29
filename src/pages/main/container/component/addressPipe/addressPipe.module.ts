import { NgModule } from '@angular/core';
import { CodeTranslateToAddress } from './pipe/address.pipe';
import { CodeTranslateCity } from './pipe/city.pipe';
import { CodeTranslateDistrict } from './pipe/district.pipe';
import { CodeTranslateProvince } from './pipe/province.pipe';

@NgModule({
    declarations: [
        CodeTranslateToAddress,
        CodeTranslateCity,
        CodeTranslateDistrict,
        CodeTranslateProvince
    ],
    exports: [
        CodeTranslateToAddress,
        CodeTranslateCity,
        CodeTranslateDistrict,
        CodeTranslateProvince
    ]
})

export class AddressPipeModule {}
