import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../../providers/auth/auth';
import { StorageProvider } from '../../../providers/storage/storage';

@Component({
  selector: 'menus',
  templateUrl: 'menus.html'
})
export class MenusComponent {
  @Input('nav') navCtrl: NavController;

  activePage: string = "NewsPage";
  pages: Array<any>;

  constructor(
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
  ) {

    this.pages = [
      { page: 'ProfilePage', title: 'Профиль', icon: 'ios-person-outline' },
      { page: 'FriendsPage', title: 'Друзья', icon: 'ios-contacts-outline' },
      { page: 'ChatsPage', title: 'Сообщения', icon: 'ios-mail-outline' },
      { page: 'GroupsPage', title: 'Группы', icon: 'ios-people-outline' },
      { page: 'PhotosPage', title: 'Фотографии', icon: 'ios-camera-outline' },
      { page: 'NewsPage', title: 'Новости', icon: 'ios-paper-outline' },
      { page: 'SettingsPage', title: 'Настройки', icon: 'ios-settings-outline' },
    ];

    let path = location.hash != "" ? location.hash.slice(2) : location.pathname.slice(1);

    if (path == "user/" + this.storageProvider.get('url')) {
      this.activePage = 'ProfilePage';
    } else {
      let name = path.split('/')[0];

      this.activePage = name[0].toUpperCase() + name.slice(1) + 'Page';
    }
  }

  openPage(name) {
    let params = {};

    if (name == 'ProfilePage') {
      params['url'] = this.storageProvider.get('url');
    }
    this.navCtrl.setRoot(name, params);
    this.activePage = name;
  }

  logout() {
    let t = this;

    setTimeout(() => {
      t.authProvider.logout();
      t.navCtrl.setRoot('LoginPage');
    }, 400);
  }

}
