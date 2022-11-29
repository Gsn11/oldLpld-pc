import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(
    private router: Router,
  ) {}

  gotologin() {
    this.router.navigate(['/login', { type: 'lpld' }]);
  }

  gotoIntroduce() {
    this.router.navigate(['']);
  }

  toDetailes(link: string) {
    this.router.navigate([link]);
  }
}
