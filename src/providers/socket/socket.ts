import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

import { Config } from '../../config';
import { StorageProvider } from '../storage/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class SocketProvider {
  private socket: any;

  constructor(
    private storageProvider: StorageProvider,
    private platform: Platform
  ) {
  }

  connect() {
    let options = {};
    let token = this.storageProvider.get('token');

    options['query'] = {
      token,
      mobile: this.platform.is('mobile'),
      desktop: this.platform.is('core')
    }

    if (this.socket) {
      this.disconnect();
    }

    if (token !== null) {
      this.socket = io(Config.UrlApi, options);
      this.init();
    }
  }

  emit(name, data){
    this.socket.emit(name, data);
  }

  on(name): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(name, (data) => observer.next(data));
    });
  }

  init() {
    this.setAvatar();
    this.updateInitials();
    this.updateUrl();
  }

  setAvatar() {
    this.on('setAvatar').subscribe(data => {
      this.storageProvider.set('avatar', data);
    })
  }

  updateInitials() {
    this.on('updateInitials').subscribe(data => {
      this.storageProvider.set('name', data.name);
      this.storageProvider.set('surname', data.surname);
    })
  }

  updateUrl() {
    this.on('updateUrl').subscribe(data => {
      this.storageProvider.set('url', data.url);
    })
  }

  disconnect() {
    this.socket.disconnect();
  }

}
