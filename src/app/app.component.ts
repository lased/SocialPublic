import { Component } from '@angular/core';
import { Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketProvider } from '../providers/socket/socket';
import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';
import { AvatarComponent } from '../components/popovers/avatar/avatar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';

  constructor(
    public platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private popoverCtrl: PopoverController,
    private socketProvider: SocketProvider,
    public authProvider: AuthProvider,
    public storageProvider: StorageProvider
  ) {    
    this.socketProvider.connect();
    this.init();    
  }

  init() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getAvatar(){    
    return `"${this.storageProvider.get('avatar')}"`;
  }

  openMore(event){    
    this.popoverCtrl.create(AvatarComponent).present({
      ev: event
    });
  }

}

