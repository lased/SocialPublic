import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertController, PopoverController } from 'ionic-angular';

import { AttachComponent } from '../attach/attach';
import { ChatProvider } from '../../providers/chat/chat';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {
  @Input('chat') chat;
  files: any = [];
  toggled: boolean = false;
  message: FormControl;

  constructor(
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private chatProvider: ChatProvider,
  ) {
  }

  sendMessage() {
    this.chatProvider.sendMessage(this.chat, this.message.value, this.files, 'chat').subscribe(data => {
      if (data.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * data.loaded / data.total);
      } else if (data instanceof HttpResponse) {
        if (data.body['code'] == 200) {
          this.message.reset();
          this.message.setValue("");
          this.files = [];
        }
      }
    })
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
              let file1 = data.files[i];
              let file2 = this.files[j];

              if (file1 instanceof File && file2 instanceof File)
                if (file2.name == file1.name)
                  bool = true;
              if (!(file1 instanceof File) && !(file2 instanceof File))
                if (file2.file.name == file1.file.name)
                  bool = true;
            }

            if (!bool)
              this.files.push(data.files[i]);
          }
    })
    popover.present({ ev });
  }

  ngOnInit() {
    this.message = new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(/\S+/)])
  }
  handleSelection(event) {
    this.message.setValue(this.message.value + " " + event.char);
  }

  removeFile(index) {
    this.files.splice(index, 1);
  }

}
