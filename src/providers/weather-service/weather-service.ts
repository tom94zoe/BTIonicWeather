import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { WeatherCity} from '../../models/weather-city'
/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {


  constructor(public http:Http) {
    console.log('Hello WeatherServiceProvider Provider');

  }

  getCities():Observable<Array<WeatherCity>>{
    return this.http.get('cityListAustria.json').map((response:Response) => response.json());
  }

}
