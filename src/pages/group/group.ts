import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { GroupProvider } from '../../providers/group/group';
import { Config } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { PopoverComponent } from '../../components/popover/popover';
import { AvatarComponent } from '../../components/popovers/avatar/avatar';
import { SocketProvider } from '../../providers/socket/socket';
import { ManageSheduleComponent } from '../../components/manage-shedule/manage-shedule';

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
  main: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    private groupProvider: GroupProvider,
    private storageProvider: StorageProvider,
    private socketProvider: SocketProvider,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) {
    this.url = this.navParams.get('url');
    this.urlApi = Config.UrlApi;
  }

  isEmptyObject(obj) {
    if (!obj) return true;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }

    return true;
  }

  openPopover(ev) {
    this.popoverCtrl.create(PopoverComponent, {
      data: [
        {
          name: 'Изменить аватар',
          handler: () => {
            this.changeAvatarGroup();
          }
        },
        {
          name: 'Изменить данные',
          handler: () => {
            this.changeDataGroup();
          }
        },
        {
          name: 'Расписание',
          handler: () => {
            this.popoverCtrl.create(PopoverComponent, {
              data: [
                {
                  name: 'Импортировать расписание',
                  handler: () => {
                    this.importShedule();
                  }
                },
                {
                  name: 'Управление расписанием',
                  handler: () => {
                    this.manageShedule();
                  }
                },
                {
                  name: 'Экспортировать расписание',
                  handler: () => {
                    this.exportShedule();
                  }
                },
              ]
            }).present({ ev });
          }
        },
        {
          name: 'Удалить группу',
          handler: () => {
            this.deleteGroup();
          }
        }
      ]
    }).present({ ev })
  }

  manageShedule() {
    let shedule = this.isEmptyObject(this.group.shedule) ? null : this.group.shedule;
    let modal = this.modalCtrl.create(ManageSheduleComponent, {
      id: this.group._id,
      shedule
    })
    
    modal.present();
  }

  importShedule() {

  }

  exportShedule() {

  }

  changeAvatarGroup() {
    this.modalCtrl.create(AvatarComponent, { type: 'group', id: this.group._id }).present();
    this.socketProvider.off('group ' + this.group._id + ' avatar');
    this.socketProvider.on('group ' + this.group._id + ' avatar').subscribe(data => {
      this.group.avatar = data;
    })
  }

  changeDataGroup() {
    this.alertCtrl.create({
      title: 'Изменение данных',
      inputs: [
        {
          name: 'name',
          placeholder: 'Название',
          value: this.group.name
        },
        {
          name: 'url',
          placeholder: 'Адрес',
          value: this.group.url
        },
        {
          name: 'description',
          placeholder: 'Описание',
          value: this.group.description
        }
      ],
      buttons: [
        'Отмена',
        {
          text: 'Сохранить',
          handler: (data) => {
            let params = {
              buttons: ['OK']
            };

            data.id = this.group._id;

            if (/^id[0-9]+$/.test(data.url) && data.url != this.group.url || data.url.length < 3 && data.url.length != 0) {
              params['title'] = 'Ошибка';
              params['message'] = data.url.length < 3 ? 'Адрес должен быть больше 3 символов' : 'Адрес группы не должен иметь данный вид: id1...';
              this.alertCtrl.create(params).present();
            } else if (data.name.length < 5) {
              params['title'] = 'Ошибка';
              params['message'] = 'Название должно быть больше 5 символов';
              this.alertCtrl.create(params).present();
            } else {
              this.groupProvider.updateDataGroup(data).subscribe(data => {
                if (data['code'] == 200) {
                  this.group.name = data['message'].name;
                }
              });
            }
          }
        }
      ]
    }).present();
  }

  deleteGroup() {
    this.groupProvider.deleteGroup(this.group._id).subscribe(data => {
      if (data['code'] == 200) {
        this.navCtrl.setRoot('GroupPage', { url: this.url });
      }
    });
  }

  ionViewDidLoad() {
    this.getGroup();
  }

  leaveGroup(id) {
    this.groupProvider.leaveGroup(id).subscribe(data => {
      if (data['code'] == 200)
        this.inGroup = false;
    })
  }

  joinGroup(id) {
    this.groupProvider.joinGroup(id).subscribe(data => {
      if (data['code'] == 200) {
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
        this.main = false;

        if (!!this.group.users)
          while (i < this.group.users.length) {
            let user = this.group.users[i];

            if (user.user.url == this.storageProvider.get('url')) {
              this.inGroup = true;
              this.main = user.main;
              break;
            }
            i++;
          }
      }
    });
  }

}
