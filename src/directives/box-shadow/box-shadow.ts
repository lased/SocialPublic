import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[box-shadow]'
})
export class BoxShadowDirective {
  element: ElementRef;

  constructor(
    private elementRef: ElementRef
  ) {
    this.element = this.elementRef.nativeElement;
    
    this.element['style']['box-shadow'] = '2px 2px 10px gray';
    this.element['style']['border-radius'] = '10px';
  }

}
