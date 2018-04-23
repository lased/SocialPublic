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

  getUserGroups() {
    return this.http.get(this.urlApi + '/api/user/groups?token=' + this.token);
  }

  createGroup(params) {
    params.token = this.token;
    
    return this.http.post(this.urlApi + '/api/group', params);
  }
}
