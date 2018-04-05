import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { FormClass } from '../../../class/form';
import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'forget',
  templateUrl: 'forget.html'
})
export class ForgetComponent extends FormClass implements OnInit {

  form: FormGroup;
  forgetError: boolean;

  constructor(
    private userProvider: UserProvider,
    private alertCtrl: AlertController
  ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255) 
      ])
    });
  }

  forget() {
    this.userProvider.forget(this.form.value).subscribe(res => {
      this.form.reset();

      if (res['code'] == 200) {
        this.forgetError = false;
        this.alertCtrl.create({
          title: 'Восстановление аккаунта',
          subTitle: 'Новый пароль выслан по почте. Если письмо с паролем долго не приходит, проверьте папку "Спам"',
          buttons: [{
            text: "ОК",
            handler: () => {
              window.location.href = '/';
            }
          }]
        }).present();
      } else {
        this.forgetError = true;
      }
    });
  }

}
