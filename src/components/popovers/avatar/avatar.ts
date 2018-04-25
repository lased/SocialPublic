import { Component } from '@angular/core';
import { ViewController, ModalController, AlertController, NavParams } from 'ionic-angular';

import { PreviewImageComponent } from '../../preview-image/preview-image';

@Component({
  selector: 'avatar',
  templateUrl: 'avatar.html'
})
export class AvatarComponent {
  constructor(
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navParams: NavParams
  ) {
  }

  downloadImage(e) {
    let image = e.target.files[0];

    if (/^image\/(jpeg|png|jpg)$/.test(image.type)) {
      this.modalImage(image);
    } else {
      this.alertCtrl.create({
        message: 'Данный файл не является изображением',
        buttons: ['OK']
      }).present();
    }

    this.close();
  }

  modalImage(image) {
    let modal = this.modalCtrl.create(PreviewImageComponent, { image, type: this.navParams.get('type'), id: this.navParams.get('id') });

    modal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
