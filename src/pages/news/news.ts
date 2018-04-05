import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';

@Auth()
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
