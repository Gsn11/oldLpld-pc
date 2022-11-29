import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SingleFileComponent } from './singleFile.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SingleFileComponent
    ],
    exports: [
        CommonModule,
        SingleFileComponent,
    ]
})

export class SinglefileModule { }
