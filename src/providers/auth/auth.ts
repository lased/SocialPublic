import { Injectable } from '@angular/core';

import { UserProvider } from '../user/user';
import { StorageProvider } from '../storage/storage';
import { SocketProvider } from '../socket/socket';

@Injectable()
export class AuthProvider {
  loggedIn: boolean = false;

  constructor(
    private userProvider: UserProvider,
    private storageProvider: StorageProvider,
    private socketProvider: SocketProvider
  ) {
  }
  
  checkAuth() {
    return this.userProvider.checkAuth();
  }
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
    this.socketProvider.disconnect();
    this.storageProvider.clear();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}


