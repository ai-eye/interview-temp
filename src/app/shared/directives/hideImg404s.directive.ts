import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "img[hideImg404s]",
})
export class HideImg404sDirective {
  constructor(private el: ElementRef) {}

  @HostListener("error")
  private onError() {
    this.el.nativeElement.style.display = "none";
  }
}