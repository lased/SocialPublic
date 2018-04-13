import { Component, Input } from '@angular/core';
import { Config } from '../../config';

@Component({
  selector: 'message',
  templateUrl: 'message.html'
})
export class MessageComponent {
  @Input('message') message;
  @Input('prevMessage') prevMessage;
  @Input('from') from;
  apiUrl: string = Config.UrlApi;

  constructor() {    
  }

  fullscreen(){
    
  }

  isImage(file){
    return /\.(jpg|jpeg|png|gif)$/.test(file);
  }

}
