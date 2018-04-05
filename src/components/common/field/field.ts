import { Component, Input } from '@angular/core';

@Component({
  selector: 'field',
  templateUrl: 'field.html'
})
export class FieldComponent {
  @Input('label') label;  
  @Input('type') type;
  @Input('value') value;
  @Input('control') control;
  @Input('name') name;

  constructor() {    
  }


}
