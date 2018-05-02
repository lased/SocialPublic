import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../../config';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class UserProvider {
  token: string;

  constructor(
    public http: HttpClient,
    private storageProvider: StorageProvider
  ) {
    this.token = this.storageProvider.get('token');
  }

  getNews(){
    return this.http.get(Config.UrlApi + '/api/user/news?token=' + this.token);
  }

  getFiles(type){
    return this.http.get(Config.UrlApi + '/api/user/files?token=' + this.token + '&type=' + type);
  }
  
  confirmAddFriend(id){
    return this.http.put(Config.UrlApi + '/api/user/friend', { token: this.token, id });    
  }
  cancelAddFriend(id){
    return this.http.delete(Config.UrlApi + '/api/user/friend?token=' + this.token + '&id=' + id);
  }
  getFriends() {
    return this.http.get(Config.UrlApi + '/api/user/friend?token=' + this.token);
  }
  addFriend(id) {
    return this.http.post(Config.UrlApi + '/api/user/friend', { token: this.token, id });
  }

  login(data) {
    return this.http.post(Config.UrlApi + '/api/user/login', data);
  }
  registration(data) {
    return this.http.post(Config.UrlApi + '/api/user/registration', data);
  }
  forget(data) {
    return this.http.post(Config.UrlApi + '/api/user/forget', data);
  }
  checkAuth() {
    this.token = this.storageProvider.get('token');

    return this.http.post(Config.UrlApi + '/api/user/auth', { token: this.token }).toPromise();
  }

  deletePhoto(image) {
    return this.http.delete(Config.UrlApi + '/api/user/photo?token=' + this.token + "&image=" + JSON.stringify(image));
  }
  setPhotoAvatar(image) {
    return this.http.post(Config.UrlApi + '/api/user/photo/avatar', { token: this.token, image });
  }
  addPhotos(images) {
    let fd = new FormData()

    fd.append('token', this.token);
    for (let i = 0; i < images.length; i++) {
      fd.append('images', images[i]);
    }

    const req = new HttpRequest('POST', Config.UrlApi + '/api/user/photos', fd, {
      reportProgress: true,
    });

    return this.http.request(req);
  }
  getPhotos() {
    return this.http.get(Config.UrlApi + '/api/user/photos?token=' + this.token);
  }
  setAvatar(image) {
    let fd = new FormData()

    fd.append('token', this.token);
    fd.append('image', image);

    const req = new HttpRequest('POST', Config.UrlApi + '/api/user/avatar', fd, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  getSettings() {
    return this.http.get(Config.UrlApi + '/api/user/settings?token=' + this.token);
  }
  setSettings(data) {
    return this.http.post(Config.UrlApi + '/api/user/settings', { token: this.token, data });
  }

  getUser(url) {
    return this.http.get(Config.UrlApi + '/api/user?url=' + url);
  }

}
