import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { Config } from '../../config';
import { ListFriendsComponent } from '../../components/list-friends/list-friends';

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
    private modalCtrl: ModalController,
  ) {
  }

  openChat(chat) {
    this.navCtrl.push('ChatPage', { chat });
  }

  createChat() {
    let modal = this.modalCtrl.create(ListFriendsComponent);

    modal.onDidDismiss((data) => {
      console.log(data);
      
    })
    modal.present();
  }

  ionViewDidLoad() {
    this.chatProvider.getChats().subscribe(data => {
      if (data['code'] == 200) {
        this.chats = data['message']['chats'];
      }
    })
  }

}
