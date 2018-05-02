import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageProvider } from '../storage/storage';
import { Config } from '../../config';

@Injectable()
export class GroupProvider {
  token: string;
  urlApi: string;

  constructor(
    public http: HttpClient,
    private storageProvider: StorageProvider
  ) {
    this.token = this.storageProvider.get('token');
    this.urlApi = Config.UrlApi;
  }

  removePost(id, post){
    post = JSON.stringify(post);
    
    return this.http.delete(this.urlApi + '/api/group/post?token=' + this.token + '&id=' + id + '&post=' + post);        
  }

  addPost(id, post, files){
    let fd = new FormData()
    let downloaded = [];

    fd.append('token', this.token);
    fd.append('post', post);
    fd.append('id', id);
    for (let i = 0; i < files.length; i++) {
      files[i] instanceof File ? fd.append('uploadedFiles', files[i]) : downloaded.push(files[i]);
    }

    fd.append('downloadedFiles', JSON.stringify(downloaded))

    const req = new HttpRequest('POST', Config.UrlApi + '/api/group/post', fd, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  updateDataGroup(data){
    return this.http.put(this.urlApi + '/api/group/data', { token: this.token, data });    
  }

  setAvatar(id, image){
    let fd = new FormData()

    fd.append('token', this.token);
    fd.append('image', image);
    fd.append('id', id);

    const req = new HttpRequest('POST', Config.UrlApi + '/api/group/avatar', fd, {
      reportProgress: true,
    });

    return this.http.request(req);    
  }

  getGroup(url) {
    return this.http.get(this.urlApi + '/api/group?url=' + url);
  }

  joinGroup(id) {
    return this.http.put(this.urlApi + '/api/user/groups', { token: this.token, id });
  }

  deleteGroup(id) {
    return this.http.delete(this.urlApi + '/api/group?token=' + this.token + '&id=' + id);    
  }

  leaveGroup(id) {
    return this.http.delete(this.urlApi + '/api/user/groups?token=' + this.token + '&id=' + id);
  }

  getUserGroups() {
    return this.http.get(this.urlApi + '/api/user/groups?token=' + this.token);
  }

  createGroup(params) {
    params.token = this.token;

    return this.http.post(this.urlApi + '/api/group', params);
  }
}
