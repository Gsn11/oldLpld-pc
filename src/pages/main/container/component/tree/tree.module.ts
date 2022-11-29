import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TreeComponent
    ],
    exports: [
        TreeComponent
     ]
})

export class TreeModule {}
