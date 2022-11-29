import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-thirdpartyurl',
  templateUrl: './thirdPartyUrl.component.html',
  styleUrls: ['./thirdPartyUrl.component.scss'],
})

export class ThirdPartyUrlComponent implements OnInit {
  src: any;

  constructor(
    private activateInfo: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.activateInfo.queryParams.subscribe(param => {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(param.src);
    });
  }

  ngOnInit() {
  }
}
