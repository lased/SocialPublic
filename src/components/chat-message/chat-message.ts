import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {
  files: any;
  toggled: boolean =  false;
  message: FormControl;

  constructor() {
  }

  ngOnInit(){
    this.message = new FormControl('', [Validators.required, Validators.minLength(5)])    
  }
  handleSelection(event){    
    this.message.setValue(this.message.value + " " + event.char);    
  }

  removeFile(ev){

  }

}
