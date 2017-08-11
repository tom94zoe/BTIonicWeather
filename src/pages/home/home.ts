import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
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

  constructor(public navCtrl:NavController, private loadingCtrl:LoadingController, private weatherService:WeatherServiceProvider, private alertCtrl:AlertController) {

  }

  ngOnInit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait, cities downloading...'
    });
    loading.present();

    this.weatherService.getCities().subscribe((cities:Array<WeatherCity>) => {
      console.log(cities.length);
      this.cities = cities.slice(0,100);
      this.filterCities(null);

      setTimeout(() =>
          loading.dismiss()
        , 1500);
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
