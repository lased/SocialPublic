import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ForgetPage } from './forget';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgetPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPage),
    ComponentsModule
  ],
})
export class ForgetPageModule {}
