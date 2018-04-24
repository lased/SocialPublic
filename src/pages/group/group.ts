import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { GroupProvider } from '../../providers/group/group';
import { Config } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';

@Auth('all')
@IonicPage({
  segment: 'group/:url'
})
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  url: string;
  urlApi: string;
  group: any = {};
  inGroup: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    private groupProvider: GroupProvider,
    private storageProvider: StorageProvider,
  ) {
    this.url = this.navParams.get('url');
    this.urlApi = Config.UrlApi;
  }

  ionViewDidLoad() {
    this.getGroup();
  }

  joinGroup(id){
    this.groupProvider.joinGroup(id).subscribe(data => {
      if(data['code'] == 200){
        this.inGroup = true;
      }
    })
  }

  getGroup() {
    this.groupProvider.getGroup(this.url).subscribe(data => {
      if (data['code'] == 200) {
        let i = 0;

        this.group = data['message'];  
        this.inGroup = false;
            
        while(i < this.group.users.length){
          let user = this.group.users[i];

          if(user.user.url == this.storageProvider.get('url')){
            this.inGroup =  true;
            break;
          }
          i++;
        }
      }
    });
  }

}
