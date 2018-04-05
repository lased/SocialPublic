import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormClass } from '../../../class/form';
import { UserProvider } from '../../../providers/user/user';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'registration',
  templateUrl: 'registration.html'
})
export class RegistrationComponent extends FormClass implements OnInit {
  form: FormGroup;
  registrationError: boolean;

  constructor(
    private userProvider: UserProvider,
    public alertCtrl: AlertController
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
      ]),
      'surname': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(64) 
      ]),
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(64) 
      ])
    });
  }

  registration() {
    this.userProvider.registration(this.form.value).subscribe(res => {
      if (res['code'] == 200) {
        this.form.reset();
        this.alertCtrl.create({
          title: 'Активация',
          subTitle: 'Активируйте ваш аккаунт по почте. Если письмо с активацией долго не приходит, проверьте папку "Спам"',
          buttons: [{
            text: "ОК",
            handler: () => {
              window.location.href = '/';
            }
          }]
        }).present();
        this.registrationError = false;
      } else {
        this.registrationError = true;
      }
    })
  }

}
