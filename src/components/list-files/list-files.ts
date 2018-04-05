import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'list-files',
  templateUrl: 'list-files.html'
})
export class ListFilesComponent {
  type: string;
  files: any;
  path: string;

  constructor(
    public navParams: NavParams,
    private userProvider: UserProvider,
    private viewCtrl: ViewController
  ) {
    this.type = this.navParams.get('type');
  }

  selectedFile(ev) {
    let files;

    if (ev.target !== undefined)
      files = ev.target.files;
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
