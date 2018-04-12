import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ChatsPage } from './chats';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ChatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class ChatsPageModule {}
