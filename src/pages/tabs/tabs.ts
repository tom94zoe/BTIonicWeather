import { Component } from '@angular/core';

import { TemperaturePage } from '../temperature/temperature';
import { PercipitatePage } from '../precipitate/precipitate';
import { HomePage } from '../home/home';
import {WeatherServiceProvider} from "../../providers/weather-service/weather-service";
import {WeatherCity} from "../../models/weather-city";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TemperaturePage;
  tab3Root = PercipitatePage;
  
  constructor(private weahterService:WeatherServiceProvider) {

  }

}
