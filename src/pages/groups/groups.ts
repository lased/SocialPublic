import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { GroupProvider } from '../../providers/group/group';

@Auth()
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {
  groups: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController,
    private groupProvider: GroupProvider
  ) {
  }

  getGroups() {
    this.groupProvider.getUserGroups().subscribe(data => {
      if (data['code'] == 200)
        this.groups = data['message'];
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
              this.groupProvider.createGroup(data).subscribe();
            }
          }
        }
      ]
    }).present();
  }
}