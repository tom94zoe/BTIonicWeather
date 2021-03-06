import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { TemperaturePage } from '../pages/temperature/temperature';
import { PercipitatePage } from '../pages/precipitate/precipitate';
import { PercipitatePageSettings } from '../pages/precipitate/precipitate-settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { FilterServiceProvider } from '../providers/filter-service/filter-service';

@NgModule({
  declarations: [
    MyApp,
    TemperaturePage,
    PercipitatePage,
    PercipitatePageSettings,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TemperaturePage,
    PercipitatePage,
    PercipitatePageSettings,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherServiceProvider,
    FilterServiceProvider
  ]
})
export class AppModule {}
