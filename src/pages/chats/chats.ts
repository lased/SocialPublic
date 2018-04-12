import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { Config } from '../../config';

@Auth()
@IonicPage()
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
  }

  openChat(chat) {
    this.navCtrl.push('ChatPage', { chat });
  }

  ionViewDidLoad() {
    this.chatProvider.getChats().subscribe(data => {
      if (data['code'] == 200) {
        this.chats = data['message']['chats'];
      }
    })
  }

}
