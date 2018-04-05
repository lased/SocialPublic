import { Component } from '@angular/core';
import { ViewController, PopoverController, AlertController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';

import { AttachComponent } from '../attach/attach';
import { ChatProvider } from '../../providers/chat/chat';
import { FormClass } from '../../class/form';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'box-message',
  templateUrl: 'box-message.html'
})
export class BoxMessageComponent extends FormClass {
  toggled: boolean = false;
  message: FormControl;
  modalCtrl: any;

  id: any;
  files: any = [];

  constructor(
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private chatProvider: ChatProvider,
  ) {
    super();
    this.id = this.navParams.get('id');
  }

  ngOnInit(){
    this.message = new FormControl('', [Validators.required, Validators.minLength(5)])
  }

  sendMessage() {
    this.chatProvider.sendMessage(this.id, this.message.value, this.files, 'box').subscribe(data => {
      if (data.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * data.loaded / data.total);
      } else if (data instanceof HttpResponse) { 
        //Добавить loader
      }
    })
  }

  removeFile(index) {
    this.files.splice(index, 1);
  }

  attach(ev) {
    let popover = this.popoverCtrl.create(AttachComponent);

    popover.onDidDismiss(data => {
      if (data != null)
        if (this.files.length + data.files.length > 5)
          this.alertCtrl.create({
            message: 'Больше 5 файлов загружать нельзя',
            buttons: ['OK']
          }).present();
        else
          for (let i = 0; i < data.files.length; i++) {
            let bool = false;

            for (let j = 0; j < this.files.length; j++) {
              if (this.files[j].name == data.files[i].name)
                bool = true;
            }

            if (!bool)
              this.files.push(data.files[i]);
          }
    })
    popover.present({ ev });
  }

  handleSelection(event) {
    this.message.setValue(this.message.value + " " + event.char);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
