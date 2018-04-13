import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input('title') title;
  @Input('type') type;

  constructor(
    private viewCtrl: ViewController
  ) {
  }

  close(){
    this.viewCtrl.dismiss();
  }


}
