import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertController, PopoverController } from 'ionic-angular';

import { AttachComponent } from '../attach/attach';
import { FormControl, Validators } from '@angular/forms';
import { GroupProvider } from '../../providers/group/group';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'submit-post-box',
  templateUrl: 'submit-post-box.html'
})
export class SubmitPostBoxComponent {
  @Input('group') group;
  @Output('add-post') addP = new EventEmitter();
  files: any = [];
  post: any;
  toggled: boolean = false;

  constructor(
    private groupProvider: GroupProvider,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
  ) {
  }

  addPost() {
    this.groupProvider.addPost(this.group, this.post.value, this.files).subscribe(data => {
      if (data.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * data.loaded / data.total);
      } else if (data instanceof HttpResponse) {
        if (data.body['code'] == 200) {
          this.post.reset();
          this.post.setValue("");
          this.files = [];
          this.addP.emit(data.body['message']);
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
    this.post = new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(/\S+/)])
  }

  handleSelection(event) {
    this.post.setValue(this.post.value + " " + event.char);
  }

  removeFile(index) {
    this.files.splice(index, 1);
  }

}
