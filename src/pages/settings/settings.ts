import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { Auth } from '../../decorators/auth';

import { FormClass } from '../../class/form';
import { UserProvider } from '../../providers/user/user';

@Auth()
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage extends FormClass {
  formError: string = '';
  form: any;
  tab: string = 'profile'//'common';
  settings: any;
  labels: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    private userProvider: UserProvider,
    private toastCtrl: ToastController
  ) {
    super();
    this.init();
  }

  ngOnInit() {
    this.userProvider.getSettings().subscribe((data: Array<any>) => {
      let i = 0;
      let obj = {};

      this.settings = data;

      while(i < data.length){
        let j = 0;

        obj[data[i].tab] = {};
        while(j < data[i].parametrs.length){
          let item = data[i].parametrs[j];
          obj[data[i].tab][item.name] = item.value;
          j++;
        }
        i++;
      }

      this.form = {
        common: new FormGroup({
          'email': new FormControl(obj['common']['email'], [
            Validators.required,
            Validators.email,
            Validators.maxLength(255)
          ]),
          'newPassword': new FormControl(obj['common']['newPassword'], [
            Validators.minLength(6),
            Validators.maxLength(64)
          ]),
          'phone': new FormControl(obj['common']['phone'], [
            Validators.minLength(6),
            Validators.maxLength(64)
          ]),
          'url': new FormControl(obj['common']['url'], [
            Validators.minLength(1),
            Validators.maxLength(64)
          ])
        }),
        profile: new FormGroup({
          'surname': new FormControl(obj['profile']['surname'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(64)
          ]),
          'name': new FormControl(obj['profile']['name'], [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(64)
          ]),
          'status': new FormControl(obj['profile']['status'], [
            Validators.minLength(2),
            Validators.maxLength(64)
          ]),
          'about': new FormControl(obj['profile']['about'], [
            Validators.minLength(3),
            Validators.maxLength(255)
          ]),
          'sex': new FormControl(obj['profile']['sex'], [
            Validators.required            
          ]),
          'country': new FormControl(obj['profile']['country'], [
            Validators.minLength(2),
            Validators.maxLength(255)
          ]),
          'city': new FormControl(obj['profile']['city'], [
            Validators.minLength(2),
            Validators.maxLength(255)
          ]),
          'birthday': new FormControl(obj['profile']['birthday'])
        }),
        theme: new FormGroup({
        })
      }
    });
  }

  init() {
    this.labels = {
      url: 'Адрес страницы (http://localhost:3000/user/)',
      email: 'Электронная почта',
      newPassword: 'Новый пароль',
      phone: 'Номер телефона',
      surname: 'Фамилия',
      name: 'Имя',
      about: 'Обо мне',
      sex: 'Пол',
      country: 'Страна',
      city: 'Город/Поселок',
      birthday: 'Дата рождения',
      status: 'Статус'
    }
  }

  save(tab) {
    let data = this.form[tab].value;
    
    this.userProvider.setSettings(data).subscribe(res => {
      this.formError = '';
      
      if(res['code'] == 200 && res['message'] == 'change email'){
        this.toastCtrl.create({
          message: 'Подтвердите смену почты. Если письмо долго не приходит, проверьте папку "Спам"',
          showCloseButton: true,
          closeButtonText: 'OK'
        }).present();     
        this.ngOnInit();   
      } else if(res['code'] == 200){
        this.toastCtrl.create({
          message: 'Настройки успешно сохранены',
          duration: 3000
        }).present();  
        this.ngOnInit();
      } else if(res['code'] == 302){
        this.formError = res['message'].name + ' уже занят';
      }      
    })
  }

}
