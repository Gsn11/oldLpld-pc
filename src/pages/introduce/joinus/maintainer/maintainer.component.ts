import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintainer',
  templateUrl: './maintainer.component.html',
  styleUrls: ['./maintainer.component.scss']
})
export class MaintainerComponent {
  constructor(
    private router: Router,
  ) {}

  goWlyPlantPage() {
    this.router.navigate(['home']);
  }
}
