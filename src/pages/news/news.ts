import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { Config } from '../../config';

@Auth()
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  urlApi: string = Config.UrlApi;
  posts: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.userProvider.getNews().subscribe(data => {
      if (data['code'] == 200)
        this.posts = data['message'];
    });
  }

}
