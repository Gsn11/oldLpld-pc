import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TreeCheckItemComponent } from './treeCheckItem.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ],
    declarations: [
        TreeCheckItemComponent
    ],
    exports: [
        TreeCheckItemComponent
     ]
})

export class TreeCheckItemModule {}
