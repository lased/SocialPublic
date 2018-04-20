import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, ViewController } from 'ionic-angular';

import { Auth } from '../../decorators/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { Config } from '../../config';
import { ListFriendsComponent } from '../../components/list-friends/list-friends';
import { StorageProvider } from '../../providers/storage/storage';
import { SocketProvider } from '../../providers/socket/socket';

@Component({
  selector: 'chats-context-menu',
  template: `<button ion-button full clear (click)="removeChat()">Удалить</button>`,
})
export class ChatsContextMenuComponent {
  chat: any;

  constructor(
    private navParams: NavParams,
    private chatProvider: ChatProvider,
    private viewCtrl: ViewController,
  ) {
    this.chat = this.navParams.get('chat');
  }

  removeChat() {
    this.chatProvider.removeChat(this.chat).subscribe(data => {
      this.viewCtrl.dismiss(data);
    });
  }
}

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
    private popoverCtrl: PopoverController,
    private storageProvider: StorageProvider,
    private socketProvider: SocketProvider,
  ) {
  }

  onRightClick(ev, chat) {
    let popover = this.popoverCtrl.create(ChatsContextMenuComponent, { chat })

    popover.onDidDismiss(data => {

    });

    popover.present({ ev });

    return false;
  }

  openChat(chat) {
    let chats = JSON.parse(this.storageProvider.get('chats'));
    let index = chats.indexOf(chat);

    this.navCtrl.push('ChatPage', { chat: index });
  }

  createChat() {
    this.modalCtrl.create(ListFriendsComponent).present();
  }

  getChats(){
    this.chatProvider.getChats().subscribe(data => {
      if (data['code'] == 200) {
        this.chats = data['message']['chats'];
      }
    });
  }

  ionViewDidLoad() {
    this.getChats();

    this.socketProvider.off('chatsPageMessage');
    this.socketProvider.on('chatsPageMessage').subscribe(msg => {   
      this.getChats();
    });

    this.socketProvider.off('createChat');
    this.socketProvider.on('createChat').subscribe(data => {
      this.getChats();

      let chats = JSON.parse(this.storageProvider.get('chats'));

      chats.push(data);
      this.storageProvider.set('chats', JSON.stringify(chats))
    });
        
    this.socketProvider.off('deleteChat');
    this.socketProvider.on('deleteChat').subscribe(data => {
      let chats = JSON.parse(this.storageProvider.get('chats'));
      let index = chats.indexOf(data);

      chats.splice(index, 1);
      this.storageProvider.set('chats', JSON.stringify(chats));

      index = this.chats.findIndex(el => {
        return el._id == data;
      });
      this.chats.splice(index, 1);            
    });
  }

}
