import { Component } from '@angular/core';
import { ViewController, PopoverController, AlertController } from 'ionic-angular';
import { AttachComponent } from '../attach/attach';

@Component({
  selector: 'box-message',
  templateUrl: 'box-message.html'
})
export class BoxMessageComponent {
  toggled: boolean = false;
  message: string = "";
  modalCtrl: any;
  files: any = [];

  constructor(
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
  ) {
  }

  attach(ev) {
    let popover = this.popoverCtrl.create(AttachComponent);

    popover.onDidDismiss(data => {
      //Проверить на наличие дублей      
      if (data != null)
        if (this.files.length + data.files.length > 5)
          this.alertCtrl.create({
            message: 'Больше 5 файлов загружать нельзя',
            buttons: ['OK']
          }).present();
        else
          for (let i = 0; i < data.files.length; i++)
            this.files.push(data.files[i]);

      console.log(this.files);

    })
    popover.present({ ev });
  }

  handleSelection(event) {
    this.message = this.message + " " + event.char;
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
