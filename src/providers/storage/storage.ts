import { Injectable } from '@angular/core';
import { Config } from '../../config';

@Injectable()
export class StorageProvider {
  private userData: any = {};

  constructor() {
    let len = 0;
    for(let key in window.localStorage){
      if(len == window.localStorage.length){
        break;
      }

      this.userData[key] = window.localStorage[key];     
      len++;      
    }
  }

  set(key, value) {
    window.localStorage.setItem(key, value);
    this.userData[key] = value;
  }

  get(key){    
    return this.userData[key];
  }

  clear(){
    window.localStorage.clear();
    this.userData = {};
  }

}
