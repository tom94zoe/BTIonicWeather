/**
 * Created by thzo on 09.08.17.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WeatherCity} from "../../models/weather-city";
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";

@Component({
  selector: 'page-percipitate-settings',
  templateUrl: 'precipitate-settings.html'
})
export class PercipitatePageSettings {

  selectedCity:WeatherCity;

  constructor(public navCtrl: NavController,private weatherService:WeatherServiceProvider) {

  }
  ionViewWillEnter(){
    this.selectedCity = this.weatherService.getSelectedCity(); 
  }
}
