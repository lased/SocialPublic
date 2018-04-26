import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { GroupProvider } from '../../providers/group/group';
import { Config } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';

@Auth()
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {
  groups: any;
  urlApi: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController,
    private groupProvider: GroupProvider,
    private storageProvider: StorageProvider,
  ) {
    this.urlApi = Config.UrlApi;
  }

  leaveGroup(id) {
    this.groupProvider.leaveGroup(id).subscribe(data => {
      if (data['code'] == 200)
        this.getGroups();
    })
  }

  goToGroup(url) {
    this.navCtrl.push('GroupPage', { url });
  }

  getGroups() {
    this.groupProvider.getUserGroups().subscribe(data => {
      if (data['code'] == 200){
        this.groups = data['message'];

        for (let i = 0; i < this.groups.length; i++) {
          for (let j = 0; j < this.groups[i].users.length; j++) {
            let user = this.groups[i].users[j];

            if(user.user.url == this.storageProvider.get('url')){
              this.groups[i].main = true;
              break;
            }

            this.groups[i].main = false;
          }          
        }        
      }
    })
  }

  ionViewDidLoad() {
    this.getGroups();
  }

  createGroup() {
    this.alertCtrl.create({
      title: 'Создание группы',
      subTitle: 'Введите название группы',
      inputs: [
        {
          name: 'name',
          placeholder: 'Название'
        },
        {
          name: 'description',
          placeholder: 'Описание'
        }
      ],
      buttons: [
        {
          text: 'Отмена'
        },
        {
          text: 'Создать',
          handler: data => {
            let len = 5;

            if (data.name.length < len) {
              this.alertCtrl.create({
                title: 'Ошибка',
                subTitle: `Название должно иметь длину больше ${len} сим.`,
                buttons: ['OK']
              }).present();
            } else {
              this.groupProvider.createGroup(data).subscribe(data => {
                if(data['code'] == 200)
                  this.getGroups();
              });
            }
          }
        }
      ]
    }).present();
  }
}