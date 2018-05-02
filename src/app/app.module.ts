import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { FiveDayWeatherPage } from '../pages/five-day-weather/five-day-weather';
import { Data5HourProvider } from '../providers/data5-hour/data5-hour';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FiveDayWeatherPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FiveDayWeatherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Data5HourProvider,
    Geolocation
  ]
})
export class AppModule {}
