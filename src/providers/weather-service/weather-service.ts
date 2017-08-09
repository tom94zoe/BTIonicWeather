import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { WeatherCity} from '../../models/weather-city'
import { WeatherDataEntry } from '../../models/weater-data';
/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {
  appID:string= '6a4d617c69c294370112b0f7174124b2';
  selectedCity: WeatherCity;

  constructor(public http:Http) {
    console.log('Hello WeatherServiceProvider Provider');
  }

  getCities():Observable<Array<WeatherCity>>{
    return this.http.get('cityListAustria.json').map(response => response.json());
  }

  setSelectedCity(city:WeatherCity): void{
    this.selectedCity = city;
  }

  getSelectedCity(): WeatherCity{
    return this.selectedCity;
  }

  getTemperatureForecast(cityId): Observable<Array<WeatherDataEntry>>{
    let params: URLSearchParams = new URLSearchParams();
    params.set("id", cityId);
    params.set("appid", this.appID);
    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?id='+cityId + '&appid=' + this.appID).map(res=>  res.json().list
      .map((entry:WeatherDataEntry) => {
        entry.main.temp_celsius = entry.main.temp - 273.15;
        entry.date = new Date(entry.dt * 1000);
        this.setIconPath(entry);
        return entry;
      }));
  }

  setIconPath(entry:WeatherDataEntry){
    var path:string = '';
    switch (entry.weather[0].main) {
      case 'Clear': path = './assets/icon/weather-sunny.svg'; break;
      case 'Rain': path = './assets/icon/weather-rainy.svg'; break;
      case 'Clouds': path = './assets/icon/weather-cloudy.svg'; break;
    }
    entry.weather[0].iconRef = path;
  }

}
