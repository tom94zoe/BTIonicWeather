import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PercipitatePageSettings} from '../precipitate/precipitate-settings';
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";
import {WeatherCity} from "../../models/weather-city";
import {WeatherDataEntry} from "../../models/weater-data";
import {FilterServiceProvider} from "../../providers/filter-service/filter-service";
import {PercipitateFilter, DayTime} from "../../models/percipitate-filter";

@Component({
  selector: 'page-percipitate',
  templateUrl: 'precipitate.html'
})
export class PercipitatePage {

  selectedCity:WeatherCity;
  percipitateForecast:Array<WeatherDataEntry> = [];
  selectedFilter:PercipitateFilter;
  isInitDone:boolean = false;

  constructor(public navCtrl:NavController, private weatherService:WeatherServiceProvider, private filterService:FilterServiceProvider) {

  }

  ngOnInit() {
    //this.openSettings();
  }

  ionViewWillEnter() {
    this.selectedCity = this.weatherService.getSelectedCity();
    this.selectedFilter = this.filterService.getPercipitateFilter();
    this.weatherService.getPercipitateForecast(this.selectedCity.id).subscribe(data => {
      if (this.selectedFilter) {
        data = data.filter((entry:WeatherDataEntry) => {
          let isValid:boolean = true;

          if (this.selectedFilter.dualPercipitateValueActive) {
            isValid = isValid && this.selectedFilter.dualPercipitateValue.lower/1000 < entry.rain['3h'] && this.selectedFilter.dualPercipitateValue.upper/1000 > entry.rain['3h'];
          }

          if (this.selectedFilter.dayTime == DayTime.Day) {
            isValid = isValid && this.isDay(entry.date);
          } else if (this.selectedFilter.dayTime == DayTime.Night) {
            isValid = isValid && !this.isDay(entry.date);
          }

          if (this.selectedFilter.toDate && this.selectedFilter.fromDate && this.selectedFilter.toDate) {
            let toMinutes = this.selectedFilter.toDate.hourValues * 60 + this.selectedFilter.toDate.minuteValues;
            let fromMinutes = this.selectedFilter.fromDate.hourValues * 60 + this.selectedFilter.fromDate.minuteValues;
            let entryMinutes = entry.date.getHours() * 60 + entry.date.getMinutes();

            let isToDateSmallerThanFrom:boolean = toMinutes < fromMinutes;

            console.log(entry.date.getMinutes());
            if (isToDateSmallerThanFrom) {
              isValid = isValid && toMinutes < entryMinutes && fromMinutes > entryMinutes;
            } else {
              isValid = isValid && toMinutes > entryMinutes && fromMinutes < entryMinutes;
            }

          } else if (this.selectedFilter.toDate) {
            let toMinutes = this.selectedFilter.toDate.hourValues * 60 + this.selectedFilter.toDate.minuteValues;
            let entryMinutes = entry.date.getHours() * 60 + entry.date.getMinutes();

            isValid = isValid && toMinutes < entryMinutes;
          } else if (this.selectedFilter.fromDate) {
            let fromMinutes = this.selectedFilter.fromDate.hourValues * 60 + this.selectedFilter.fromDate.minuteValues;
            let entryMinutes = entry.date.getHours() * 60 + entry.date.getMinutes();

            isValid = isValid && entryMinutes < fromMinutes;
          }

          return isValid;
        });
      }
      console.log(data);
      this.percipitateForecast = data;
      this.isInitDone = true;
    });
  }

  openSettings() {
    this.navCtrl.push(PercipitatePageSettings);
  }

  private isDay(date:Date) {
    return date.getHours() > 6 && date.getHours() < 20;
  }

}
