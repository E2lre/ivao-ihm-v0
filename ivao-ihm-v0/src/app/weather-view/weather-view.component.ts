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

}
