import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { SocketProvider } from '../../providers/socket/socket';

@Auth('all')
@IonicPage({
  segment: 'user/:url'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  url: string;
  user: any = {};
  isFriend: boolean = false;
  status: boolean;
  input: boolean;

  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public userProvider: UserProvider,
    public socketProvider: SocketProvider,
    public storageProvider: StorageProvider,
    public platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.url = navParams.get('url');
    this.loader = this.loadingCtrl.create();
    this.loader.present();
  }

  ionViewDidLoad() {
    this.getUser();
  }

  addToFriend(id) {
    if (!this.isFriend) {
      this.userProvider.addFriend(id).subscribe(data => {
        if (data['code'] == 200) {
          let friends = JSON.parse(this.storageProvider.get('friends'));

          friends.push({
            _id: id,
            status: null,
            input: false
          });
          this.isFriend = true;
          this.storageProvider.set('friends', JSON.stringify(friends))
          this.toastCtrl.create({
            message: 'Заявка успешно отправлена',
            duration: 3000
          }).present();
        }
      });
    }
  }
  sendMessage(id) {

  }

  friend(id) {
    if (this.authProvider.isLoggedIn()) {
      let index = 0;
      let friends = JSON.parse(this.storageProvider.get('friends'));

      while (index < friends.length) {        
        if (id == friends[index]._id) {
          this.isFriend = true;
          this.input = friends[index].input;
          this.status = friends[index].status;
          break;
        }
        index++;
      }
    }
  }

  getUser() {
    this.userProvider.getUser(this.url).subscribe(data => {
      this.user = data['message'];
      this.friend(this.user._id);
      this.loader.dismiss();
    })
  }

}
