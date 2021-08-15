import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {Router} from "@angular/router";
import {AtcService} from "../services/atc.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  callsign:string ='';
  errorMessage:string = '';
  errorMessageSubject: Subscription = new Subscription;
  constructor(private atcService:AtcService,private router:Router) { }

  ngOnInit(): void {
    this.errorMessageSubject = this.atcService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );
  }
  onViewAtc(){
    console.log('Go to pilot info : '+this.callsign);
    if (this.callsign !='') {
      //this.atcService.setCurrentUserId(this.callsign);
      this.atcService.setCurrentCallsign(this.callsign);
      this.atcService.getAtcInfoByCallsign(this.atcService.getCurrentCallsign());
      this.atcService.emitAtcSubject();
      this.router.navigate(['atc-view']);
      }
    else {
      this.atcService.setErrorMessage('Callsign field can not be empty');
      this.atcService.emiterrorMessageSubjectSubject();
    }
  }
}
