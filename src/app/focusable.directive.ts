import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusable]'
})
export class FocusableDirective implements AfterViewInit {

  constructor(private host: ElementRef) { }

  ngAfterViewInit(): void {
    this.host.nativeElement.focus();
  }

}
