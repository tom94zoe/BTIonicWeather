/**
 * Created by thzo on 09.08.17.
 */
import { Component } from '@angular/core';
import {NavController, DateTime} from 'ionic-angular';
import {WeatherCity} from "../../models/weather-city";
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";
import {RangeDualKnobs, PercipitateFilter, DayTime} from "../../models/percipitate-filter";
import {FilterServiceProvider} from "../../providers/filter-service/filter-service";
import {WeatherDataEntry} from "../../models/weater-data";

@Component({
  selector: 'page-percipitate-settings',
  templateUrl: 'precipitate-settings.html'
})
export class PercipitatePageSettings {
  dualPercipitateValue:RangeDualKnobs = {lower:0, upper:1};
  selectedDayTime:DayTime = DayTime.Day;
  sliderActive:boolean = true;
  dayTimeFilter:boolean = false;
  customTimeFilter:boolean = false;
  selectedCity:WeatherCity;
  minSliderValue:number = 0;
  maxSliderValue:number = 10;
  fromDate:DateTime;
  toDate:DateTime;

  constructor(public navCtrl: NavController,private weatherService:WeatherServiceProvider, private filterService:FilterServiceProvider) {

  }

  ionViewWillEnter(){
    this.selectedCity = this.weatherService.getSelectedCity();

    this.weatherService.getPercipitateForecast(this.selectedCity.id).subscribe(data =>
    {
      var allPercipitates: Array<number> =  data.map((entry:WeatherDataEntry) => entry.rain['3h'] ? entry.rain['3h'] : 0);
      this.minSliderValue = Math.min(...allPercipitates) * 1000;
      this.maxSliderValue = Math.max(...allPercipitates) * 1000;
    })
  }

  applyFilter(){
    let filter:PercipitateFilter = new PercipitateFilter();

    filter.dualPercipitateValueActive = this.sliderActive;
    if(this.sliderActive){
      filter.dualPercipitateValue = this.dualPercipitateValue;
    }

    if(this.dayTimeFilter){
      filter.dayTime = this.selectedDayTime;
    }

    if(this.customTimeFilter){
      filter.fromDate = this.fromDate;
      filter.toDate = this.toDate;
    }

    this.filterService.setPercipitateFilter(filter);

    this.navCtrl.pop();
  }
}
