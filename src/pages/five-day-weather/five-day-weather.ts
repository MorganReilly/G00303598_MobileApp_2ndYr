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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private dataProvider: Data5HourProvider, private platform: Platform, public geolocation: Geolocation) {
    platform.ready().then(() => {

      // get current position
      geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.latIn = pos.coords.latitude;
        this.lngIn = pos.coords.longitude;
      });

      const watch = geolocation.watchPosition().subscribe(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.latIn = pos.coords.latitude;
        this.lngIn = pos.coords.longitude;
      });

      // to stop watching
      watch.unsubscribe();

    });
  }

  ionViewDidLoad() {
    console.log("Alive");
  }
  ionViewWillEnter() {

    this.platform.ready().then(() => {

      this.geolocation.getCurrentPosition().then(pos => {
        this.latIn = pos.coords.latitude;
        this.lngIn = pos.coords.longitude;

        console.log("Lat: " + this.latIn + " Lon: " + this.lngIn);

        this.dataProvider.GetFiveHourData(this.latIn, this.lngIn).subscribe(data => {
          this.list = data.list;

          this.name = data.city.name;
          this.country = data.city.country;

          console.log("Lat: " + this.latIn + " Lon: " + this.lngIn);
          console.log(this.name + "," + this.country);
          console.log(pos);
        });

      }).catch(err => console.log("Error retrieving location", err));

    });
  }
}
