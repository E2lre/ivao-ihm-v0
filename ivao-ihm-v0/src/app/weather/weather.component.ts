import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from "../services/weather.service";
//import {FormGroup, Validators} from "@angular/forms";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  submitted = false;
  airport:string ='';
  errorMessage:string = '';
  errorMessageSubject: Subscription = new Subscription;
  constructor(private weatherService:WeatherService,private router:Router) {

  }

  onViewAirport() {
    this.submitted = true;
    console.log('Go to airport weather info : ' + this.airport);

    if (this.airport != '') {
      this.weatherService.setCurrentAirport(this.airport);
      this.weatherService.getWeatherInfoByaAirport(this.weatherService.getCurrentAirport());
      this.weatherService.emitWeatherSubject();
      this.router.navigate(['weather-view']);
    }
    else {
      this.weatherService.setErrorMessage('Airport field can not be empty');
      this.weatherService.emiterrorMessageSubjectSubject();
    }
  }
  ngOnInit(): void {
    this.errorMessageSubject = this.weatherService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );

    this.submitted = false;
  }

}
