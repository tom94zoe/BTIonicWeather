import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";
import {WeatherCity} from "../../models/weather-city";
import {WeatherDataEntry} from "../../models/weater-data";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage {
  selectedCity: WeatherCity;
  weatherEntryList: Array<WeatherDataEntry> = [];


  constructor(public navCtrl: NavController, private weatherService:WeatherServiceProvider) {

  }

  ngOnInit(){
    this.selectedCity = this.weatherService.getSelectedCity();
    this.weatherService.getTemperatureForecast(this.selectedCity.id).subscribe(data => {
      console.log(data);
      this.weatherEntryList = data;
    });
  }

}
