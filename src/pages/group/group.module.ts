import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GroupPage } from './group';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    GroupPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class GroupPageModule {}
