import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { ChatProvider } from '../../providers/chat/chat';
import { Auth } from '../../decorators/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { SocketProvider } from '../../providers/socket/socket';

@Auth()
@IonicPage({
  segment: 'chat/:chat',
  defaultHistory: ['ChatsPage']
})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  chat: any;
  url: any;
  chatId: any;
  count: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
    private chatProvider: ChatProvider,
    private socketProvider: SocketProvider,
  ) {
    this.chat = this.navParams.get('chat');
    this.url = this.storageProvider.get('url');
  }

  check(message) {    
    if (message.from !== undefined && message.from !== null )
      return message.from.url == this.url
    else
      return null
  }

  scrollToBottom(num?) {
    if (num) {
      let content = this.content;
      setTimeout(() => {
        content.scrollToBottom(num);
      }, num);
    } else {
      this.content.scrollToBottom();
    }
  }

  sendMessage(ev) {
    this.scrollToBottom();
  }

  ionViewCanLeave() {
    this.socketProvider.emit('leave chat', this.chatId);

    return true;
  }

  ionViewDidLoad() {
    this.chatId = JSON.parse(this.storageProvider.get('chats'))[this.chat];
    this.socketProvider.emit('join chat', this.chatId);

    this.chatProvider.getMessages(this.chatId).subscribe(data => {
      if (data['code'] == 200) {
        this.chat = data['message'];
        this.count = this.chat.messages.length;
        this.scrollToBottom(1);
      }
    });

    this.socketProvider.off('chat message');
    this.socketProvider.on('chat message').subscribe(msg => {
      this.chat.messages.push(msg);
      this.scrollToBottom(1);
    });
  }

}
