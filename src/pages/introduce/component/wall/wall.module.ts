import { NgModule } from '@angular/core';
import { WallComponent } from './wall.component';

@NgModule({
  declarations: [
    WallComponent,
  ],
  exports: [
    WallComponent
  ]
})
export class WallModule { }
