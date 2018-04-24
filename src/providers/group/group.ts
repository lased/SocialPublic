import { HttpClient } from '@angular/common/http';
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

  getGroup(url) {
    return this.http.get(this.urlApi + '/api/group?url=' + url);
  }

  joinGroup(id) {
    return this.http.put(this.urlApi + '/api/user/groups', { token: this.token, id });
  }

  deleteGroup(id) {

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
