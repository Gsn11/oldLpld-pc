import { Component } from '@angular/core';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {
  name: string;
  index: number;
  constructor() {
    this.index = 1;
    this.name = '简介';
  }

  chooseItem(index: number) {
    console.log(index);
    this.index = index;
  }

  translateChoose() {
    return 'translate(-' + (this.index - 1) * 100 + '%, 0)';
  }
}
