import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiveDayWeatherPage } from './five-day-weather';

@NgModule({
  declarations: [
    FiveDayWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(FiveDayWeatherPage),
  ],
})
export class FiveDayWeatherPageModule {}
