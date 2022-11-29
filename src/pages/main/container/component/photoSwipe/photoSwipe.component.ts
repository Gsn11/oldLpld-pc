import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as PhotoSwipe from 'PhotoSwipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

@Component({
  selector: 'app-photoswipe',
  templateUrl: './photoSwipe.component.html',
  styleUrls: ['./photoSwipe.component.scss'],
})
export class PhotoSwipeComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit() {
  }
  open(images: PhotoSwipe.Item[], options?: any) {
    this.cd.detectChanges();
    const pswpEle: any = document.querySelectorAll('.pswp')[0];
    // define options (if needed)
    if (!options) {
      options = {
        // optionName: 'option value' for example:
        index: 0 // start at first slide
      };
    }
    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(pswpEle, PhotoSwipeUI_Default, images, options);
    gallery.init();
  }
}
