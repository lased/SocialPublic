import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[box-shadow]'
})
export class BoxShadowDirective {
  @Input('box-shadow-hidden') hidden;
  element: ElementRef;

  constructor(
    private elementRef: ElementRef
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.element['style']['box-shadow'] = '2px 2px 10px gray';
    this.element['style']['border-radius'] = '10px';

    if (this.hidden || this.hidden == undefined)
      this.element['style']['overflow'] = 'hidden';
  }

}
