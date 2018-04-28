import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageProvider } from '../storage/storage';
import { Config } from '../../config';

@Injectable()
export class EventProvider {
  token: string;
  urlApi: string;

  constructor(
    public http: HttpClient,
    private storageProvider: StorageProvider
  ) {
    this.token = this.storageProvider.get('token');
    this.urlApi = Config.UrlApi;
  }

  addEvent(groupId, event) {
    return this.http.post(this.urlApi + '/api/group/event', { token: this.token, id: groupId, event });

  }
  removeEvent(groupId, event) {
    return this.http.delete(this.urlApi + '/api/group/event?token=' + this.token + "&id=" + groupId + "&event=" + JSON.stringify(event));

  }
}
