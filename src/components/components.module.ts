import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { LoginComponent } from './auth/login/login';
import { RegistrationComponent } from './auth/registration/registration';
import { ForgetComponent } from './auth/forget/forget';
import { HeaderComponent } from './common/header/header';
import { MenusComponent } from './common/menus/menus';
import { FieldComponent } from './common/field/field';
import { AvatarComponent } from './popovers/avatar/avatar';
import { PreviewImageComponent } from './preview-image/preview-image';
import { BoxMessageComponent } from './box-message/box-message';
import { AttachComponent } from './attach/attach';
import { ListFilesComponent } from './list-files/list-files';
import { ViewFilesComponent } from './view-files/view-files';
import { ChatMessageComponent } from './chat-message/chat-message';
import { MessageComponent } from './message/message';
import { PipesModule } from '../pipes/pipes.module';
import { ListFriendsComponent } from './list-friends/list-friends';
import { ChatsContextMenuComponent } from '../pages/chats/chats';
import { PopoverComponent } from './popover/popover';
import { ManageSheduleComponent, FullSheduleComponent } from './manage-shedule/manage-shedule';

@NgModule({
	declarations: [
		LoginComponent,
		RegistrationComponent,
		ForgetComponent,
		HeaderComponent,
		MenusComponent,
		FieldComponent,
		AvatarComponent,
		PreviewImageComponent,
		BoxMessageComponent,
		AttachComponent,
		ListFilesComponent,
		ViewFilesComponent,
		ChatMessageComponent,
		MessageComponent,
		ListFriendsComponent,
		ChatsContextMenuComponent,
		PopoverComponent,
		ManageSheduleComponent,
		FullSheduleComponent
	],
	imports: [
		IonicModule,
		EmojiPickerModule,
		PipesModule
	],
	exports: [
		LoginComponent,
		RegistrationComponent,
		ForgetComponent,
		HeaderComponent,
		MenusComponent,
		FieldComponent,
		AvatarComponent,
		PreviewImageComponent,
		BoxMessageComponent,
		AttachComponent,
		ListFilesComponent,
		ViewFilesComponent,
		ChatMessageComponent,
		MessageComponent,
		ListFriendsComponent,
		ChatsContextMenuComponent,
		PopoverComponent,
		ManageSheduleComponent,
		FullSheduleComponent
	],
	entryComponents: [
		AvatarComponent,
		PreviewImageComponent,
		BoxMessageComponent,
		AttachComponent,
		ListFilesComponent,
		ViewFilesComponent,
		ListFriendsComponent,
		ChatsContextMenuComponent,
		PopoverComponent,
		ManageSheduleComponent,
		FullSheduleComponent
	],
	providers: [
	]
})
export class ComponentsModule { }
