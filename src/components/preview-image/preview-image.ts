import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'preview-image',
  templateUrl: 'preview-image.html'
})
export class PreviewImageComponent {
  images: any = [];
  imageFile: any;
  isMultiple: boolean = false;
  photos: any;

  constructor(
    private navParams: NavParams,
    private userProvider: UserProvider,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.imageFile = this.navParams.get('image') || this.navParams.get('images');

    let reader = new FileReader(), t = this;
    let loader = this.loadingCtrl.create();
    let len = this.imageFile.length

    if (len > 1) {
      this.isMultiple = true;
    }

    loader.present();
    reader.onloadend = function () {
      t.images.push(reader.result);
      loader.dismiss()
    }

    if (this.isMultiple) {
      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          reader = new FileReader();
          reader.onloadend = function () {
            t.images.push(reader.result);
            len == 1 ? loader.dismiss() : len--;
          }
          reader.readAsDataURL(this.imageFile[i]);
        }, 200 * (i + 1));
      }
    } else {
      len == 1 ? reader.readAsDataURL(this.imageFile[0]) : reader.readAsDataURL(this.imageFile);
    }
  }

  uploadImage() {
    let loader = this.loadingCtrl.create()

    loader.present();
    if (!this.isMultiple && this.imageFile.length == undefined) {
      this.userProvider.setAvatar(this.imageFile).subscribe(data => {
        if (data.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * data.loaded / data.total);
          loader.setContent(percentDone + '% выполнено');
        } else if (data instanceof HttpResponse) {
          let message;

          loader.dismiss();
          if (data.body['code'] == 200) {
            message = 'Успешно выполнено';
            this.close();
          } else if(data.body['code'] == 302){
            message = 'Данная фотография уже загружена';  
            this.close();          
          } else {
            message = 'Произошла ошибка';
          }

          this.alertCtrl.create({
            message,
            buttons: ['OK']
          }).present();
        }
      })
    } else {      
      this.userProvider.addPhotos(this.imageFile).subscribe(data => {
        if (data.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * data.loaded / data.total);
          loader.setContent(percentDone + '% выполнено');
        } else if (data instanceof HttpResponse) {
          let message;

          loader.dismiss();
          if (data.body['code'] == 200) {
            message = 'Успешно выполнено';
            this.close();
          } else {
            message = 'Произошла ошибка';
          }

          this.alertCtrl.create({
            message,
            buttons: ['OK']
          }).present();
        }
      })
    }    
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
