import { Directive, Input, HostBinding, HostListener, OnChanges } from '@angular/core';

@Directive({
  selector: 'img[errorImage]'
})
export class ErrorImageDirective implements OnChanges {
  @Input('errorImage') errorImageUrl!: string; // Input for the error image URL
  @Input() src!: string; // Input for the main image source

  @HostBinding('src') mainImageSrc: string; // Bind the src attribute of the image

  constructor() {
    this.mainImageSrc = ''; // Initialize the src attribute
  }

  ngOnChanges() {
    this.mainImageSrc = this.src; // Update the src attribute when the input src changes
  }

  @HostListener('error')
  onError() {
    // If the image fails to load, set the src to the error image URL
    if (this.errorImageUrl) {
      this.mainImageSrc = this.errorImageUrl;
    }
  }
}
