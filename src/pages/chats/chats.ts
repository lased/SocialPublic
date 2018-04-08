import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { Config } from '../../config';

@Auth()
@IonicPage({
  segment: 'chats/:id'
})
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chats: any;
  apiUrl: string = Config.UrlApi;
  month: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private chatProvider: ChatProvider,
  ) {
    this.month = [
      "янв", "фев", "мар", "апр", "май", "июн",
      "июл", "авг", "сен", "окт", "нояб", "дек"
    ]
  }

  openChat(chat) {
      this.navCtrl.push('ChatPage', { chat });
  }

  getDate(d) {
    let date = new Date(d);
    let now = new Date();
    let str = "";

    if (now.getDate() > date.getDate() && now.getFullYear() == date.getFullYear()) {
      str += date.getDate() + ' ' + this.month[date.getMonth()];
    } else if (now.getFullYear() > date.getFullYear()) {
      str += date.getDate() + ' ' + this.month[date.getMonth()] + ' ' + date.getFullYear();
    } else {
      str += date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    }

    return str;
  }

  ionViewDidLoad() {
    this.chatProvider.getChats().subscribe(data => {
      if (data['code'] == 200) {
        this.chats = data['message']['chats'];
      }
    })
  }

}
