import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  data: any;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.data = this.navParams.get('data');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
