import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map.component';

const exportsModules = [
    MapComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MapComponent
    ],
    exports: [ exportsModules ]
})

export class MapModule {}
