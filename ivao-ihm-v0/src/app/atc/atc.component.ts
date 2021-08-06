import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  userId:string ='';
  constructor(private weatherService:WeatherService,private router:Router) { }

  ngOnInit(): void {
  }
  onViewAtc(){
    console.log('Go to pilot info : '+this.userId);
    /*   this.weatherService.setCurrentAirport(this.airport);
       this.weatherService.getWeatherInfoByaAirport(this.weatherService.getCurrentAirport());
       this.weatherService.emitWeatherSubject();*/
    this.router.navigate(['atc-view']);
  }
}
