import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PhotosPage } from './photos';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosPage),
    ComponentsModule
  ],
})
export class PhotosPageModule {}
