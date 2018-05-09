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
import { ManageSheduleComponent, FullSheduleComponent } from '../../components/manage-shedule/manage-shedule';
import { IShedule } from '../../providers/shedule/shedule.model';
import { SheduleProvider } from '../../providers/shedule/shedule';

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
  randUsers: any;
  inGroup: boolean;
  main: boolean;

  menu: string = 'now';

  timer: any;
  timeNow: string;
  weeks: boolean;
  currentShedule: any;
  currentSheduleOfDay: any;
  day: number;
  dayWeek: Array<string>;

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
    private sheduleProvider: SheduleProvider,
  ) {
    this.url = this.navParams.get('url');
    this.urlApi = Config.UrlApi;

    this.dayWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  }

  removePost(post, index) {
    this.groupProvider.removePost(this.group._id, post).subscribe(data => {
      if (data['code'] == 200) {
        this.group.posts.splice(index, 1);
      }
    });
  }

  isImage(str) {
    if (/\.(jpg|png|jpeg|gif)$/.test(str))
      return true;
    return false;
  }

  addPost(ev) {
    this.group.posts.unshift(ev);
  }

  goToProfile(url) {
    this.navCtrl.push('ProfilePage', { url });
  }

  openFullShedule() {
    this.modalCtrl.create(FullSheduleComponent, { shedule: this.group.shedule }).present();
  }

  moment() {
    let now = new Date();
    let startYear = now.getMonth() <= 7 ? now.getFullYear() - 1 : now.getFullYear();
    let startDate = new Date(startYear + '-9-1');
    let diff;

    startDate = startDate.getDay() != 1 ? new Date(+startDate - (startDate.getDay() - 1) * 86400000) : startDate;
    diff = +now - +startDate;

    this.weeks = Boolean(Math.floor(diff / 604800000 + 1) % 2);
    this.timeNow = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`;

    let index = -1;
    let weekNow = this.weeks ? 'topWeek' : 'lowerWeek';

    this.day = now.getDay() == 0 ? 6 : now.getDay() - 1;
    this.currentSheduleOfDay = this.group.shedule[weekNow][this.day];

    if (this.group.shedule[weekNow][this.day] != undefined)
      index = this.group.shedule[weekNow][this.day].findIndex(el => {
        if (el != null)
          return this.timeNow >= el.startTime && this.timeNow <= el.endTime || this.timeNow < el.startTime;
        return 0;
      });

    if (index == -1) {
      this.currentShedule = null;
    } else {
      this.currentShedule = this.group.shedule[weekNow][this.day][index];
    }
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
                  type: 'file',
                  name: 'Импортировать расписание',
                  handler: (ev) => {
                    this.importShedule(ev);
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

    modal.onDidDismiss(() => {
      this.moment();
    })

    modal.present();
  }

  importShedule(ev) {
    let file = ev.target.files[0];

    if (!file) {
      return;
    }

    let reader = new FileReader();
    let t = this;

    reader.onload = function (e) {
      let shedule: IShedule = JSON.parse(this.result);

      t.group.shedule = shedule;
      t.sheduleProvider.import(t.group._id, shedule).subscribe();
      t.moment();
    };

    reader.readAsText(file);
  }

  exportShedule() {
    let a = document.createElement("a");
    let blob = new Blob([JSON.stringify(this.group.shedule)]);
    let filename = 'shedule.json';
    let url = URL.createObjectURL(blob);

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
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

    this.socketProvider.off('joinGroup');
    this.socketProvider.on('joinGroup').subscribe(data => {
      this.getGroup();
    });
  }

  leaveGroup(id) {
    this.groupProvider.leaveGroup(id).subscribe(data => {
      if (data['code'] == 200){
        this.inGroup = false;
        this.getGroup();
      }
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

        if (!!this.group.users) {
          let index = 0;

          this.randUsers = [];

          while (this.randUsers.length < 9 && this.group.users.length != this.randUsers.length) {
            let rand = Math.floor(Math.random() * (this.group.users.length));
            let i = this.randUsers.findIndex(el => {
              return el.user._id == this.group.users[rand].user._id;
            });

            if (i == -1)
              this.randUsers.push(this.group.users[rand]);
          }

          while (index < this.group.events.length) {
            this.group.events[index].startTime = new Date(this.group.events[index].startTime);
            this.group.events[index].endTime = new Date(this.group.events[index].endTime);
            index++;
          }

          this.moment();

          let t = this;

          this.timer = setInterval(() => {
            t.moment()
          }, 60000);

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
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
