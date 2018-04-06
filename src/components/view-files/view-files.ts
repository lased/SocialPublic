import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-files',
  templateUrl: 'view-files.html'
})
export class ViewFilesComponent {
  @Input('files') files;
  @Output('remove') remove = new EventEmitter();

  constructor() {
  }

  isImage(imgObj, index = null) {        
    if (/.+\.(jpg|png|jpeg|gif)$/.test(imgObj.name == undefined ? imgObj.file.name : imgObj.name))
      return true;
    return false;
  }

  removeFile(index) {
    this.remove.emit(index);
  }

}
