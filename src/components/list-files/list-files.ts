import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { FileClass } from '../../class/file';

@Component({
  selector: 'list-files',
  templateUrl: 'list-files.html'
})
export class ListFilesComponent extends FileClass {
  type: string;
  files: any;
  path: string;

  constructor(
    public navParams: NavParams,
    private userProvider: UserProvider,
    private viewCtrl: ViewController
  ) {
    super();
    this.type = this.navParams.get('type');
  }

  selectedFile(ev) {
    let files;

    if (ev.target !== undefined) {
      files = ev.target.files;

      for (let i = 0; i < files.length; i++) {
        if (/^image.*/.test(files[i].type))
          this.toBase64(files[i]).then(data => files[i].base64 = data);
      }
    }
    else
      files = [{ path: this.path, name: ev }];
    this.viewCtrl.dismiss({ files });
  }

  close() {
    this.viewCtrl.dismiss(null);
  }

  ionViewDidLoad() {
    this.userProvider.getFiles(this.type).subscribe(data => {
      if (data['code'] == 200) {
        this.path = data['message']['path'];
        this.files = data['message']['files'];
      }
    })
  }

}
