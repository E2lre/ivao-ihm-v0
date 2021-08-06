import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from "../services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  airport:string ='';
  constructor(private weatherService:WeatherService,private router:Router) { }

  onViewAirport(){
    console.log('Go to airport weather info : '+this.airport);
    this.weatherService.setCurrentAirport(this.airport);
    this.weatherService.getWeatherInfoByaAirport(this.weatherService.getCurrentAirport());
    this.weatherService.emitWeatherSubject();
    this.router.navigate(['weather-view']);
  }
  ngOnInit(): void {
  }

}
