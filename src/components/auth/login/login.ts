import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormClass } from '../../../class/form';
import { UserProvider } from '../../../providers/user/user';
import { NavController } from 'ionic-angular';
import { StorageProvider } from '../../../providers/storage/storage';
import { SocketProvider } from '../../../providers/socket/socket';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent extends FormClass implements OnInit {
  form: FormGroup;
  authError: boolean;
  accessError: boolean;

  constructor(
    private userProvider: UserProvider,
    public navCtrl: NavController,
    private storageProvider: StorageProvider,
    private socketProvider: SocketProvider,
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64)
      ])
    });
  }

  login() {
    this.userProvider.login(this.form.value).subscribe(res => {
      if (res['code'] == 200) {
        let data = res['message'];

        this.authError = false;
        this.accessError = false;

        this.storageProvider.set('avatar', data.avatar);
        this.storageProvider.set('name', data.name);
        this.storageProvider.set('surname', data.surname);
        this.storageProvider.set('url', data.url);
        this.storageProvider.set('token', data.token);
        this.storageProvider.set('state', data.state);
        this.storageProvider.set('friends', JSON.stringify(data.friends));

        this.socketProvider.connect();
        this.navCtrl.setRoot('NewsPage');          
      } else if (res['code'] == 510) {
        this.authError = false;
        this.accessError = true;
      } else {
        this.accessError = false;
        this.authError = true;
      }
    })
  }

}
