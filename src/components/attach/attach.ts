import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

import { ListFilesComponent } from '../list-files/list-files';

@Component({
  selector: 'attach',
  templateUrl: 'attach.html'
})
export class AttachComponent {

  items: any;

  constructor(
    private modalCtrl: ModalController,
    private viewCtrl: ViewController
  ) {
    this.items = [
      { name: 'Фотографию', icon: 'md-camera', handler: e => this.photo(e) },
      { name: 'Документ', icon: 'md-document', handler: e => this.doc(e) },
    ]
  }

  photo(ev) {
    let modal = this.modalCtrl.create(ListFilesComponent, { type: 'images' });

    modal.onDidDismiss(data => {
      this.close(data);
    });
    modal.present();
  }
  doc(ev) {
    let modal = this.modalCtrl.create(ListFilesComponent, { type: 'docs' });

    modal.onDidDismiss(data => {
      this.close(data);
    });
    modal.present();
  }

  close(data = null){
    this.viewCtrl.dismiss(data);
  }

}
