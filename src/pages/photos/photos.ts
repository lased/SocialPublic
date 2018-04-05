import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ActionSheetController, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';
import { UserProvider } from '../../providers/user/user';
import { PreviewImageComponent } from '../../components/preview-image/preview-image';

@Auth()
@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  path: string;
  photos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private userProvider: UserProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actionCtrl: ActionSheetController,
    private toastCtrl: ToastController,
  ) {
  }

  presentAction(index) {
    this.actionCtrl.create({
      buttons: [
        {
          text: 'Сделать аватаром',
          handler: () => { this.setAvatar(index) }
        }, {
          text: 'Удалить',
          cssClass: 'delete',
          handler: () => { this.deletePhoto(index) }
        }, {
          text: 'Отмена',
          cssClass: 'cancel'
        }
      ]
    }).present();
  }

  deletePhoto(index) {
    this.userProvider.deletePhoto(this.photos[index]).subscribe(data => {
      let message;

      if(data['code'] == 200){
        message = 'Успешно выполнено';
        this.photos.splice(index, 1);
      } else {
        message = 'Произошла ошибка';
      }  
      
      this.toastCtrl.create({ message, duration: 3000 }).present();
    })
  }

  setAvatar(index) {    
    this.userProvider.setPhotoAvatar(this.photos[index]).subscribe(data => {
      let message;

      if(data['code'] == 200){
        message = 'Успешно выполнено';
      } else {
        message = 'Произошла ошибка';
      }  
      
      this.toastCtrl.create({ message, duration: 3000 }).present();      
    })
  }

  downloadImages(e) {
    let images = e.target.files;
    let err = false;

    for (let i = 0; i < images.length; i++) {
      if (!/^image\/(jpeg|png|jpg)$/.test(images[i].type)) {
        this.alertCtrl.create({
          message: 'Некоторые файлы не являются изображением',
          buttons: ['OK']
        }).present();

        err = true;
        break;
      }
    }

    if (!err) {
      this.modalCtrl.create(PreviewImageComponent, { images }).present();
    }
  }

  ionViewDidLoad() {
    this.refresh();
  }

  refresh(e = null){
    this.userProvider.getPhotos().subscribe(data => {
      if (data['code'] == 200) {
        this.path = data['message'].path;
        this.photos = data['message'].photos;
        e !== null ? e.complete() : '';
      }
    })
  }

}
