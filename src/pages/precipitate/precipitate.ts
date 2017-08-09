import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PercipitatePageSettings} from '../precipitate/precipitate-settings';
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";
import {WeatherCity} from "../../models/weather-city";

@Component({
  selector: 'page-percipitate',
  templateUrl: 'precipitate.html'
})
export class PercipitatePage {

  selectedCity:WeatherCity;

  constructor(public navCtrl: NavController, private weatherService:WeatherServiceProvider) {

  }

  ngOnInit(){
    this.selectedCity = this.weatherService.getSelectedCity();
    this.openSettings();
  }

  openSettings(){
    this.navCtrl.push(PercipitatePageSettings);
  }

}
