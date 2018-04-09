import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  chat: any;
  url: any;
  chatId: any;

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
    this.chatId = JSON.parse(this.storageProvider.get('chats'))[this.chat];   
  }

  check(url1, url2){
    return url1 != url2;    
  }

  ionViewCanLeave(){
    this.socketProvider.emit('leave chat', this.chatId);    
    
    return true;
  }

  ionViewDidLoad() {
    this.socketProvider.emit('join chat', this.chatId);    
    
    this.chatProvider.getMessages(this.chatId).subscribe(data => {
      if (data['code'] == 200)
        this.chat = data['message'];
    })
  }

}
