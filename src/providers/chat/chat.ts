import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../../config';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class ChatProvider {
  token: string;

  constructor(
    public http: HttpClient,
    private storageProvider: StorageProvider
  ) {
    this.token = this.storageProvider.get('token');
  }

  getMessages(chat){    
    return this.http.get(Config.UrlApi + '/api/user/chat?token=' + this.token + '&chat=' + chat);    
  }

  getChats() {
    return this.http.get(Config.UrlApi + '/api/user/chats?token=' + this.token);
  }

  sendMessage(id, msg, files, type) {
    let fd = new FormData()
    let downloaded = [];

    fd.append('token', this.token);
    fd.append('message', msg);
    fd.append('id', id);
    fd.append('type', type);
    for (let i = 0; i < files.length; i++) {
      files[i] instanceof File ? fd.append('uploadedFiles', files[i]) : downloaded.push(files[i]);
    }

    fd.append('downloadedFiles', JSON.stringify(downloaded))

    const req = new HttpRequest('POST', Config.UrlApi + '/api/user/chat/message', fd, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  createChat(data){
    data.token = this.token;
    
    return this.http.post(Config.UrlApi + '/api/user/chat', data);
  }
}
