import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageProvider } from '../storage/storage';
import { Config } from '../../config';

@Injectable()
export class SheduleProvider {
  token: string;
  urlApi: string;

  constructor(
    public http: HttpClient,
    private storageProvider: StorageProvider
  ) {
    this.token = this.storageProvider.get('token');
    this.urlApi = Config.UrlApi;
  }

  addPair(groupId, pairs){
    return this.http.post(this.urlApi + '/api/group/shedule/pairs', { token: this.token, groupId, pairs });        
  }

  addShedule(groupId, shedule){
    return this.http.post(this.urlApi + '/api/group/shedule', { token: this.token, groupId, shedule });        
  }

  import(groupId, shedule){
    return this.http.put(this.urlApi + '/api/group/shedule', { token: this.token, groupId, shedule });        
  }
}
