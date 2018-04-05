import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { Config } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { BoxMessageComponent } from '../../components/box-message/box-message';

@Auth()
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  urlApi: string = Config.UrlApi;
  tab: string = 'list';
  loader: any;
  friends: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public userProvider: UserProvider,
    public storageProvider: StorageProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) {
  }

  sendMessage(id) { 
    this.modalCtrl.create(BoxMessageComponent, { id }).present();
  }
  deleteFriend(id, index) {
    this.userProvider.cancelAddFriend(id).subscribe(data => {
      if (data['code'] == 200) {
        let friends = JSON.parse(this.storageProvider.get('friends'));
        let i;

        i = friends.findIndex((el) => {
          return el._id == id;
        });

        friends.splice(i, 1);
        this.friends.list.splice(index, 1);

        this.storageProvider.set('friends', JSON.stringify(friends))
        this.toast('Пользователь удален из друзей');
      }
    });
  }
  confirmAddFriend(id, index) {
    this.userProvider.confirmAddFriend(id).subscribe(data => {
      if (data['code'] == 200) {
        let friends = JSON.parse(this.storageProvider.get('friends'));
        let i;

        i = friends.findIndex((el) => {
          return el._id == id;
        });

        friends[i].status = true;
        this.friends.list.push(this.friends.input[index]);
        this.friends.input.splice(index, 1);
        this.storageProvider.set('friends', JSON.stringify(friends));
        this.toast('Заявка успешно принята');
      }
    });

  }
  cancelAddFriend(id, index, type) {
    this.userProvider.cancelAddFriend(id).subscribe(data => {
      if (data['code'] == 200) {
        let friends = JSON.parse(this.storageProvider.get('friends'));
        let i;

        i = friends.findIndex((el) => {
          return el._id == id;
        });

        friends.splice(i, 1);
        type == 'input' ? this.friends.input.splice(index, 1) : this.friends.output.splice(index, 1);

        this.storageProvider.set('friends', JSON.stringify(friends))
        this.toast('Заявка успешно отменена');
      }
    })
  }

  toast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).present();
  }

  getFriends(e = null) {
    this.userProvider.getFriends().subscribe(data => {
      let friends = data['message'];

      this.friends = {
        list: [],
        input: [],
        output: []
      };

      for (let i = 0; i < friends.length; i++) {
        let friend = Object.assign({}, friends[i]);

        if (friend.status) {
          this.friends.list.push(friend);
        } else if (friend.status == null && friend.input) {
          this.friends.input.push(friend);
        } else if (friend.status == null && !friend.input) {
          this.friends.output.push(friend);
        }

        friends[i]._id = friends[i]._id._id;
      }

      this.storageProvider.set('friends', JSON.stringify(friends));
      e !== null ? e.complete() : '';
    });
  }
  ionViewDidLoad() {
    this.getFriends();
  }

}
