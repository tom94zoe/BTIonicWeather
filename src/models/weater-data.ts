/**
 * Created by thzo on 09.08.17.
 */
export class WeatherDataEntry{
  public clouds: Cloud;
  public dt: number;
  public dt_txt: string;
  public date: Date;
  public main: MainWeatherData;
  public rain: RainWeatherData;
  public weather: Array<WeatherDescription>;

}

export class Cloud{
  public all:number;
}

export class MainWeatherData{
  public grnd_level: number;
  public humidity: number;
  public pressure: number;
  public sea_level: number;
  public temp: number;
  public temp_celsius: number;

}

export class RainWeatherData {
  public '3h':number;
}

export class WeatherDescription {
  public description: string;
  public icon: string;
  public id: number;
  public main: string;
  public iconRef: string;
}
