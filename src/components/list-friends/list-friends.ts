import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { Config } from '../../config';
import { ChatProvider } from '../../providers/chat/chat';

@Component({
  selector: 'list-friends',
  templateUrl: 'list-friends.html'
})
export class ListFriendsComponent {
  apiUrl: string = Config.UrlApi;
  users: any = {};
  friends: any;
  name: string = '';

  constructor(
    private viewCtrl: ViewController,
    private userProvider: UserProvider,
    private chatProvider: ChatProvider,
  ) {
    this.userProvider.getFriends().subscribe(data => {
      if (data['code'] == 200) {
        this.friends = data['message'];
      }
    })
  }

  isEmpty() {
    return Object.keys(this.users).length == 0 || this.name.length == 0 ? true : false;
  }

  selectUsers() {
    this.chatProvider.createChat({ users: this.users, name: this.name }).subscribe(data => {
      this.viewCtrl.dismiss();
    })
  }

}
