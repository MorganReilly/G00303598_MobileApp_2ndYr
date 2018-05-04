import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data5HourProvider } from '../../providers/data5-hour/data5-hour';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-five-day-weather',
  templateUrl: 'five-day-weather.html',
})
export class FiveDayWeatherPage {

  //Variables for reading latitude and longitude
  latIn: any;
  lngIn: any;
  title: string = "5 Day / 3 Hour Forcast";

  //Variables for json data
  name: any;
  country: any;
  list: any[] = [];
  weather: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private dataProvider: Data5HourProvider, private platform: Platform, public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    console.log("Alive");
    console.log("ionViewDidLoad");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    var options = {
      timeout: 1000
    };

    this.platform.ready().then(() => {

      console.log("platform.ready");

      this.geolocation.getCurrentPosition(options).then(pos => {

        //Setting latitude and longitude parameters
        this.latIn = pos.coords.latitude;
        this.lngIn = pos.coords.longitude;

        //Output to console for debugging
        console.log("Lat: " + this.latIn + " Lon: " + this.lngIn);
        console.log(this.name + "," + this.country);

        //Retrieve data
        this.getData();

      }).catch(() => {
        console.log("Error retrieving location");
      });

      //If the location retrieval fails random coords are set instead
      this.getRandomCoords();
    });
  }

  getData() {
    this.dataProvider.GetFiveHourData(this.latIn, this.lngIn).subscribe(data => {
      this.list = data.list;

      this.name = data.city.name;
      this.country = data.city.country;

      console.log("Lat: " + this.latIn + " Lon: " + this.lngIn);
      console.log(this.name + "," + this.country);
    });
  };

  updateLocation() {
    this.getData();
  };

  randomLocation(){
    this.getRandomCoords();
  };

  getRandomCoords() {
    //Location issues on Android
    //Setting location to random coords instead to overcome issue
    this.latIn = this.generateRandomNumber(-90.00000, 90.00000);
    this.lngIn = this.generateRandomNumber(-180.00000, 180.00000);

    this.getData();

    console.log("Lat: " + this.latIn + " Lon: " + this.lngIn);
    console.log(this.name + "," + this.country);
  };

  generateRandomNumber(min: number, max: number) {
    let rand = Math.random() * (max - min) + min;
    console.log(rand);
    return rand;
  };
}
