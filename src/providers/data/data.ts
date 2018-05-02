import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  constructor(public http: HttpClient, public http0: Http) {
    console.log('Hello DataProvider Provider');    
  }

  CurrWeatherAPPID = "d9e58ae07493d9b5acf462fd3fd9359a";
  CurrWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=";

  GetWeatherData(city:any, country:any): Observable<any>{
    return this.http0.get(this.CurrWeatherURL + city + "," + country +  "&APPID=" + this.CurrWeatherAPPID + "&units=metric")
    .map(obs => obs.json());
  }
}
