import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit {

  printRequest:string='';
  printResponse:string='';
  weather: any;
  errorMessage:string = '';
  errorMessageSubject: Subscription = new Subscription;
  weatherSubscription: Subscription = new Subscription;
  constructor(private weatherService:WeatherService,private router:Router) { }

  ngOnInit(): void {

   this.weatherSubscription = this.weatherService.weatherSubject.subscribe(
      (weather: any) =>{
        this.weather = weather;
      }
    );
    this.errorMessageSubject = this.weatherService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );


    //this.weatherService.emitWeatherSubject();
    //this.weather = this.weatherService.getWeatherInfoByaAirport(this.weatherService.getCurrentAirport());
    this.weather = this.weatherService.getWeather();
    console.log('WeatherViewComponent.ts airport' +this.weatherService.getCurrentAirport());
    console.log('WeatherViewComponent.ts tar' +this.weather.tar);
    this.weatherService.emitWeatherSubject();
    this.weatherService.emiterrorMessageSubjectSubject();
  }
  onPrint(){
    console.log('Print document and send message after printing');
    this.weatherService.setErrorMessage('Weather info is send to printer');
    this.weatherService.emiterrorMessageSubjectSubject();

    this.printRequest = 'Airport: ' + this.weather.airport + '\n'
      +'METAR: ' + this.weather.metar + '\n'
      +'TAF: ' + this.weather.tar +'\n';
    this. printResponse = this.weatherService.printString(this.printRequest);
    if (this.printRequest==this. printResponse) {
      this.weatherService.setErrorMessage('Weather info is printed');
      this.weatherService.emiterrorMessageSubjectSubject();
    }
  }
  onNewSearch(){
    this.router.navigate(['weather']);
  }
}
