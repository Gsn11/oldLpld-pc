import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent implements OnInit {
  index: number;
  translate: string;
  constructor(private router: Router) {
    this.index = 1;
    this.translate = 'translate(0, 0)';
  }
  ngOnInit(): void {
    if (location.port === '11181') {
      this.router.navigate(['login/']);
    }
  }

  over(index: number) {
    this.index = index;
    this.translate = 'translate(-' + (this.index - 1) * 100 + '%, 0)';
  }
}
