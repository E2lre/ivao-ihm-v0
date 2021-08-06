import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit {
  userId:string ='';
  constructor(private weatherService:WeatherService,private router:Router) { }

  ngOnInit(): void {
  }
  onViewPilot(){
    console.log('Go to pilot info : '+this.userId);
 /*   this.weatherService.setCurrentAirport(this.airport);
    this.weatherService.getWeatherInfoByaAirport(this.weatherService.getCurrentAirport());
    this.weatherService.emitWeatherSubject();*/
    this.router.navigate(['pilot-view']);
  }
}
