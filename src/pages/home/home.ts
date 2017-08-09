import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {WeatherServiceProvider} from '../../providers/weather-service/weather-service'
import {WeatherCity} from "../../models/weather-city";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities:Array<WeatherCity>;
  filteredCities:Array<WeatherCity> = [];
  name:string;

  constructor(public navCtrl:NavController, private weatherService:WeatherServiceProvider, private alertCtrl:AlertController) {

    this.weatherService.getCities().subscribe((cities:Array<WeatherCity>) => {
      this.cities = cities;
      this.filterCities(null);
    });
  }

  filterCities(event) {
    if (event === null || !event.target.value) {
      this.filteredCities = this.cities;
      return
    }
    this.filteredCities = this.cities.filter(city =>
    city.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);

    console.log(event);
  }

  selectCity(city:WeatherCity) {
    //console.log(this.navCtrl);
    this.weatherService.setSelectedCity(city);
    this.navCtrl.parent.select(1);
    //this.navCtrl.push(TemperaturePage);
  }

  openSettings() {
    let alert = this.alertCtrl.create({
      title: 'Settings',
      inputs: [{
        name: 'name',
        placeholder: 'Your Name'
      },
      ], buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.name = data.name;
          }
        }
      ]
    });
    alert.present();

  }

}
