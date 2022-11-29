import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crumbs',
  templateUrl: './crumbs.component.html',
  styleUrls: ['./crumbs.component.scss']
})
export class CurmbsComponent {
  @Input() crumbs: object;
  constructor(
    private router: Router
  ) {}

  gotoLink(index: number) {
    if (this.crumbs[index].open === true && this.crumbs[index].url !== '') {
      this.router.navigate(['index/' + this.crumbs[index].url]);
      return;
    }
  }
}
