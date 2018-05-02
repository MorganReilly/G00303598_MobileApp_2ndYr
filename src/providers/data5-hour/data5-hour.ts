import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class Data5HourProvider {

  constructor(public http: HttpClient, public http0: Http) {
    console.log('Hello Data5HourProvider Provider');
  }

  FiveDayAPPID = "d9e58ae07493d9b5acf462fd3fd9359a";
  FiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?lat=";

  GetFiveHourData(lat: number, lon: number): Observable<any>{
    return this.http0.get(this.FiveDayURL + lat + "&lon=" + lon +  "&APPID=" + this.FiveDayAPPID + "&units=metric")
    .map(obs => obs.json());
  }

}
