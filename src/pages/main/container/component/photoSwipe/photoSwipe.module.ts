import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoSwipeComponent } from './photoSwipe.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PhotoSwipeComponent,
    ],
    exports: [
        CommonModule,
        PhotoSwipeComponent,
    ]
})

export class PhotoSwipeModule { }
