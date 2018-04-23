import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { UserProvider } from '../providers/user/user';
import { SocketProvider } from '../providers/socket/socket';
import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';
import { ChatProvider } from '../providers/chat/chat';
import { GroupProvider } from '../providers/group/group';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    EmojiPickerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SocketProvider,
    AuthProvider,
    StorageProvider,
    ChatProvider,
    GroupProvider
  ]
})
export class AppModule {}
