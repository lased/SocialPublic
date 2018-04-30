import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { registerLocaleData } from '@angular/common';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { NgCalendarModule } from 'ionic2-calendar';

import localeru from '@angular/common/locales/ru';

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
import { GroupCalendarComponent } from './group-calendar/group-calendar';
import { GroupCalendarEventComponent } from './group-calendar-event/group-calendar-event';
import { PostComponent } from './post/post';
import { SubmitPostBoxComponent } from './submit-post-box/submit-post-box';

registerLocaleData(localeru);

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
		FullSheduleComponent,
		GroupCalendarComponent,
		GroupCalendarEventComponent,
    PostComponent,
    SubmitPostBoxComponent
	],
	imports: [
		IonicModule,
		EmojiPickerModule,
		PipesModule,
		NgCalendarModule
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
		FullSheduleComponent,
		GroupCalendarComponent,
		GroupCalendarEventComponent,
    PostComponent,
    SubmitPostBoxComponent
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
		FullSheduleComponent,
		GroupCalendarEventComponent
	]
})
export class ComponentsModule { }
