import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

import { FiveDayWeatherPage } from '../five-day-weather/five-day-weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //Variables for title
  title = "Current Weather";
  inputCity: string;
  inputCountry: string;

  //Variables for json data
  weather: any[] = [];

  //JSON Objects
  location = {
    city: null,
    country: null
  };

  main = {
    temp: null,
    pressure: null,
    humidity: null,
    temp_min: null,
    temp_max: null
  };

  wind = {
    speed: null,
  };

  clouds = {
    all: null
  };
  rain = {
    threeH: null,
  }

  constructor(public navCtrl: NavController, public http: HttpClient, private dataProvider: DataProvider, public storage: Storage) {

    //Retriving storage values
    this.storage.get('location').then((val) => {

      if (val != null) {
        let location = JSON.parse(val);
        this.inputCity = location.city;
        this.inputCountry = location.country;
      }
      //Using default values
      else {
        this.location = {
            city: "Galway",
            country: "Ireland"
          }
      }
    });
  }

  ionViewDidLoad() {
    console.log("Alive"); //Checking if page is alive    
  };

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    //Retrieving stored values
    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);
      }
      //Setting defaults
      else {
        this.location = {
          city: "Galway",
          country: "Ireland"
        }
        console.log(this.location.city + "" + this.location.country);
      }

      this.getData(this.location.city, this.location.country);      
    });
  };

  updateCity() {
    //New location from input
    let location = {
      city: this.inputCity,
      country: this.inputCountry
    }

    //Setting input location into storage
    this.storage.set('location', JSON.stringify(location));
    //Retireiving data
    this.getData(location.city, location.country);
    //Logging to console for testing
    console.log(location.city + "," + location.country);

  };

  open5Day() {
    this.navCtrl.push(FiveDayWeatherPage);
  };

  getData(city, country){
    this.dataProvider.GetWeatherData(city, country).subscribe(data => {
      this.weather = data.weather;

      this.main.temp = data.main.temp;
      this.main.pressure = data.main.pressure;
      this.main.humidity = data.main.humidity;
      this.main.temp_min = data.main.temp_min;
      this.main.temp_max = data.main.temp_max;

      this.wind.speed = data.wind.speed;

      this.clouds.all = data.clouds.all;
    });
  };
}




