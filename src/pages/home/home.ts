import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherServiceProvider} from '../../providers/weather-service/weather-service'
import {WeatherCity} from "../../models/weather-city";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities:Array<WeatherCity>;
  filteredCities:Array<WeatherCity>;

  constructor(public navCtrl:NavController, weatherService:WeatherServiceProvider) {

    weatherService.getCities().subscribe((cities:Array<WeatherCity>) => {
      this.cities = cities;
      this.filterCities(null);
    });
  }

  filterCities(event) {
    if (event === null || !event.target.value) {
      this.filteredCities = this.cities
      return
    }
    this.filteredCities = this.cities.filter(city =>
    city.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);

    console.log(event);
  }


}
