import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';

@Auth('-g')
@IonicPage({
  defaultHistory: [
    'LoginPage'
  ]
})
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider
  ) {
  }

}
